import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Match, MatchId } from './match';
import type { User, UserId } from './user';

export interface UsersMatchAttributes {
  id?: number;
  user_id: number;
  match_id: number;
}

export type UsersMatchPk = "id";
export type UsersMatchId = UsersMatch[UsersMatchPk];
export type UsersMatchOptionalAttributes = "id";
export type UsersMatchCreationAttributes = Optional<UsersMatchAttributes, UsersMatchOptionalAttributes>;

export class UsersMatch extends Model<UsersMatchAttributes, UsersMatchCreationAttributes> implements UsersMatchAttributes {
  declare id?: number;
  declare user_id: number;
  declare match_id: number;

  // UsersMatch belongsTo Match via match_id
  match!: Match;
  getMatch!: Sequelize.BelongsToGetAssociationMixin<Match>;
  setMatch!: Sequelize.BelongsToSetAssociationMixin<Match, MatchId>;
  createMatch!: Sequelize.BelongsToCreateAssociationMixin<Match>;
  // UsersMatch belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UsersMatch {
    return UsersMatch.init({
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
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'matches',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users_matches',
    timestamps: false
  });
  }
}
