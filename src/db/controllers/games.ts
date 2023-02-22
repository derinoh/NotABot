import { Op } from "sequelize";
import db from "../connect";
import { GameAttributes, initModels } from "../models/init-models";
const { Game } = initModels(db);

async function GetGamesList() {
    return Game.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
}

async function InsertGame(game: GameAttributes) {
    return Game.create(game);
}

async function DeleteGame(id: number) {
    return Game.destroy({
        where: {id: {[Op.eq]: id}}
    });
}

export { GetGamesList, InsertGame, DeleteGame }