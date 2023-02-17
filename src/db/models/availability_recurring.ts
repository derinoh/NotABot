import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Frequency, FrequencyId } from './frequency';
import type { User, UserId } from './user';

export interface AvailabilityRecurringAttributes {
  id?: number;
  user_id: number;
  freq_id: number;
  weekday: number;
  start_time: string;
  end_time: string;
  created_on: Date;
}

export type AvailabilityRecurringPk = "id";
export type AvailabilityRecurringId = AvailabilityRecurring[AvailabilityRecurringPk];
export type AvailabilityRecurringOptionalAttributes = "id" | "created_on";
export type AvailabilityRecurringCreationAttributes = Optional<AvailabilityRecurringAttributes, AvailabilityRecurringOptionalAttributes>;

export class AvailabilityRecurring extends Model<AvailabilityRecurringAttributes, AvailabilityRecurringCreationAttributes> implements AvailabilityRecurringAttributes {
  declare id?: number;
  declare user_id: number;
  declare freq_id: number;
  declare weekday: number;
  declare start_time: string;
  declare end_time: string;
  declare created_on: Date;

  // AvailabilityRecurring belongsTo Frequency via freq_id
  freq!: Frequency;
  getFreq!: Sequelize.BelongsToGetAssociationMixin<Frequency>;
  setFreq!: Sequelize.BelongsToSetAssociationMixin<Frequency, FrequencyId>;
  createFreq!: Sequelize.BelongsToCreateAssociationMixin<Frequency>;
  // AvailabilityRecurring belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AvailabilityRecurring {
    return AvailabilityRecurring.init({
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
    freq_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'frequencies',
        key: 'id'
      }
    },
    weekday: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    end_time: {
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
    tableName: 'availability_recurring',
    timestamps: false
  });
  }
}
