async function serviceFormHandler(event) {
    event.preventDefault();
  
  const style = document.querySelector('input[name="style-new"]').value;
  const time_alloted = document.querySelector('input[name="time-new"]').value;
  const description = document.querySelector('textarea[name="description-new"]').value.trim();
  const price = document.querySelector('input[name="price-new"]').value;
  const category = document.querySelector('select[name="category-new"').value;
  
    const response = await fetch('/api/service', {
        method: 'POST',
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
    if(response.ok) {
        document.location.replace('/admin');
    } else {
        alert(response.statusText);
    }
    
  }
  
  document.querySelector('.new-service-form').addEventListener('submit', serviceFormHandler);
  