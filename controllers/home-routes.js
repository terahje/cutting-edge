const router = require('express').Router();
const sequelize = require('../config/connection');
const {Service, Stylist} = require('../models');
const calendar=require('../public/javascript/calendar');

router.get('/', (req, res) => {
   Service.findAll({
       attributes: [
           'id',
           'category',
           'style',
           'description',
           'price',
           'time_alloted',
           'stylist_id'
       ],
       include: [
           {
               model: Stylist,
               attributes: ['salon_name']
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


router.get('/calendar', (req, res) => {
    res.render('calendar', {calendar});
});

module.exports = router;