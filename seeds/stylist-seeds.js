const { Stylist } = require('../models');

const stylistData = [
{
    username: "SammyS",
    first_name: "Sammy",
    last_name: "Salonly",
    salon_name: "Sammy's Salon",
    email: "sammySalon@gmail.com",
    password: "s1234",
}, 
{
    username: "KatieDidIt",
    first_name: "Kate",
    last_name: "Cutter",
    salon_name: "Cutter's Hair Shoppe",
    email: "katieCutter@email.com",
    password: "k1234", 
    },
];
const seedStylist = () => Stylist.bulkCreate(stylistData);

module.exports = seedStylist;
