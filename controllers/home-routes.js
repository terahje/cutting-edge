const router = require('express').Router();
const sequelize = require('../config/connection');
const {Service, Stylist, Appointment} = require('../models');

router.get('/', (req, res) => {
   Service.findAll({
    attributes: ['id', 'category', 'style', 'description', 'stylist_id', 'price', 'time_alloted'],
    include: [
      {
          model: Stylist,
          attributes: ['salon_name']
      }
  ], 
  include: [
      {
          model: Appointment,
          attributes: ['appointment_date', 'appointment_time', 'appointment_time_end',]
      }
  ]
   })
   .then(dbServiceData => {
       const services = dbServiceData.map(service => service.get({plain:true}));
       res.render('homepage', { services });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    
    res.render("login");
  });

module.exports = router;