const router = require('express').Router();
const {Service, Appointment, Customer, Stylist} = require('../models');

router.get('/:id', (req, res) => {
    Appointment.findAll({
      where: {
        // use the ID from the session
        customer_id: req.session.customer_id
      },
      attributes: ['id', 'customer_id','appointment_date', 'appointment_date_end', 'appointment_time' , 'appointment_time_end', 'service_id'],
      include: [
          {
              model: Customer,
              attributes: ['username', 'id']
          }, 
          {
              model: Service,
              attributes: ['style', 'id', 'price', 'description'],
          }
      ]
  })
      .then(dbAppointmentData => {
        // serialize data before passing to template
        const appointment = dbAppointmentData.map(appointment => appointment.get({ plain: true }));
        res.render('dashboard', { appointment, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;