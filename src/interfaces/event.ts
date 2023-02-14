import { Client } from "discord.js";

export interface EventExecution {
  (client: Client, ...args: any[]): void;
}
