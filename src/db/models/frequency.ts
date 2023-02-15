import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AvailabilityRecurring, AvailabilityRecurringId } from './availability_recurring';

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

  // Frequency hasMany AvailabilityRecurring via freq_id
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
