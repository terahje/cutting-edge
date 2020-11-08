const { Service } = require('../models');

const serviceData = [
    {
        category: 'Braids',
        style: 'Cornrows',
        description: '2 braids in cornrows braided close to the scalp. This style is the most iconic cornrow style.',
        style_image: 'cornrow image',
        price: '100',
        time_alloted: '01:00:00',
    }, 
    {
        category: 'Braids',
        style: 'Crochet',
        description: 'A special way of braiding that adds extensions to the hair.',
        style_image: 'crochet image',
        price: '100',
        time_alloted: '01:30:00',
    }, 
    {
        category: 'Braids',
        style: 'Crochet Singles',
        description: 'A special way of braiding that adds extensions to the hair.',
        style_image: 'crochet image',
        price: '100',
        time_alloted: '02:00:00',
    }, 
    {
        category: 'Braids',
        style: 'Twist',
        description: '',
        style_image: 'twist image',
        price: '100',
        time_alloted: '02:00:00',
    }, 
    {
        category: 'Braids',
        style: 'Locs loc/retwist',
        description: '',
        style_image: 'Loc image',
        price: '100',
        time_alloted: '02:30:00',
    }, 
    {
        category: 'Braids',
        style: 'All Singles',
        description: '',
        style_image: 'single braid image',
        price: '100',
        time_alloted: '06:30:00',
    }, 
    {
        category: 'Braids',
        style: 'Box Braids',
        description: '',
        style_image: 'box braid image',
        price: '100',
        time_alloted: '06:30:00',
    }, 
    {
        category: 'Hair',
        style: 'Hair Cut or Trim',
        description: '',
        style_image: 'Hair cut image',
        price: '50',
        time_alloted: '00:30:00',
    }, 
    {
        category: 'Hair',
        style: 'Wash with flatiron or wash press',
        description: '',
        style_image: 'flat iron image',
        price: '75',
        time_alloted: '02:30:00',
    }, 
    {
        category: 'Hair',
        style: 'Blow dry',
        description: '',
        style_image: 'flat iron image',
        price: '40',
        time_alloted: '00:30:00',
    }, 
    {
        category: 'Hair',
        style: 'Perm or Relaxer',
        description: '',
        style_image: 'perm image',
        price: '100',
        time_alloted: '02:00:00',
    }, 
    {
        category: 'Hair',
        style: 'Hair Coloring',
        description: '',
        style_image: 'hair color image',
        price: '100',
        time_alloted: '02:30:00',
    }, 
    {
        category: 'Hair',
        style: 'Conditioning Treatments',
        description: '',
        style_image: 'hair conditioning image',
        price: '75',
        time_alloted: '01:30:00',
    },
        
];

const seedService = () => Service.bulkCreate(serviceData);

module.exports = seedService;