async function logout() {
    console.log("You got this far in the logout.js script");
    const response = await fetch('/api/customer/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert("You cannot log out from Hotel California!", response.statusText);
    }
  }
  
document.querySelector('#logout').addEventListener('click', logout);