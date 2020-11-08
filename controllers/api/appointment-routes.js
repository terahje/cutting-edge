const router = require('express').Router();
const { Appointment, Customer } = require('../../models');
const withAuth = require("../../utils/auth");

//get api/appointment
router.get('/',  (req, res) => {
    Appointment.findAll({
        attributes: ['id', 'customer_id','appointment_date', 'appointment_time' , 'stylist_id'],
        include: [
            {
                model: Customer,
                attributes: ['username']
            }
        ]
    })
        .then(dbAppointmentData => res.json(dbAppointmentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get api/appointment/1
router.get('/:id', (req, res) => {
    Appointment.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbAppointmentData => {
        if(!dbAppointmentData) {
            res.status(404).json({message: "No appointment found with that ID" });
            return;
        }
        res.json(dbAppointmentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//post api/appointment
router.post('/', (req, res) => {
    Appointment.create({
        customer_id: req.body.customer_id,
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time,
        stylist_id: req.body.stylist_id,
    })
    .then(dbAppointmentData => res.json(dbAppointmentData))
    console.log("hello")
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//login route
//http://localhost:3001/api/appointment/login
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Appointment.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbAppointmentData => {
      if (!dbAppointmentData) {
        res.status(400).json({ message: 'No appointment with that email address!' });
        return;
      }
  
      const validPassword = dbAppointmentData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      res.json({ stylist: dbAppointmentData, message: 'You are now logged in!' });
    });
  });

//put api/appointment/i
router.put('/:id', (req, res) => {
    Appointment.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbAppointmentData => {
        if(!dbAppointmentData[0]) {
            res.status(404).json({message: "No appointment found with this id"});
            return;
        }
        res.json(dbAppointmentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//delete api/appointment/i
router.delete('/:id', (req, res) => {
    Appointment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbAppointmentData => {
        if(!dbAppointmentData) {
            res.status(404).json({message: "No appointment with that id found"});
            return;
        }
        res.json(dbAppointmentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;