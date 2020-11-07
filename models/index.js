const Customer = require('./Customer');
const Appointment = require('./Appointment');
const Stylist = require('./Stylist');

// create associations
Customer.hasMany(Appointment, {
    foreignKey: 'customer_id'
  });

  Appointment.belongsTo(Customer, {
    foreignKey: 'customer_id',
  });

  Stylist.belongsToMany(Customer, {
      through: Appointment,
      as: 'stylist_id',
      foreignKey: 'stylist_id'
  })

module.exports = {
    Customer,
    Appointment,
    Stylist,
};