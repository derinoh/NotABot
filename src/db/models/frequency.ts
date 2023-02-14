import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RotatingAvailability, RotatingAvailabilityId } from './rotating_availability';

export interface FrequencyAttributes {
  id?: number;
  name?: string;
}

export type FrequencyPk = "id";
export type FrequencyId = Frequency[FrequencyPk];
export type FrequencyOptionalAttributes = "id" | "name";
export type FrequencyCreationAttributes = Optional<FrequencyAttributes, FrequencyOptionalAttributes>;

export class Frequency extends Model<FrequencyAttributes, FrequencyCreationAttributes> implements FrequencyAttributes {
  id?: number;
  name?: string;

  // Frequency hasMany RotatingAvailability via freq_id
  rotating_availabilities!: RotatingAvailability[];
  getRotating_availabilities!: Sequelize.HasManyGetAssociationsMixin<RotatingAvailability>;
  setRotating_availabilities!: Sequelize.HasManySetAssociationsMixin<RotatingAvailability, RotatingAvailabilityId>;
  addRotating_availability!: Sequelize.HasManyAddAssociationMixin<RotatingAvailability, RotatingAvailabilityId>;
  addRotating_availabilities!: Sequelize.HasManyAddAssociationsMixin<RotatingAvailability, RotatingAvailabilityId>;
  createRotating_availability!: Sequelize.HasManyCreateAssociationMixin<RotatingAvailability>;
  removeRotating_availability!: Sequelize.HasManyRemoveAssociationMixin<RotatingAvailability, RotatingAvailabilityId>;
  removeRotating_availabilities!: Sequelize.HasManyRemoveAssociationsMixin<RotatingAvailability, RotatingAvailabilityId>;
  hasRotating_availability!: Sequelize.HasManyHasAssociationMixin<RotatingAvailability, RotatingAvailabilityId>;
  hasRotating_availabilities!: Sequelize.HasManyHasAssociationsMixin<RotatingAvailability, RotatingAvailabilityId>;
  countRotating_availabilities!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Frequency {
    return Frequency.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'frequencies',
    timestamps: false
  });
  }
}
