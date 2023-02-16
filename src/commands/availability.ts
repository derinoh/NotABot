import { SlashCommandBuilder } from "discord.js";
import { CommandExecution } from "../interfaces/command";
import { weekdays, datesOptions } from "../lib/constants";

export const execution: CommandExecution = async (_, interaction) => {
    

    interaction.reply({
        content: "Testing Availability command",
    });
};

export const data = new SlashCommandBuilder()
    .setName("availability")
    .setDescription("Set your availability schedule or view someone else's")
    .addSubcommandGroup((group) =>
        group
            .setName("set")
            .setDescription("Set a block of time to your availability schedule")
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("recurring")
                    .setDescription("Set a recurring schedule")
                    .addIntegerOption((option) =>
                        option
                            .setName("every")
                            .setDescription("Set frequency of occurance")
                            .setRequired(true)
                            .addChoices(
                                {
                                    name: "Weekly",
                                    value: 1,
                                },
                                {
                                    name: "Bi-Weekly",
                                    value: 2,
                                }
                            )
                    )
                    .addIntegerOption((option) =>
                        option
                            .setName("weekday")
                            .setDescription("Set available weekday")
                            .setRequired(true)
                            .addChoices(...weekdays)
                    )
                    .addStringOption((option) =>
                        option
                            .setName("start_time")
                            .setDescription(
                                "Set availability start time (ex. 16:00)"
                            )
                            .setRequired(true)
                            .setAutocomplete(true)
                    )
                    .addStringOption((option) =>
                        option
                            .setName("end_time")
                            .setDescription(
                                "Set availability end time ((ex. 16:00))"
                            )
                            .setRequired(true)
                            .setAutocomplete(true)
                    )
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("window")
                    .setDescription(
                        "Add a single window of time of availability that only occurs for the date specified"
                    )
                    .addIntegerOption((option) =>
                        option
                            .setName("status")
                            .setDescription(
                                "Are you available for this time block or busy?"
                            )
                            .setRequired(true)
                            .addChoices(
                                {
                                    name: "Available",
                                    value: 1,
                                },
                                {
                                    name: "Not Available",
                                    value: 0,
                                }
                            )
                    )
                    .addStringOption((option) =>
                        option
                            .setName("date")
                            .setDescription(
                                "Enter a date in the format of Month/Day/Year"
                            )
                            .setRequired(true)
                            .addChoices(...datesOptions())
                    )
                    .addStringOption((option) =>
                        option
                            .setName("time")
                            .setDescription(
                                "Set availability start time (in 24 hr format)"
                            )
                            .setRequired(true)
                            .setAutocomplete(true)
                    )
                    .addIntegerOption((option) =>
                        option
                            .setName("hours")
                            .setDescription(
                                "Set duration in hours in which you will be available from the starting time"
                            )
                            .setRequired(true)
                    )
            )
    )
    // .addSubcommand((subcommand) =>
    //     subcommand.addMentionableOption((option) =>
    //         option
    //             .setName("user")
    //             .setDescription("View the availability schedule for the selected user")
    //             .setRequired(true)
    //     )
    // )
    .addSubcommandGroup((group) =>
        group
            .setName("remove")
            .setDescription("Remove a block of time to your availability schedule")
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("recurring")
                    .setDescription("Remove a recurring schedule")
                    .addIntegerOption((option) =>
                        option
                            .setName("schedule_id")
                            .setDescription("Select the recurring schedule to remove")
                            .setRequired(true)
                            .setAutocomplete(true)
                    )
            )
    )