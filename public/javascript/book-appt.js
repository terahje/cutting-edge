async function appointmentFormHandler(event) {
    event.preventDefault();
    
//     <!-- bring in user from session id and the style from the book button get request -->
//     <!-- Appointment -->
//    <!-- attributes: ['id', 'customer_id','appointment_date', 'appointment_time' , 'stylist_id'], -->

const appointment_date = document.querySelector('input[name="date-book"]').value;
const appointment_time = document.querySelector('input[name="time-book"]').value;
//service id
const id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
];

const response = await fetch(`/api/appointment/${id}` , {
    method: 'PUT',
    body: JSON.stringify ({
        appointment_date,
        appointment_time
    }), 
    headers: {
        'Content-Type': 'application/json'
    }
});

if(response.ok) {
    document.location.replace('/dashboard');
} else {
    alert(response.statusText);
}
// console.log(id);
// console.log(appointment_date);
// console.log(appointment_time);
}

document.querySelector('.book-appt-form').addEventListener("submit", appointmentFormHandler);