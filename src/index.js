import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { ModelFleet, OutOfFuelError, parseModels } from "./model-fleet.js";

const required = ["DISCORD_TOKEN", "GEMINI_API_KEY"].filter((name) => !process.env[name]);
if (required.length) throw new Error(`Variáveis obrigatórias ausentes: ${required.join(", ")}`);

const prefix = process.env.DISCORD_PREFIX || "!spike";
const systemInstruction = process.env.GEMINI_SYSTEM_PROMPT
  || "Você é Spike Jr, um assistente prestativo, direto e amigável. Responda em português brasileiro.";
const fleet = new ModelFleet({
  client: new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }),
  models: parseModels(process.env.GEMINI_MODELS),
  stateFile: process.env.GEMINI_STATE_FILE || ".data/gemini-fuel.json"
});

const discord = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

discord.once(Events.ClientReady, (client) => console.log(`Spike Jr ligado como ${client.user.tag}.`));
discord.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  const prompt = message.content.slice(prefix.length).trim();
  if (!prompt) {
    await message.reply(`Use \`${prefix} sua pergunta\`.`);
    return;
  }

  await message.channel.sendTyping();
  try {
    const result = await fleet.generate({ contents: prompt, config: { systemInstruction } });
    const answer = result.text?.trim() || "Não consegui formular uma resposta.";
    const chunks = answer.match(/[\s\S]{1,1900}/g) ?? [answer];
    await message.reply(`${chunks.shift()}\n-# Modelo: ${result.model}`);
    for (const chunk of chunks) await message.channel.send(chunk);
  } catch (error) {
    if (error instanceof OutOfFuelError) {
      await message.reply(`⛽ ${error.message}`);
      return;
    }
    console.error("Erro ao responder:", error);
    await message.reply("Tive uma falha ao consultar a IA. Tente novamente mais tarde.");
  }
});

discord.login(process.env.DISCORD_TOKEN);
