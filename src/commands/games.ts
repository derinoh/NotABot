import {
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";
import { CommandExecution } from "../interfaces/command";
import { getErrorMessage } from "../lib/exceptions";
import { GetGamesList } from "../db/controllers";
import {
    pagination,
    ButtonTypes,
    ButtonStyles,
} from "@devraelfreeze/discordjs-pagination";
import { gameEmbed } from "../lib/embeds";

export const execution: CommandExecution = async (client, interaction) => {
    const options = interaction.options;
    const subcommand = options.data[0]?.name;
    if (subcommand == "catalog") {
        try {
            const games = await GetGamesList();
            await pagination({
                embeds: games.map((game) => gameEmbed(game)),
                author: interaction?.member?.user as any,
                interaction: interaction as any,
                ephemeral: true,
                disableButtons: false, // disable the buttons after a period of time
                fastSkip: false,
                pageTravel: false,
                buttons: [
                    {
                        type: ButtonTypes.previous,
                        label: "Previous Page",
                        style: ButtonStyles.Primary,
                    },
                    {
                        type: ButtonTypes.next,
                        label: "Next Page",
                        style: ButtonStyles.Success,
                    },
                ],
            });
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