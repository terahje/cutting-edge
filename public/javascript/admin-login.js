async function loginFormHandler(event) {
    event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if(email && password) {
    const response = await fetch('/api/stylists/login', {
        method: 'post',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {'Content-Type': 'application/json'}
    });
      if(response.ok){
        Swal.fire({
            title: "You are logged in!.",
            confirmButtonText: "OK",
            confirmButtonColor: "#5c946e", 
        }).then(function() {
            location.href ='/admin';
        })
      } else {
         alert(response.statusText); 
      }
  }
}
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);