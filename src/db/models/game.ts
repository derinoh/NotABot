import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Match, MatchId } from './match';
import type { UsersGame, UsersGameId } from './users_game';

export interface GameAttributes {
  id?: number;
  name: string;
  is_async: number;
  minPlayers: number;
  maxPlayers: number;
  link: string;
  image?: string;
  description?: string;
  created_on: Date;
}

export type GamePk = "id";
export type GameId = Game[GamePk];
export type GameOptionalAttributes = "id" | "is_async" | "minPlayers" | "maxPlayers" | "image" | "description" | "created_on";
export type GameCreationAttributes = Optional<GameAttributes, GameOptionalAttributes>;

export class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
  id?: number;
  name!: string;
  is_async!: number;
  minPlayers!: number;
  maxPlayers!: number;
  link!: string;
  image?: string;
  description?: string;
  created_on!: Date;

  // Game hasMany Match via game_id
  matches!: Match[];
  getMatches!: Sequelize.HasManyGetAssociationsMixin<Match>;
  setMatches!: Sequelize.HasManySetAssociationsMixin<Match, MatchId>;
  addMatch!: Sequelize.HasManyAddAssociationMixin<Match, MatchId>;
  addMatches!: Sequelize.HasManyAddAssociationsMixin<Match, MatchId>;
  createMatch!: Sequelize.HasManyCreateAssociationMixin<Match>;
  removeMatch!: Sequelize.HasManyRemoveAssociationMixin<Match, MatchId>;
  removeMatches!: Sequelize.HasManyRemoveAssociationsMixin<Match, MatchId>;
  hasMatch!: Sequelize.HasManyHasAssociationMixin<Match, MatchId>;
  hasMatches!: Sequelize.HasManyHasAssociationsMixin<Match, MatchId>;
  countMatches!: Sequelize.HasManyCountAssociationsMixin;
  // Game hasMany UsersGame via game_id
  users_games!: UsersGame[];
  getUsers_games!: Sequelize.HasManyGetAssociationsMixin<UsersGame>;
  setUsers_games!: Sequelize.HasManySetAssociationsMixin<UsersGame, UsersGameId>;
  addUsers_game!: Sequelize.HasManyAddAssociationMixin<UsersGame, UsersGameId>;
  addUsers_games!: Sequelize.HasManyAddAssociationsMixin<UsersGame, UsersGameId>;
  createUsers_game!: Sequelize.HasManyCreateAssociationMixin<UsersGame>;
  removeUsers_game!: Sequelize.HasManyRemoveAssociationMixin<UsersGame, UsersGameId>;
  removeUsers_games!: Sequelize.HasManyRemoveAssociationsMixin<UsersGame, UsersGameId>;
  hasUsers_game!: Sequelize.HasManyHasAssociationMixin<UsersGame, UsersGameId>;
  hasUsers_games!: Sequelize.HasManyHasAssociationsMixin<UsersGame, UsersGameId>;
  countUsers_games!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Game {
    return Game.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_async: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    minPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'games',
    timestamps: false
  });
  }
}
