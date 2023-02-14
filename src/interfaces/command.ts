import {
  Client,
  CommandInteraction,
  Interaction,
  SlashCommandBuilder
} from "discord.js";

export interface CommandExecution {
  (client: Client, interaction: CommandInteraction): void;
}

export interface Command {
  data: SlashCommandBuilder;
  execution: CommandExecution;
}
