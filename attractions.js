document.getElementById('loadAttractions').addEventListener('click', () => {
    const city = document.getElementById('citySelector').value;
    fetch('attractions.json')
        .then(response => response.json())
        .then(data => {
            const attractions = data[city] || [];
            const list = document.getElementById('attractionsList');
            list.innerHTML = ''; // 清空舊資料
            attractions.forEach(attraction => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h2>${attraction.Name}</h2>
                    <p>${attraction.Description}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${attraction.Py},${attraction.Px}" target="_blank">導航到這裡</a>
                `;
                list.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching attractions:', error));
});
