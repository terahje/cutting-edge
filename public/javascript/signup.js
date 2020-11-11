const signupFormHandler = async function(event) {
    event.preventDefault();

    const firstnameEl = document.querySelector('#firstname-signup').value.trim();
    const lastnameEl = document.querySelector('#lastname-signup').value.trim();
    const phoneEl = document.querySelector('#phone-signup').value.trim();
    const usernameEl = document.querySelector('#username-signup').value.trim();
    const emailEl = document.querySelector('#email-signup').value.trim();
    const passwordEl = document.querySelector('#password-signup').value.trim();
  
    if (firstname && lastname && phone && username && email && password) {
      const response = await fetch('/api/customer', {
        method: 'post',
        body: JSON.stringify({
          firstname: firstnameEl.value,
          lastname: lastnameEl.value,
          phone: phoneEl.value,
          username: usernameEl.value,
          email: emailEl.value,
          password: passwordEl.value
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function() {
        document.location.replace("/dashboard");
      })
      .catch(err => console.log(err));
  };
};

  document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);