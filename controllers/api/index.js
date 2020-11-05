const router = require('express').Router();
const stylistRoutes = require('./stylist-routes.js');

router.use('./stylists', stylistRoutes);

module.exports = router;