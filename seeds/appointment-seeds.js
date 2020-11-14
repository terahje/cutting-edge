const { Appointment } = require('../models');

const appointmentData = [
{
    customer_id: '1',
    appointment_date: '11/16/20',
    appointment_date_end: '11/16/20',
    appointment_time: '11:00:00',
    appointment_time_end: '11:30:00',
    service_id: '1',
}, 
{
    customer_id: '2',
    appointment_date: '11/20/20',
    appointment_date_end: '11/20/20',
    appointment_time: '10:00:00',
    appointment_time_end: '11:30:00',
    service_id: '1',
}, 
{
    customer_id: '3',
    appointment_date: '11/18/200',
    appointment_date_end: '11/18/20',
    appointment_time: '09:00:00',
    appointment_time_end: '10:30:00',
    service_id: '2',
}, 
{
    customer_id: '4',
    appointment_date: '11/19/20',
    appointment_date_end: '11/19/200',
    appointment_time: '10:00:00',
    appointment_time_end: '11:00:00',
    service_id: '1',
}, 
{
    customer_id: '5',
    appointment_date: '11/22/20',
    appointment_date_end: '11/22/20',
    appointment_time: '08:00:00',
    appointment_time_end: '11:30:00',
    service_id: '2',
}, 
{
    customer_id: '6',
    appointment_date: '11/26/20',
    appointment_date_end: '11/26/20',
    appointment_time: '10:00:00',
    appointment_time_end: '11:30:00',
    service_id: '2',
}, 
{
    customer_id: '7',
    appointment_date: '11/25/20',
    appointment_date_end: '11/25/20',
    appointment_time: '11:00:00',
    appointment_time_end: '11:30:00',
    service_id: '1',
}, 
{
    customer_id: '8',
    appointment_date: '11/30/20',
    appointment_date_end: '11/30/20',
    appointment_time: '12:00:00',
    appointment_time_end: '13:30:00',
    service_id: '2',
}, 
{
    customer_id: '1',
    appointment_date: '11/29/20',
    appointment_date_end: '11/29/20',
    appointment_time: '11:00:00',
    appointment_time_end: '11:30:00',
    service_id: '1',
}, 
{
    customer_id: '3',
    appointment_date: '11/28/20',
    appointment_date_end: '11/28/20',
    appointment_time: '10:00:00',
    appointment_time_end: '11:00:00',
    service_id: '1',
}, 

];
const seedAppointment = () => Appointment.bulkCreate(appointmentData);

module.exports = seedAppointment;