const router = require('express').Router();

const customerRoutes = require('./customer-routes.js');

router.use('/customer', customerRoutes);

module.exports = router;