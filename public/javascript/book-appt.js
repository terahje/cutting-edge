async function appointmentFormHandler(event) {
    event.preventDefault();
  
const appointment_date = document.querySelector('input[name="date-book"]').value;
const appointment_date_end = document.querySelector('input[name="date-book-end"]').value;
const appointment_time = document.querySelector('input[name="time-book"]').value;
const appointment_time_end = document.querySelector('input[name="time-book-end').value; 
const customer = document.querySelector('input[name="customer_id').value; 
let customer_id = Number(customer);
// const customer_id = Number(customer);
console.log(customer_id);
console.log(typeof customer_id);
// console.log(customer_id);
const service_id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
];

const response = await fetch(`/api/appointment/` , {
    method: 'POST',
    body: JSON.stringify ({
        appointment_date,
        appointment_date_end,
        appointment_time,
        appointment_time_end,
        customer_id,
        service_id
    }), 
    headers: {
        'Content-Type': 'application/json'
    }
});

if(response.ok) { 
    document.location.replace('/dashboard/'+customer_id);
} else {
    alert(response.statusText);
}

}

document.querySelector('.book-appt-form').addEventListener("submit", appointmentFormHandler);
