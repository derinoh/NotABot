import { Op } from "sequelize";
import db from "../connect";
import { initModels, UserAttributes } from "../models/init-models";
const { User } = initModels(db);

/**
 * Get the user record from the database given their Discord ID
 * @param discordId
 */
async function GetUser (discordId: string) {
    return User.findOne({
        where: { discordId: { [Op.eq]: discordId } },
    });
}

async function InsertUser (entity: UserAttributes) {
    return User.create(entity);
}

async function UpsertUser (entity: UserAttributes) {
    const {discordId, timezone} = entity;
    let _user = await GetUser(discordId);
    if (!_user || _user === undefined){
        return await InsertUser({discordId, timezone});
    }
    return await User.update( {timezone}, { where: { discordId: { [Op.eq]: discordId} }});
}

export {GetUser, InsertUser, UpsertUser}