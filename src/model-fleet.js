import fs from "node:fs";
import path from "node:path";

export const DEFAULT_MODELS = Object.freeze([
  { id: "gemini-3.7-flash", dailyRequests: 20 },
  { id: "gemini-3.6-flash", dailyRequests: 20 },
  { id: "gemini-3.5-flash", dailyRequests: 20 },
  { id: "gemini-3-flash", dailyRequests: 20 },
  { id: "gemini-2.5-flash", dailyRequests: 20 },
  { id: "gemini-3.5-flash-lite", dailyRequests: 500 },
  { id: "gemini-3.1-flash-lite", dailyRequests: 500 },
  { id: "gemini-2.5-flash-lite", dailyRequests: 20 }
]);

export class OutOfFuelError extends Error {
  constructor(message = "Todos os modelos Gemini estão sem cota no momento.") {
    super(message);
    this.name = "OutOfFuelError";
  }
}

export function parseModels(value = "") {
  if (!value.trim()) return DEFAULT_MODELS.map((model) => ({ ...model }));

  return value.split(",").map((entry) => {
    const [id, limitText] = entry.trim().split(":");
    const dailyRequests = Number(limitText);
    if (!id || !Number.isInteger(dailyRequests) || dailyRequests <= 0) {
      throw new Error(`Modelo inválido em GEMINI_MODELS: "${entry}". Use modelo:limite.`);
    }
    return { id, dailyRequests };
  });
}

function pacificDay(now) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
}

function retryDelayMs(error) {
  const text = `${error?.message ?? ""} ${JSON.stringify(error?.errorDetails ?? "")}`;
  const match = text.match(/retry(?:Delay| after)?[^0-9]*(\d+(?:\.\d+)?)\s*s/i);
  return match ? Math.max(1_000, Number(match[1]) * 1_000) : 60_000;
}

export function isCapacityError(error) {
  const status = Number(error?.status ?? error?.code);
  return status === 429 || status === 503 || /RESOURCE_EXHAUSTED|rate.?limit|quota/i.test(error?.message ?? "");
}

export function isUnavailableModelError(error) {
  const status = Number(error?.status ?? error?.code);
  return status === 404 || /NOT_FOUND|not found|not supported/i.test(error?.message ?? "");
}

export class ModelFleet {
  constructor({ client, models = DEFAULT_MODELS, stateFile = ".data/gemini-fuel.json", now = () => new Date() }) {
    this.client = client;
    this.models = models;
    this.stateFile = stateFile;
    this.now = now;
    this.state = this.#loadState();
  }

  #loadState() {
    try {
      return JSON.parse(fs.readFileSync(this.stateFile, "utf8"));
    } catch (error) {
      if (error.code !== "ENOENT") console.warn("Estado de combustível inválido; iniciando vazio:", error.message);
      return { day: pacificDay(this.now()), models: {} };
    }
  }

  #refreshDay() {
    const day = pacificDay(this.now());
    if (this.state.day !== day) this.state = { day, models: {} };
  }

  #modelState(id) {
    return (this.state.models[id] ??= { used: 0, blockedUntil: 0, unavailable: false });
  }

  #save() {
    fs.mkdirSync(path.dirname(this.stateFile), { recursive: true });
    const temporary = `${this.stateFile}.${process.pid}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(this.state, null, 2));
    fs.renameSync(temporary, this.stateFile);
  }

  status() {
    this.#refreshDay();
    return this.models.map((model) => {
      const state = this.#modelState(model.id);
      return { ...model, ...state, remaining: Math.max(0, model.dailyRequests - state.used) };
    });
  }

  async generate(config) {
    this.#refreshDay();
    let attempted = false;

    for (const model of this.models) {
      const state = this.#modelState(model.id);
      if (state.unavailable || state.used >= model.dailyRequests || state.blockedUntil > this.now().getTime()) continue;
      attempted = true;
      state.used += 1;
      this.#save();

      try {
        const response = await this.client.models.generateContent({ ...config, model: model.id });
        return { text: response.text, model: model.id };
      } catch (error) {
        if (isCapacityError(error)) {
          state.blockedUntil = this.now().getTime() + retryDelayMs(error);
          this.#save();
          console.warn(`${model.id} sem capacidade; tentando o próximo modelo.`);
          continue;
        }
        if (isUnavailableModelError(error)) {
          state.unavailable = true;
          state.used -= 1;
          this.#save();
          console.warn(`${model.id} indisponível nesta API; tentando o próximo modelo.`);
          continue;
        }
        state.used -= 1;
        this.#save();
        throw error;
      }
    }

    throw new OutOfFuelError(attempted
      ? "A capacidade disponível dos modelos Gemini acabou temporariamente."
      : "A cota diária dos modelos Gemini acabou. O Spike Jr volta quando ela for renovada.");
  }
}
