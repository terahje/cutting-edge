const Customer = require('./Customer');
const Appointment = require('./Appointment');
const Stylist = require('./Stylist');
const Service = require('./Service');

//associations
// Stylist.hasMany(Service, {
//     foreignKey: 'stylist_id'
// });

// Service.belongsTo(Stylist, {
//     foreignKey: 'stylist_id'
// });


module.exports = {
    Customer,
    Appointment,
    Stylist,
    Service
};
