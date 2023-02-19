import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AvailabilityRecurring, AvailabilityRecurringId } from './availability_recurring';
import type { AvailabilityWindow, AvailabilityWindowId } from './availability_window';
import type { UsersGame, UsersGameId } from './users_game';
import type { UsersMatch, UsersMatchId } from './users_match';

export interface UserAttributes {
  id?: number;
  discordId: string;
  timezone: string;
  created_on?: Date;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "id" | "created_on";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id?: number;
  declare discordId: string;
  declare timezone: string;
  declare created_on?: Date;

  // User hasMany AvailabilityRecurring via user_id
  availability_recurrings!: AvailabilityRecurring[];
  getAvailability_recurrings!: Sequelize.HasManyGetAssociationsMixin<AvailabilityRecurring>;
  setAvailability_recurrings!: Sequelize.HasManySetAssociationsMixin<AvailabilityRecurring, AvailabilityRecurringId>;
  addAvailability_recurring!: Sequelize.HasManyAddAssociationMixin<AvailabilityRecurring, AvailabilityRecurringId>;
  addAvailability_recurrings!: Sequelize.HasManyAddAssociationsMixin<AvailabilityRecurring, AvailabilityRecurringId>;
  createAvailability_recurring!: Sequelize.HasManyCreateAssociationMixin<AvailabilityRecurring>;
  removeAvailability_recurring!: Sequelize.HasManyRemoveAssociationMixin<AvailabilityRecurring, AvailabilityRecurringId>;
  removeAvailability_recurrings!: Sequelize.HasManyRemoveAssociationsMixin<AvailabilityRecurring, AvailabilityRecurringId>;
  hasAvailability_recurring!: Sequelize.HasManyHasAssociationMixin<AvailabilityRecurring, AvailabilityRecurringId>;
  hasAvailability_recurrings!: Sequelize.HasManyHasAssociationsMixin<AvailabilityRecurring, AvailabilityRecurringId>;
  countAvailability_recurrings!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany AvailabilityWindow via user_id
  availability_windows!: AvailabilityWindow[];
  getAvailability_windows!: Sequelize.HasManyGetAssociationsMixin<AvailabilityWindow>;
  setAvailability_windows!: Sequelize.HasManySetAssociationsMixin<AvailabilityWindow, AvailabilityWindowId>;
  addAvailability_window!: Sequelize.HasManyAddAssociationMixin<AvailabilityWindow, AvailabilityWindowId>;
  addAvailability_windows!: Sequelize.HasManyAddAssociationsMixin<AvailabilityWindow, AvailabilityWindowId>;
  createAvailability_window!: Sequelize.HasManyCreateAssociationMixin<AvailabilityWindow>;
  removeAvailability_window!: Sequelize.HasManyRemoveAssociationMixin<AvailabilityWindow, AvailabilityWindowId>;
  removeAvailability_windows!: Sequelize.HasManyRemoveAssociationsMixin<AvailabilityWindow, AvailabilityWindowId>;
  hasAvailability_window!: Sequelize.HasManyHasAssociationMixin<AvailabilityWindow, AvailabilityWindowId>;
  hasAvailability_windows!: Sequelize.HasManyHasAssociationsMixin<AvailabilityWindow, AvailabilityWindowId>;
  countAvailability_windows!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany UsersGame via user_id
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
  // User hasMany UsersMatch via user_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    discordId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timezone: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false
  });
  }
}
