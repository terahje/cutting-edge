const { Customer } = require('../models');

const customerData = [
    {
        first_name: 'Codie',
        last_name: 'Law',
        email: 'codered@gmail.com',
        username: 'codered',
        password: 'password',
        phone: '7175554444',
      },
      {
        first_name: 'Linda',
        last_name: 'Law',
        email: 'lindalaw@gmail.com',
        username: 'llaw60',
        password: 'password',
        phone: '5207778888',
      },
      {
        first_name: 'Ty',
        last_name: 'Law',
        email: 'tylaw@gmail.com',
        username: 'tytylaw42',
        password: 'password',
        phone: '7173154444',
      },
      {
        first_name: 'Carol',
        last_name: 'Law',
        email: 'gmalaw@gmail.com',
        username: 'gmalaw',
        password: 'password',
        phone: '7179854444',
      },
      {
        first_name: 'Alexis',
        last_name: 'Law',
        email: 'horsesarethebest@gmail.com',
        username: 'horses4life',
        password: 'password',
        phone: '7176634444',
      },
      {
        first_name: 'Mary',
        last_name: 'Master',
        email: 'mmaster87@gmail.com',
        username: 'mmaster87',
        password: 'password',
        phone: '5204443331',
      },
      {
        first_name: 'Tristen',
        last_name: 'James',
        email: 'tjlocks@gmail.com',
        username: 'tjlocks',
        password: 'password',
        phone: '5205255564',
      },
      {
        first_name: 'Ruby',
        last_name: 'Bjornson',
        email: 'rbjorn@gmail.com',
        username: 'rbjorn',
        password: 'password',
        phone: '5202234444',
      },
      
];

const seedCustomer = () => Customer.bulkCreate(customerData);

module.exports = seedCustomer;