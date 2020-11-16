const router = require('express').Router();
const sequelize = require('../config/connection');
const {Service, Stylist, Appointment, Customer} = require('../models');

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
                attributes: ['appointment_date', 'appointment_date_end', 'appointment_time', 'appointment_time_end',]
            }
        ]
    })
    .then(dbServiceData => {
        const services = dbServiceData.map(service => service.get({plain:true}));
        res.render('edit-services', { services });
    })
    .catch(err => {
        conole.log(err);
        res.status(500).json(err);
    });
 });

 router.get('/login', (req,res) => {
     if(req.session.loggedIn) {
         res.redirect('/admin');
         return;
     }
     res.render('admin-login');
 });

 router.get('/create-stylist', (req, res) => {
     res.render('create-stylist')
 });

 router.get('/edit/:id', (req, res) => {
    Service.findOne({
        where: {
            id: req.params.id
        }, 
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
                attributes: ['appointment_date', 'appointment_date_end','appointment_time', 'appointment_time_end',],
                include: {
                    model: Customer,
                    attributes: ['id', 'username']
                }
            }
        ]
    })
    .then(dbServiceData => {
        if(!dbServiceData) {
            res.status(404).json({message: "We could not find a service with that id"});
            return;
        }
        const service = dbServiceData.get({plain: true});
        res.render('edit-service-single', {
            service,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    
});

router.get('/book/:id', (req, res) => {
    Service.findOne({
        where: {
            id: req.params.id
        }, 
        attributes: ['id', 'category', 'style', 'description', 'stylist_id', 'price', 'time_alloted'],
        include: [
            {
                model: Stylist,
                attributes: ['salon_name'],
            }, 
                {
                    model: Appointment,
                    attributes: ['appointment_date', 'appointment_date_end', 'appointment_time', 'appointment_time_end',],
                    include: {
                        model: Customer,
                        attributes: ['id', 'username']
                    }
                }
        ]
    })
    .then(dbServiceData => {
        if(!dbServiceData) {
            res.status(404).json({message: "No service found with that ID" });
            return;
        }

        const service = dbServiceData;
        const customer = req.session.customer_id;
        console.log(customer)
        // res.json(dbStylistData);
        res.render('book-appointment', {service, customer});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;