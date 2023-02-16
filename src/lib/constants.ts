import { ApplicationCommandOptionChoiceData } from 'discord.js';
import moment from 'moment-timezone';

const weekdays: ApplicationCommandOptionChoiceData<number>[] = [
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

// Generate array of momentjs timezone strings for the US
// (this is what gets stored in the model as User.timezone)
const timezones = moment.tz.names().filter(x => x.startsWith('US/'));

// Generate months from moment.js
const months = moment.months().map((x, i) => {return {name: x, value: i+1}});

/**
 * Generates an array of date strings as command option objects 
 * @param days The number of days into the future to generate the list
 */
const datesOptions = (days: number = 24) => {
    const today = new Date();
    const datesOptions: ApplicationCommandOptionChoiceData<string>[] = [];
    for (let i=0;i<=24; i++){
        const nextDay = new Date(today.setDate(1 + today.getDate()));
        datesOptions.push(
            {
                name: nextDay.toLocaleDateString('en-US'),
                value: nextDay.toLocaleDateString('en-US')
            }
        )
    }
    return datesOptions;
}


export { weekdays, timezones, months, datesOptions };
