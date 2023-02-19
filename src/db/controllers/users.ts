import { Op } from "sequelize";
import db from "../connect";
import { initModels } from "../models/init-models";
const { User } = initModels(db);

/**
 * Get the user record from the database given their Discord ID
 * @param discordId
 */
async function GetUser (discordId: string) {
    return await User.findOne({
        where: { discordId: { [Op.eq]: discordId } },
    });
}

export {GetUser}