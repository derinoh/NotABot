import { inlineCode, SlashCommandBuilder } from "discord.js";
import { CommandExecution } from "../interfaces/command";

export const execution: CommandExecution = async (_, interaction) => {
  let ping = Date.now() - interaction.createdTimestamp + "ms";

  interaction.reply({
    content: `🏓 Pong! ${inlineCode(ping)}`, 
  });
};

export const data: SlashCommandBuilder = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings the bot and returns response time.");
