const Sequelize = require('sequelize');

require('dotenv').config();

if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)

    sequelize.query('SET GLOBAL FOREIGN_KEY_CHECKS = 0;', { raw: true });
    // Do Some Action
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;