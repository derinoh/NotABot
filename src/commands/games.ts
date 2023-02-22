import {
    CommandInteraction,
    inlineCode,
    MessageInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
    User,
} from "discord.js";
import { CommandExecution } from "../interfaces/command";
import { getErrorMessage } from "../lib/exceptions";
import { DeleteGame, GetGamesList, InsertGame } from "../db/controllers";
import {
    pagination,
    ButtonTypes,
    ButtonStyles,
} from "@devraelfreeze/discordjs-pagination";
import { Pagination } from 'pagination.djs';
import { gameEmbed } from "../lib/embeds";

export const execution: CommandExecution = async (client, interaction) => {
    const options = interaction.options;
    const subcommand = options.data[0]?.name;
    if (subcommand == "catalog") {
        try {
            const games = await GetGamesList();
            const gamesEmbeds = games.map((game) => gameEmbed(game));

            // If the games list ever gets > 10 then we need to paginate it
            await interaction.reply({ embeds: gamesEmbeds, ephemeral: true}); 
        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: getErrorMessage(err),
                ephemeral: true,
            });
        }
    }
};

export const data = new SlashCommandBuilder()
    .setName("games")
    .setDescription("View the games catalog and add games to your libary")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addSubcommand((subcommand) =>
        subcommand
            .setName("catalog")
            .setDescription("List all the games in the catalog")
    );