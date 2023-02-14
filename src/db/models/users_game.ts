import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Game, GameId } from './game';
import type { User, UserId } from './user';

export interface UsersGameAttributes {
  id?: number;
  user_id: number;
  game_id: number;
  created_on?: Date;
}

export type UsersGamePk = "id";
export type UsersGameId = UsersGame[UsersGamePk];
export type UsersGameOptionalAttributes = "id" | "created_on";
export type UsersGameCreationAttributes = Optional<UsersGameAttributes, UsersGameOptionalAttributes>;

export class UsersGame extends Model<UsersGameAttributes, UsersGameCreationAttributes> implements UsersGameAttributes {
  id?: number;
  user_id!: number;
  game_id!: number;
  created_on?: Date;

  // UsersGame belongsTo Game via game_id
  game!: Game;
  getGame!: Sequelize.BelongsToGetAssociationMixin<Game>;
  setGame!: Sequelize.BelongsToSetAssociationMixin<Game, GameId>;
  createGame!: Sequelize.BelongsToCreateAssociationMixin<Game>;
  // UsersGame belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UsersGame {
    return UsersGame.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'games',
        key: 'id'
      }
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'users_games',
    timestamps: false
  });
  }
}
