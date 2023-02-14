import "dotenv/config";
import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { EventExecution } from "./interfaces/event";

const client = new Client({
  intents: [],
});

client.once("ready", () => {
  console.log(`🤖 ${client.user!.tag} is online`);
});

const eventDirectory = __dirname + "/events";

readdirSync(eventDirectory)
  .filter((f) => f.slice(-3) === ".js" || f.slice(-3) === ".ts")
  .map((f) => {
    const eventName = f.split(".")[0];
    const event = require(path.join(eventDirectory, f));
    const eventExecution = event.execution as EventExecution;

    client.on(eventName, eventExecution.bind(null, client));
  });

client.login(process.env.TOKEN);
