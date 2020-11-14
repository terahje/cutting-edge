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
        console.log("success");
        document.location.replace('/');
      }
      else {
        alert(response.statusText);
      }
     }
   }
      

  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);