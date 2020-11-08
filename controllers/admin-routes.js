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
     res.render('edit-service-single');
    
});

module.exports = router;