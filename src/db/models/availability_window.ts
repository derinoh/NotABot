import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './user';

export interface AvailabilityWindowAttributes {
  id?: number;
  user_id: number;
  date: string;
  time: string;
  hours: number;
  is_available: number;
  created_on?: Date;
}

export type AvailabilityWindowPk = "id";
export type AvailabilityWindowId = AvailabilityWindow[AvailabilityWindowPk];
export type AvailabilityWindowOptionalAttributes = "id" | "is_available" | "created_on";
export type AvailabilityWindowCreationAttributes = Optional<AvailabilityWindowAttributes, AvailabilityWindowOptionalAttributes>;

export class AvailabilityWindow extends Model<AvailabilityWindowAttributes, AvailabilityWindowCreationAttributes> implements AvailabilityWindowAttributes {
  declare id?: number;
  declare user_id: number;
  declare date: string;
  declare time: string;
  declare hours: number;
  declare is_available: number;
  declare created_on?: Date;

  // AvailabilityWindow belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AvailabilityWindow {
    return AvailabilityWindow.init({
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
    date: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'availability_window',
    timestamps: false
  });
  }
}
