const seedService = require('./service-seeds.js');
const seedStylist = require('./stylist-seeds.js');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\n--------DATABASE SYNCED -------\n');
    await seedStylist();
    console.log('\n--------STYLISTS SEEDED -------\n');
    await seedService();
    console.log('\n--------SERVICES SEEDED -------\n');

    process.exit(0);
};

seedAll();