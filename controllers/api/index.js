const router = require('express').Router();

const customerRoutes = require('./customer-routes.js');
const stylistRoutes = require('./stylist-routes.js');

router.use('/customer', customerRoutes);
router.use('/stylists', stylistRoutes);


module.exports = router;