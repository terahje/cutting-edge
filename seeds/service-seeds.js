const { Service } = require('../models');

const serviceData = [
    {
        category: 'Braids',
        style: 'Cornrows',
        description: '2 braids in cornrows braided close to the scalp. This style is the most iconic cornrow style.',
        style_image: 'cornrow image',
        price: '100',
        time_alloted: '60',
    }, 
    {
        category: 'Braids',
        style: 'Crochet',
        description: 'A special way of braiding that adds extensions to the hair.',
        style_image: 'crochet image',
        price: '100',
        time_alloted: '90',
    }, 
    {
        category: 'Braids',
        style: 'Crochet Singles',
        description: 'A special way of braiding that adds extensions to the hair.',
        style_image: 'crochet image',
        price: '100',
        time_alloted: '120',
    }, 
    {
        category: 'Braids',
        style: 'Twist',
        description: '',
        style_image: 'twist image',
        price: '100',
        time_alloted: '120',
    }, 
    {
        category: 'Braids',
        style: 'Locs loc/retwist',
        description: '',
        style_image: 'Loc image',
        price: '100',
        time_alloted: '150',
    }, 
    {
        category: 'Braids',
        style: 'All Singles',
        description: '',
        style_image: 'single braid image',
        price: '100',
        time_alloted: '390',
    }, 
    {
        category: 'Braids',
        style: 'Box Braids',
        description: '',
        style_image: 'box braid image',
        price: '100',
        time_alloted: '390',
    }, 
    {
        category: 'Cut',
        style: 'Hair Cut or Trim',
        description: '',
        style_image: 'Hair cut image',
        price: '50',
        time_alloted: '30',
    }, 
    {
        category: 'Cut',
        style: 'Wash with flatiron or wash press',
        description: '',
        style_image: 'flat iron image',
        price: '75',
        time_alloted: '150',
    }, 
    {
        category: 'Cut',
        style: 'Blow dry',
        description: '',
        style_image: 'flat iron image',
        price: '40',
        time_alloted: '30',
    }, 
    {
        category: 'Perm',
        style: 'Perm or Relaxer',
        description: '',
        style_image: 'perm image',
        price: '100',
        time_alloted: '120',
    }, 
    {
        category: 'Color',
        style: 'Hair Coloring',
        description: '',
        style_image: 'hair color image',
        price: '100',
        time_alloted: '150',
    }, 
    {
        category: 'Cut',
        style: 'Conditioning Treatments',
        description: '',
        style_image: 'hair conditioning image',
        price: '75',
        time_alloted: '120',
    },
        
];

const seedService = () => Service.bulkCreate(serviceData);

module.exports = seedService;