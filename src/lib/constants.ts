import { ApplicationCommandOptionChoiceData } from 'discord.js';
import moment from 'moment-timezone';

const weekdays: ApplicationCommandOptionChoiceData[] = [
    {
        name: 'Sunday',
        value: 1,
    },
    {
        name: 'Monday',
        value: 2,
    },
    {
        name: 'Tuesday',
        value: 3,
    },
    {
        name: 'Wednesday',
        value: 4,
    },
    {
        name: 'Thursday',
        value: 5,
    },
    {
        name: 'Friday',
        value: 6,
    },
    {
        name: 'Saturday',
        value: 7,
    },
];

// Generate times list in 15 minute blocks
const timeslist: ApplicationCommandOptionChoiceData<string>[] = [];
for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 4; j++) {
        timeslist.push(
            {
                name: `${i}:${j === 0 ? `00` : 15 * j}`,
                value: `${i}:${j === 0 ? `00` : 15 * j}`
            }
        );
    }
}

// Generate array of momentjs timezone strings for the US
// (this is what gets stored in the model as User.timezone)
const timezones = moment.tz.names().filter(x => x.startsWith('US/'));


export { weekdays, timeslist, timezones};
