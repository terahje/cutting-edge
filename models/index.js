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

Stylist.hasMany(Customer, {
    foreignKey: 'stylist_id'
});

Customer.hasOne(Service, {
    foreignKey: 'customer_id'
});

Service.hasMany(Customer,  {
    foreignKey: 'stylist_id'
});

Stylist.hasMany(Appointment, {
    foreignKey: 'stylist_id'
});

Customer.hasMany(Appointment, {
    foreignKey: 'customer_id'
  });

Appointment.belongsTo(Customer, {
    foreignKey: 'customer_id',
  });

// Appointment.hasOne(Stylist, {
//     foreignKey: 'stylist_id'
// });

module.exports = {
    Customer,
    Appointment,
    Stylist,
    Service
};