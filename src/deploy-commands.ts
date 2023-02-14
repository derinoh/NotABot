import "dotenv/config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

const commandDirectory = __dirname + "/commands";

const commands = readdirSync(commandDirectory)
  .filter((f) => f.slice(-3) === ".js" || f.slice(-3) === ".ts")
  .map((f) => require(path.join(commandDirectory, f)).data.toJSON());

const rest = new REST({
  version: "10",
}).setToken(process.env.TOKEN!);

// This will register commands globally. Use Routes.applicationGuildCommands to register commands in a specific guild.
rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID!), {
    body: commands,
  })
  .then(() => console.log("✅ Commands deployed"))
  .catch(console.error);
