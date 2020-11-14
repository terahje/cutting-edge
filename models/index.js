const Customer = require('./Customer');
const Appointment = require('./Appointment');
const Stylist = require('./Stylist');
const Service = require('./Service');

//associations
Stylist.hasMany(Service, {
    foreignKey: 'stylist_id'
});

Service.belongsTo(Stylist, {
    foreignKey: 'stylist_id'
});

Customer.hasOne(Appointment, {
    foreignKey: 'customer_id'
  });

Appointment.belongsTo(Customer, {
    foreignKey: 'customer_id',
  });

  Service.hasMany(Appointment, {
      foreignKey: 'service_id'
  });

  Appointment.belongsTo(Service, {
      foreignKey: 'service_id'
  });

module.exports = {
    Customer,
    Appointment,
    Stylist,
    Service
};