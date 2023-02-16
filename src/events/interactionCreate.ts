import {
    BaseInteraction,
    bold
} from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { EventExecution } from "../interfaces/event";
import { CommandExecution } from "../interfaces/command";
import { Frequency, initModels } from "../db/models/init-models";
import db from "../db/connect";
import { Op } from 'sequelize';
import moment from "moment-timezone";

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

const unimplemented = (interaction: BaseInteraction) => {
    if (interaction.isRepliable())
        return interaction.reply({
            content: bold("🛑 This interaction is not implemented."),
        });
};

export const execution: EventExecution = async (
    client,
    interaction: BaseInteraction
) => {
    if (interaction.isChatInputCommand()) {
        if (!commands[interaction.commandName])
            return unimplemented(interaction);

        commands[interaction.commandName](client, interaction);
    } else if (interaction.isAutocomplete()) {
        const focusedOption = interaction.options.getFocused(true);
        const choices = [];

        // User is trying to input a time value, generate list of times in 15 minute block for them
        if (["start_time", "end_time", "time"].includes(focusedOption.name)) {
            for (let i = 0; i < 24; i++) {
                for (let j = 0; j < 4; j++) {
                    const time_string = `${i.toString().padStart(2, "0")}:${j === 0 ? `00` : 15 * j}`;
                    choices.push({
                      name: time_string,
                      value: time_string
                    });
                }
            }
        } 

        // User is trying to pull a list of their schedules as options list
        else if (["schedule_id"].includes(focusedOption.name)) {
            const { User, AvailabilityRecurring } = initModels(db);

            //Get user from db
            const _user = await User.findOne({
                where: { discordId: { [Op.eq]: interaction.user.id } },
            });

            if (_user) {
                // Get user's recurring schedule from the db
                const _schedules = await AvailabilityRecurring.findAll({
                    include: [{model: Frequency, required: true}],
                    where: { user_id: { [Op.eq]: _user.id } },
                    order: [
                      ['freq_id', 'ASC'],
                      ['weekday', 'ASC'], 
                      ['start_time', 'ASC']
                    ]
                });
                
                if(_schedules)
                  // Build the options array with the users recurring schedule from the db
                  _schedules.forEach(schedule => {
                      const weekday = moment.weekdays()[schedule.weekday + 1];
                      const user_schedule = `${schedule.id}. ${schedule.freq.name}: ${weekday} ${schedule.start_time} — ${schedule.end_time}`;
                      choices.push({ name: user_schedule, value: schedule.id})
                  });
                else
                  choices.push({ name: "No schedules found", value: 0 });
            } 
            else
                choices.push({ name: "No schedules found", value: 0 });
        }
        
        // Filter out their available options to only show values that
        // are relavent to what they're typing (could also use .includes())
        const filtered = choices.filter((choice) =>
            choice.name.startsWith(focusedOption.value)
        )

        // Discord only allows us to show 25 options at a time, so we have to 
        // only take the top 25 of them to display to the user
        const options = filtered.length > 25 ? filtered.slice(0, 25) : filtered;

        // Respond with the available choices to the user
        await interaction.respond(options);
    }

    // Implement other interaction types here.
    else {
        unimplemented(interaction);
    }
};
