import {
    inlineCode,
    SlashCommandBuilder,
} from "discord.js";
import { CommandExecution } from "../interfaces/command";
import { weekdays, datesOptions, timezones } from "../lib/constants";
import { getErrorMessage } from "../lib/exceptions";
import { timeRegex } from "../lib/validation";
import { GetUser, GetRecurringSchedules, InsertRecurringSchedule, DeleteRecurringSchedule, UpsertUser, CreateScheduleWindow } from "../db/controllers";
import moment from "moment";

export const execution: CommandExecution = async (client, interaction) => {
    const options = interaction.options;
    // I couldn't figure out how to correctly type interactions so that i could
    // access the getSubcommandGroup() and getSubCommand() methods
    // so I'm accessing what I need in this hacky way for now
    const group = options.data[0]?.name;
    const subcommand = options.data[0]?.options
        ? options.data[0]?.options[0].name
        : null;
    if (group == "set") {
        if (subcommand == "recurring") {
            try {
                const every = <number>options.get("every")?.value;
                const weekday = <number>options.get("weekday")?.value;
                const start_time = <string>options.get("start_time")?.value;
                const end_time = <string>options.get("end_time")?.value;
                const _user = await GetUser(interaction.user.id);

                // TODO: Add the user to the database automatically and prompt them for their timezone
                if (!_user || _user?.id === undefined) 
                    throw new Error(`❌ You do not exist as a user in the system yet.\m\mPlease run the ${inlineCode('/scheduler set timezone')} command.`)

                // We need to check that the time string is in the right format because it's the only 
                // value that the user can actually type whatever they want in there 
                if (timeRegex.test(start_time) && timeRegex.test(end_time)) {
                    await InsertRecurringSchedule({freq_id: every, weekday, start_time, end_time, user_id: _user.id});
                    interaction.reply({ content: `✅ Recurring schedule saved!`, ephemeral: true})

                } else throw new Error("❌ Time is not in the correct format.");
            } catch (err) {
                console.error(err);
                await interaction.reply({ content: getErrorMessage(err), ephemeral: true});
            }
        }
        if (subcommand == 'window') {
            try {
                const is_available = <number>options.get("is_available")?.value;
                const date = <string>options.get("date")?.value;
                const time = <string>options.get("time")?.value;
                const hours = <number>options.get("hours")?.value;

                const _user = await GetUser(interaction.user.id);
                if(!_user || _user === undefined) {
                    throw new Error(`❌ You do not exist as a user in the system yet.\m\mPlease run the ${inlineCode('/scheduler set timezone')} command.`);
                }
                
                // TODO: This is not currently doing anything and it's too late on a Sunday for me to care
                await CreateScheduleWindow({user_id: _user.id as number, is_available, date, time, hours })
            }
            catch (err) {
                console.error(err);
                await interaction.reply({ content: getErrorMessage(err), ephemeral: true});
            }
        }
        // User is setting their timezone
        if (subcommand == 'timezone') {
            try {
                const timezone = <string>options.get("timeone")?.value;
                await UpsertUser({discordId: interaction.user.id, timezone});
                interaction.reply({ content: `✅ Your timezone has been updated to ${inlineCode(timezone)}`, ephemeral: true })
            }
            catch (err) {
                console.error(err);
                await interaction.reply({ content: getErrorMessage(err), ephemeral: true});
            }
        }
    }
    
    if (group == 'remove') {
        if (subcommand == 'recurring') {
            try{
                const schedule_id = <number>options.get('schedule')?.value;
                
                const _user = await GetUser(interaction.user.id);
                if (!_user || _user?.id === undefined) 
                    throw new Error(`❌ You do not exist as a user in the system yet.\m\mPlease run the ${inlineCode('/scheduler set timezone')} command.`)

                const schedules = await GetRecurringSchedules(_user?.id as number); 
                // If the user tried to select a schedule that doesn't exist for them. 
                if (schedules[schedule_id] === undefined) {
                    throw new Error('❌ No valid schedule selected to remove');
                }
                else {
                    // Get the schedule object
                    const schedule = schedules[schedule_id];
                    
                    // Get the id from the database of the actual index that they selected
                    const id = <number>schedule.id;

                    // Delete the recurring schedule record
                    // Get weekday string
                    const weekday = moment.weekdays()[schedule.weekday];
                    const sched_string = `${schedule.freq.name}: ${weekday} ${schedule.start_time} — ${schedule.end_time}`;
                    await DeleteRecurringSchedule(id);
                    await interaction.reply({ content: `✅ Deleted ${sched_string}`, ephemeral: true})
                }
            }
            catch(err){
                console.error(err);
                await interaction.reply({ content: getErrorMessage(err), ephemeral: true});
            }
        }
    }
};

export const data = new SlashCommandBuilder()
    .setName("scheduler")
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
            .addSubcommand(subcommand => 
                subcommand
                    .setName('timezone')
                    .setDescription('Set your timezone')
                    .addStringOption(option => 
                        option
                            .addChoices(...timezones.map(x => { return { name: x, value:x }}))
                            .setDescription('Set your timezone')
                            .setRequired(true)
                            .setName('timezone')
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
            .setDescription(
                "Remove a block of time to your availability schedule"
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("recurring")
                    .setDescription("Remove a recurring schedule")
                    .addIntegerOption((option) =>
                        option
                            .setName("schedule")
                            .setDescription(
                                "Select the recurring schedule to remove"
                            )
                            .setRequired(true)
                            .setAutocomplete(true)
                    )
            )
    )
