import { Op } from "sequelize";
import db from "../connect";
import { AvailabilityRecurringAttributes, AvailabilityWindow, AvailabilityWindowAttributes, initModels } from "../models/init-models";
const { AvailabilityRecurring, Frequency } = initModels(db);

/**
 * Get full recurring schedule list for a given userId
 * @param userId The id of the user in the database
 */
async function GetRecurringSchedules(userId: number) {
    return AvailabilityRecurring.findAll({
        where: { user_id: { [Op.eq]: userId } },
        order: [
            ["freq_id", "ASC"],
            ["weekday", "ASC"],
            ["start_time", "ASC"],
        ],
        include: { model: Frequency, as: "freq" },
    });
}

async function InsertRecurringSchedule(entity: AvailabilityRecurringAttributes) {
    return AvailabilityRecurring.create(entity);
}

/**
 * Create a window of availability or non-availability
 * @param entity 
 */
async function CreateScheduleWindow(entity: AvailabilityWindowAttributes) {
    return AvailabilityWindow.create(entity)
    // else we need to update or delete the window of time that they can no longer make if it exists
    // or we need to insert an is_available=false record if there's conflicts with the recurring schedule...
    // we need an engine for this
}

async function GetScheduleWindows(userId: number) {
    return AvailabilityWindow.findAll({
        where: { user_id: { [Op.eq]: userId } },
        order: [
            ["id", "ASC"]
        ]
    });
}

/**
 * Remove a schedule for a user in the database
 * @param id The id of the recurring schedule in the database
 */
async function DeleteRecurringSchedule(id: number) {
    return AvailabilityRecurring.destroy({
        where: { id: { [Op.eq]: id } }
    });
}

async function DeleteScheduleWindow(id: number) {
    return AvailabilityWindow.destroy({
        where: { id: {[Op.eq]: id}}
    })
}

export { GetRecurringSchedules, InsertRecurringSchedule, DeleteRecurringSchedule, CreateScheduleWindow, GetScheduleWindows, DeleteScheduleWindow}