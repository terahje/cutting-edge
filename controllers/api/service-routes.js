const router = require('express').Router();
const { Service, Stylist, Customer, Appointment } = require('../../models');

//get api/service
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
        .then(dbStylistData => res.json(dbStylistData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get api/service/1
router.get('/:id', (req, res) => {
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
                    attributes: ['appointment_date', 'appointment_date_end', 'appointment_time', 'appointment_time_end',]
                }
        ]
    })
    .then(dbStylistData => {
        if(!dbStylistData) {
            res.status(404).json({message: "No stylist found with that ID" });
            return;
        }
        res.json(dbStylistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//post api/service
router.post('/', (req, res) => {
    Service.create({
        category: req.body.category,
        style: req.body.style,
        description: req.body.description,
        price: req.body.price,
        time_alloted: req.body.time_alloted,
        // customer_id: req.body.customer_id,
        stylist_id: req.body.stylist_id
    })
    .then(dbStylistData => res.json(dbStylistData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//put api/service/i
router.put('/:id', (req, res) => {
    Service.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbStylistData => {
        if(!dbStylistData[0]) {
            res.status(404).json({message: "No stylist found with this id"});
            return;
        }
        res.json(dbStylistData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//delete api/service/i
router.delete('/:id', (req, res) => {
    Service.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbStylistData => {
        if(!dbStylistData) {
            res.status(404).json({message: "No service with that id found"});
            return;
        }
        res.json(dbStylistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;