import { SlashCommandBuilder } from "discord.js";
import { CommandExecution } from "../interfaces/command";

export const execution: CommandExecution = async (_, interaction) => {
  interaction.reply({
    content: 'Testing Availability command',
  });
};

export const data: SlashCommandBuilder = new SlashCommandBuilder()
  .setName("availability")
  .setDescription("Set your availability schedule or view someone else's.");
