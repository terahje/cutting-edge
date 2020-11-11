async function appointmentFormHandler(event) {
    event.preventDefault();
    alert("a button was clicked");
}

document.querySelector('.book-appt-form').addEventListener("submit", appointmentFormHandler);