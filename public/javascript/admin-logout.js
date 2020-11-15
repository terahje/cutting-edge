async function logout() {
    const response = await fetch('/api/stylists/logout' , {
        method: 'post',
        headers: { 'Content-Type': 'application/json'}
    });
    if(response.ok) {
        Swal.fire({
            title: "You are logging out!.",
            confirmButtonText: "OK",
            confirmButtonColor: "#5c946e", 
        }).then(function() {
            location.href ='/admin/login';
        })
    } else {
        Swal.fire({
            title: "Something went wrong! Please try again.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1c0425", 
        });
    }
}
document.querySelector('#logout-stylist').addEventListener('click', logout);