async function logout() {
    console.log("You got this far in the logout.js script");
    const response = await fetch('/api/customer/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      Swal.fire({
        title: "Thank you for visiting the Cutting Edge. You are logged out!.",
        confirmButtonText: "OK",
        confirmButtonColor: "#5c946e", 
    }).then(function() {
        location.href ='/login';
      })
    } else {
      Swal.fire({
        title: "Something went wrong! Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1c0425", 
    });
    }
  }
  
document.querySelector('#logout').addEventListener('click', logout);