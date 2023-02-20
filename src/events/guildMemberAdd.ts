import { ActionRowBuilder, BaseInteraction, bold, GuildMember, inlineCode, StringSelectMenuBuilder, User } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { EventExecution } from "../interfaces/event";
import { CommandExecution } from "../interfaces/command";
import { timezones } from '../lib/constants';
import { GetUser } from "../db/controllers";

const commandDirectory = __dirname + "/../commands";

const commands: { [key: string]: CommandExecution } = {};

readdirSync(commandDirectory)
    .filter((f) => f.slice(-3) === ".js" || f.slice(-3) === ".ts")
    .map((f) => {
        const commandName = f.split(".")[0];
        const command = require(path.join(commandDirectory, f));
        const commandExecution = command.execution as CommandExecution;

        commands[commandName] = commandExecution;
    });

export const execution: EventExecution = async (
    client,
    member: GuildMember
) => {
    const _user = await GetUser(member.user.id);
    await member.guild.systemChannel?.send({content: `Welcome, ${member.user}! Please select your current timezone to use this bot.\n\nStart with the ${inlineCode('/scheduler set timezone')} command`});
};