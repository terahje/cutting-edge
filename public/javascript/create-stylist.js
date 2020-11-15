async function createFormHandler(event) {
    event.preventDefault();

    const first_name = document.querySelector("#firstname-create").value.trim();
    const last_name = document.querySelector("#lastname-create").value.trim();
    const salon_name = document.querySelector("#salon-create").value.trim();
    const username = document.querySelector("#username-create").value.trim();
    const email = document.querySelector("#email-create").value.trim();
    const password = document.querySelector("#password-create").value.trim();

    if(email && password) {
        const response = await fetch('/api/stylists', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
                salon_name,
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok){
            Swal.fire({
                title: "Thank you for signing up. You are logged in!",
                confirmButtonText: "OK",
                confirmButtonColor: "#5c946e", 
            }).then(function() {
                location.href ='/admin';
              })
          } else {
            Swal.fire({
                title: "Something went wrong! Please try again.",
                confirmButtonText: "OK",
                confirmButtonColor: "#1c0425", 
            });
          } 
        
    }

}
document.querySelector('.create-form').addEventListener('submit', createFormHandler);