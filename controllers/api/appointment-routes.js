const router = require('express').Router();
const { Appointment, Customer, Service } = require('../../models');
//const withAuth = require("../../utils/auth");

//get api/appointment
router.get('/',  (req, res) => {
    Appointment.findAll({
        attributes: ['id', 'customer_id','appointment_date', 'appointment_date_end', 'appointment_time' , 'appointment_time_end', 'service_id'],
        include: [
            {
                model: Customer,
                attributes: ['username']
            }, 
            {
                model: Service,
                attributes: ['style']
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
        where: {
            id: req.params.id
        },
        attributes: ['id', 'customer_id','appointment_date', 'appointment_date_end', 'appointment_time', 'appointment_time_end', 'service_id'],
        include: [
            {
                model: Customer,
                attributes: ['username']
            }, 
            {
                model: Service,
                attributes: ['style']
            }
        ]
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
        appointment_date_end: req.body.appointment_date_end,
        appointment_time: req.body.appointment_time,
        appointment_time_end: req.body.appointment_time_end,
        service_id: req.body.service_id,
    })
    .then(dbAppointmentData => res.json(dbAppointmentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
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