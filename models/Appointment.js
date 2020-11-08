const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class Appointment extends Model {
  // set up method to run on instance data (per Appointment) to check password
  //checkPassword(loginPw) {
    //return bcrypt.compareSync(loginPw, this.password);
  //}
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    stylist_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'stylist',
          key: 'id',
          },
    //}
 // },
  //{
    //hooks: {
      // set up beforeCreate lifecycle "hook" functionality
     // async beforeCreate(newAppointmentData) {
       // newAppointmentData.password = await bcrypt.hash(newAppointmentData.password, 10);
        //return newAppointmentData;
      //},

      //async beforeUpdate(newAppointmentData) {
       // newAppointmentData.password = await bcrypt.hash(newAppointmentData.password, 10);
        //return newAppointmentData;
      //}
    },
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
