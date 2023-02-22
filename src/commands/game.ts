import {
    inlineCode,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";
import { fetch } from 'fetch-opengraph';
import { CommandExecution } from "../interfaces/command";
import { getErrorMessage } from "../lib/exceptions";
import { DeleteGame, GetGamesList, InsertGame } from "../db/controllers";

export const execution: CommandExecution = async (client, interaction) => {
    const options = interaction.options;
    const subcommand = options.data[0]?.name;
    // User is adding a game to the list
    if (subcommand == "add") {
        try {
            const name = <string>options.get("name")?.value;
            const is_async = <number>options.get("is_async")?.value;
            const minPlayers = <number>options.get("min_players")?.value;
            const maxPlayers = <number>options.get("max_players")?.value;
            const link = await <string>options.get("link")?.value;
            const price = await <number>options.get("price")?.value;

            const gamePage = await fetch(link);
            if (!gamePage || gamePage === undefined) {
                throw new Error(`❌ Invalid link supplied`);
            }

            const { description, image } = gamePage;

            await InsertGame({name, is_async, minPlayers, maxPlayers, link, image, description, price });
            await interaction.reply({ content: `Game added to list: **${name}**`})
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: getErrorMessage(err), ephemeral: true});
        }
    }
    
    if (subcommand == 'remove') {
        const game_id = <number>options.get('game')?.value;
        
        const games = await GetGamesList(); 

        // If the user tried to select a game that doesn't exist
        if (games[game_id] === undefined) {
            throw new Error('❌ No valid game to remove');
        }
        else {
            // Get the game object
            const game = games[game_id];
            
            // Get the id from the database of the actual index that they selected
            const id = <number>game.id;

            // Delete the game record
            await DeleteGame(id);
            await interaction.reply({ content: `Deleted **${game.name}** from the list`})
        }
    }
}

export const data = new SlashCommandBuilder()
    .setName("game")
    .setDescription('Manage the games list')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addSubcommand((subcommand) =>
        subcommand
            .setName("add")
            .setDescription("Add a game to the list")
            .addStringOption((option) =>
                option
                    .setName("name")
                    .setDescription("Name of the game to add")
                    .setRequired(true)
            )
            .addIntegerOption((option) =>
                option
                    .setName("is_async")
                    .setDescription("Can the game be played asynchronously or not")
                    .setRequired(true)
                    .addChoices(
                        {
                            name: 'Asynchronous',
                            value: 1
                        },
                        {
                            name: 'Non-Asynchronous',
                            value: 0
                        }
                    )
            )
            .addIntegerOption((option) =>
                option
                    .setName("min_players")
                    .setDescription("What are the minimum amount of players needed to play a game?")
                    .setRequired(true)
                    .setMinValue(2)
            )
            .addIntegerOption((option) =>
                option
                    .setName("max_players")
                    .setDescription("What are the max players that can play a game?")
                    .setRequired(true)
                    .setMinValue(2)
            )
            .addNumberOption((option) =>
                option
                    .setName("price")
                    .setDescription("The retail price of the game")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("link")
                    .setDescription(
                        "Link to where one can buy the game"
                    )
                    .setRequired(true)
            )
    )
    .addSubcommand(subCommand => 
        subCommand
            .setName('remove')
            .setDescription('Remove a game from the list')
            .addIntegerOption(option => 
                option
                    .setName('game')
                    .setDescription('The game to remove from the list')
                    .setAutocomplete(true)
            )
    )