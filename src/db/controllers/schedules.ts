import { Op } from "sequelize";
import db from "../connect";
import { AvailabilityRecurringAttributes, initModels } from "../models/init-models";
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
 * Remove a schedule for a user in the database
 * @param id The id of the recurring schedule in the database
 */
async function DeleteRecurringSchedule(id: number) {
    return AvailabilityRecurring.destroy({
        where: { id: { [Op.eq]: id } }
    });
}

export { GetRecurringSchedules, InsertRecurringSchedule, DeleteRecurringSchedule }