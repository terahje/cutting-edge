const router = require('express').Router();
const {Service, Appointment, Customer, Stylist} = require('../models');


router.get('/:id', (req, res) => {
    Customer.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'username',
            'first_name',
            'last_name',
        ],
        include: [
            {
                model: Appointment,
                attributes: ['id', 'customer_id', 'appointment_date', 'appointment_time', 'stylist_id'],   
            }, 
            {
                model: Service,
                attributes: ['style', 'description'],
            }      
        ]
    })
    .then(dbCustomerData => {
        if(!dbCustomerData) {
            res.status(404).json({message: "We could not find a customer with that id"});
            return;
        }
        const customer = dbCustomerData.get({plain:true});
        res.render('dashboard', {
            customer,
            loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });

});

module.exports = router;