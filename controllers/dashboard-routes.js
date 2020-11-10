const router = require('express').Router();
const sequelize = require('../config/connection');
const {Service, Appointment, Customer, Stylist} = require('../models');
// 

router.get('/', (req, res) => {
    res.render('dashboard', {loggedIn: true});
});
module.exports = router;