const { Service } = require('../models');

const serviceData = [
    {
        category: 'Braids',
        style: 'Cornrows',
        description: '2 braids in cornrows braided close to the scalp. This style is the most iconic cornrow style.',
        style_image: 'cornrow image',
        price: '100',
        time_alloted: '60',
        customer_id: '1',
        stylist_id: '1'
    }, 
    {
        category: 'Braids',
        style: 'Crochet',
        description: 'A special way of braiding that adds extensions to the hair.',
        style_image: 'crochet image',
        price: '100',
        time_alloted: '90',
        customer_id: '2',
        stylist_id: '1'
    }, 
    {
        category: 'Braids',
        style: 'Crochet Singles',
        description: 'A special way of braiding that adds extensions to the hair.',
        style_image: 'crochet image',
        price: '100',
        time_alloted: '120',
        customer_id: '8',
        stylist_id: '1'
    }, 
    {
        category: 'Braids',
        style: 'Twist',
        description: '',
        style_image: 'twist image',
        price: '100',
        time_alloted: '120',
        customer_id: '2',
        stylist_id: '1'
    }, 
    {
        category: 'Braids',
        style: 'Locs loc/retwist',
        description: '',
        style_image: 'Loc image',
        price: '100',
        time_alloted: '150',
        customer_id: '4',
        stylist_id: '1'
    }, 
    {
        category: 'Braids',
        style: 'All Singles',
        description: '',
        style_image: 'single braid image',
        price: '100',
        time_alloted: '390',
        customer_id: '3',
        stylist_id: '1'
    }, 
    {
        category: 'Braids',
        style: 'Box Braids',
        description: '',
        style_image: 'box braid image',
        price: '100',
        time_alloted: '390',
        customer_id: '2',
        stylist_id: '1'
    }, 
    {
        category: 'Cut',
        style: 'Hair Cut or Trim',
        description: '',
        style_image: 'Hair cut image',
        price: '50',
        time_alloted: '30',
        customer_id: '8',
        stylist_id: '1'
    }, 
    {
        category: 'Cut',
        style: 'Wash with flatiron or wash press',
        description: '',
        style_image: 'flat iron image',
        price: '75',
        time_alloted: '150',
        customer_id: '6',
        stylist_id: '1'
    }, 
    {
        category: 'Cut',
        style: 'Blow dry',
        description: '',
        style_image: 'flat iron image',
        price: '40',
        time_alloted: '30',
        customer_id: '7',
        stylist_id: '1'
    }, 
    {
        category: 'Perm',
        style: 'Perm or Relaxer',
        description: '',
        style_image: 'perm image',
        price: '100',
        time_alloted: '120',
        customer_id: '4',
        stylist_id: '1'
    }, 
    {
        category: 'Color',
        style: 'Hair Coloring',
        description: '',
        style_image: 'hair color image',
        price: '100',
        time_alloted: '150',
        customer_id: '3',
        stylist_id: '1'
    }, 
    {
        category: 'Cut',
        style: 'Conditioning Treatments',
        description: '',
        style_image: 'hair conditioning image',
        price: '75',
        time_alloted: '120',
        customer_id: '5',
        stylist_id: '1'
    },
        
];

const seedService = () => Service.bulkCreate(serviceData);

module.exports = seedService;