const router = require('express').Router();
const sequelize = require('../config/connection');
const {Service, Stylist, Appointment, Customer} = require('../models');

router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {

   Service.findAll({
    customer_id: req.session.customer_id,   
    attributes: ['id', 'category', 'style', 'description', 'stylist_id', 'price', 'time_alloted'],
  //   include: [
  //     {
  //         model: Stylist,
  //         attributes: ['salon_name']
  //     }
  // ], 
  include: [
      {
          model: Appointment,
          attributes: ['appointment_date', 'appointment_date_end', 'appointment_time', 'appointment_time_end',], 
          include: {
            model: Customer,
            attributes: ['id', 'username'],
        }
          
      }
  ]
   })
   .then(dbServiceData => {
       const services = dbServiceData.map(service => service.get({plain:true}));
       const customer = req.session.customer_id;
       console.log(customer)
       res.render('homepage', { services, customer });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
}

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
    
    res.render("signup");
  });

module.exports = router;