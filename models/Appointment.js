const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customer',
        key: 'id',
        },
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    appointment_date_end: {
      type: DataTypes.DATE
      // allowNull: false,
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    appointment_time_end: {
      type: DataTypes.TIME
      // allowNull: false,
  },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'service',
          key: 'id',
          },
    }
  },
  {
   
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'appointment'
  }
);

module.exports = Appointment;
