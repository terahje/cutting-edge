async function editFormHandler(event) {
    event.preventDefault();
    
    const style = document.querySelector('input[name="style-edit"]').value;
    const time_alloted = document.querySelector('input[name="time-edit"]').value;
    const description = document.querySelector('textarea[name="description-edit"]').value.trim();
    const price = document.querySelector('input[name="price-edit"]').value;
    const category = document.querySelector('select[name="category-edit"').value;
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const response = await fetch(`/api/service/${id}`, {
        method: 'PUT', 
        body: JSON.stringify({
            style,
            time_alloted,
            description,
            price,
            category
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
     
    
      if (response.ok) {
        document.location.replace('/admin');
      } else {
        alert(response.statusText);
      } 
}
document.querySelector('.edit-service-form').addEventListener('submit', editFormHandler);