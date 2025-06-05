fetch('http://localhost:5000/api/products')
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));