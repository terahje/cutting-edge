async function deleteFormHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const response = await fetch(`/api/service/${id}`, {
        
        method: 'DELETE'
    });
    console.log(response);

    if(response.ok) {
        document.location.replace('/admin');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-service').addEventListener('click', deleteFormHandler);