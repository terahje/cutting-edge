const router = require('express').Router();
const sequelize = require('../config/connection');
const {Service, Stylist} = require('../models');

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
        res.render('edit-services', { services });
    })
    .catch(err => {
        conole.log(err);
        res.status(500).json(err);
    });
 });

 router.get('/edit/:id', (req, res) => {
    Service.findOne({
        where: {
            id: req.params.id
        }, 
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
    res.render('book-appointment');
});
module.exports = router;