const router = require('express').Router();

const customerRoutes = require('./customer-routes.js');
const appointmentRoutes = require('./appointment-routes.js');

const stylistRoutes = require('./stylist-routes.js');

router.use('/customer', customerRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/stylists', stylistRoutes);



module.exports = router;