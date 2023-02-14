import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Frequency, FrequencyId } from './frequency';
import type { User, UserId } from './user';

export interface RotatingAvailabilityAttributes {
  id?: number;
  user_id: number;
  freq_id: number;
  weekday: number;
  start_time: string;
  end_time: string;
  created_on: Date;
}

export type RotatingAvailabilityPk = "id";
export type RotatingAvailabilityId = RotatingAvailability[RotatingAvailabilityPk];
export type RotatingAvailabilityOptionalAttributes = "id" | "created_on";
export type RotatingAvailabilityCreationAttributes = Optional<RotatingAvailabilityAttributes, RotatingAvailabilityOptionalAttributes>;

export class RotatingAvailability extends Model<RotatingAvailabilityAttributes, RotatingAvailabilityCreationAttributes> implements RotatingAvailabilityAttributes {
  id?: number;
  user_id!: number;
  freq_id!: number;
  weekday!: number;
  start_time!: string;
  end_time!: string;
  created_on!: Date;

  // RotatingAvailability belongsTo Frequency via freq_id
  freq!: Frequency;
  getFreq!: Sequelize.BelongsToGetAssociationMixin<Frequency>;
  setFreq!: Sequelize.BelongsToSetAssociationMixin<Frequency, FrequencyId>;
  createFreq!: Sequelize.BelongsToCreateAssociationMixin<Frequency>;
  // RotatingAvailability belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RotatingAvailability {
    return RotatingAvailability.init({
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
    tableName: 'rotating_availability',
    timestamps: false
  });
  }
}
