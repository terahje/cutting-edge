  async function loginFormHandler(event) {
    event.preventDefault();
  
    let handleError = function(err){
      console.warn(err);
      return new Response(JSON.stringify({
        code:400,
        message: 'network error to be fixed!'
      }));
    };

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    
    if( email && password) {
      const response = await fetch("/api/customer/login", {
        method: "post",
        body: JSON.stringify({
          email,
          password
        }),
        headers: { "Content-Type": "application/json" }
      }).catch(handleError);
      
       if(response.ok) {
         console.log(email);
         document.location.replace('/');
       } else {
         console.log("You are not logged in!");
         alert(response.statusText);
       }
      }
    }
    
  
  document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
  