  const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const emailEl = document.querySelector("#email-login");
    const passwordEl = document.querySelector("#password-login");
    fetch("/api/custon/login", {
      method: "post",
      body: JSON.stringify({
        email: emailEl.value,
        password: passwordEl.value
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
        document.location.replace("/dashboard");
      })
      .catch(err => console.log(err));
  };
  
  document.querySelector("#login-form").addEventListener("submit", loginFormHandler);
  