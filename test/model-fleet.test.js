import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { ModelFleet, OutOfFuelError, parseModels } from "../src/model-fleet.js";

function stateFile() {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), "spike-jr-")), "state.json");
}

test("parseModels preserva a prioridade configurada", () => {
  assert.deepEqual(parseModels("melhor:2,pior:8"), [
    { id: "melhor", dailyRequests: 2 },
    { id: "pior", dailyRequests: 8 }
  ]);
});

test("cai para o próximo modelo quando o melhor fica sem capacidade", async () => {
  const calls = [];
  const client = { models: { generateContent: async ({ model }) => {
    calls.push(model);
    if (model === "melhor") throw Object.assign(new Error("RESOURCE_EXHAUSTED"), { status: 429 });
    return { text: "resposta" };
  } } };
  const fleet = new ModelFleet({
    client,
    models: parseModels("melhor:1,reserva:2"),
    stateFile: stateFile()
  });

  assert.deepEqual(await fleet.generate({ contents: "oi" }), { text: "resposta", model: "reserva" });
  assert.deepEqual(calls, ["melhor", "reserva"]);
});

test("desliga as respostas quando todo combustível diário acaba", async () => {
  const client = { models: { generateContent: async () => ({ text: "ok" }) } };
  const fleet = new ModelFleet({ client, models: parseModels("unico:1"), stateFile: stateFile() });

  await fleet.generate({ contents: "primeira" });
  await assert.rejects(() => fleet.generate({ contents: "segunda" }), OutOfFuelError);
});

test("ignora permanentemente um nome de modelo indisponível", async () => {
  const calls = [];
  const client = { models: { generateContent: async ({ model }) => {
    calls.push(model);
    if (model === "futuro") throw Object.assign(new Error("model not found"), { status: 404 });
    return { text: "ok" };
  } } };
  const fleet = new ModelFleet({ client, models: parseModels("futuro:1,atual:2"), stateFile: stateFile() });

  await fleet.generate({ contents: "um" });
  await fleet.generate({ contents: "dois" });
  assert.deepEqual(calls, ["futuro", "atual", "atual"]);
});
