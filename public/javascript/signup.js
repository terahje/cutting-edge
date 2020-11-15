const signupFormHandler = async function(event) {
    event.preventDefault();

    const first_name = document.querySelector('#firstname-signup').value.trim();
    const last_name = document.querySelector('#lastname-signup').value.trim();
    const phone = document.querySelector('#phone-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (first_name && last_name && phone && username && email && password) {
      const response = await fetch('/api/customer', {
        method: 'post',
        body: JSON.stringify({
          first_name,
          last_name,
          phone,
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if(response.ok) {
        Swal.fire({
          title: "Thank you for signing up. You are logged in!.",
          confirmButtonText: "OK",
          confirmButtonColor: "#5c946e", 
      }).then(function() {
          location.href ='/';
        })
      }
      else {
        Swal.fire({
          title: "Something went wrong! Please try again.",
          confirmButtonText: "OK",
          confirmButtonColor: "#1c0425", 
      });
      }
     }
   }
      

  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);