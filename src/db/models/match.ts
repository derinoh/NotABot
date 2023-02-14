import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Game, GameId } from './game';
import type { UsersMatch, UsersMatchId } from './users_match';

export interface MatchAttributes {
  id?: number;
  game_id: number;
  match_datetime: Date;
  duration_hours?: number;
  created_on: Date;
}

export type MatchPk = "id";
export type MatchId = Match[MatchPk];
export type MatchOptionalAttributes = "id" | "duration_hours" | "created_on";
export type MatchCreationAttributes = Optional<MatchAttributes, MatchOptionalAttributes>;

export class Match extends Model<MatchAttributes, MatchCreationAttributes> implements MatchAttributes {
  id?: number;
  game_id!: number;
  match_datetime!: Date;
  duration_hours?: number;
  created_on!: Date;

  // Match belongsTo Game via game_id
  game!: Game;
  getGame!: Sequelize.BelongsToGetAssociationMixin<Game>;
  setGame!: Sequelize.BelongsToSetAssociationMixin<Game, GameId>;
  createGame!: Sequelize.BelongsToCreateAssociationMixin<Game>;
  // Match hasMany UsersMatch via match_id
  users_matches!: UsersMatch[];
  getUsers_matches!: Sequelize.HasManyGetAssociationsMixin<UsersMatch>;
  setUsers_matches!: Sequelize.HasManySetAssociationsMixin<UsersMatch, UsersMatchId>;
  addUsers_match!: Sequelize.HasManyAddAssociationMixin<UsersMatch, UsersMatchId>;
  addUsers_matches!: Sequelize.HasManyAddAssociationsMixin<UsersMatch, UsersMatchId>;
  createUsers_match!: Sequelize.HasManyCreateAssociationMixin<UsersMatch>;
  removeUsers_match!: Sequelize.HasManyRemoveAssociationMixin<UsersMatch, UsersMatchId>;
  removeUsers_matches!: Sequelize.HasManyRemoveAssociationsMixin<UsersMatch, UsersMatchId>;
  hasUsers_match!: Sequelize.HasManyHasAssociationMixin<UsersMatch, UsersMatchId>;
  hasUsers_matches!: Sequelize.HasManyHasAssociationsMixin<UsersMatch, UsersMatchId>;
  countUsers_matches!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Match {
    return Match.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'games',
        key: 'id'
      }
    },
    match_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration_hours: {
      type: DataTypes.REAL,
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "CURRENTP_TIMESTAMP"
    }
  }, {
    sequelize,
    tableName: 'matches',
    timestamps: false
  });
  }
}
