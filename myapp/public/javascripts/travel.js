const form = document.getElementById("travelForm");
let selectedAttractions = [];
form.addEventListener("submit", (event) => {
    event.preventDefault(); // 防止表單默認提交

    const city = document.getElementById("citySelector").value;
    const personCount = document.getElementById("personCount").value;
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    //限制時間
    //TODOs

    displayAttractions(city);
    
    // booking連結
    let city2 = city;
    city2 = city2.replace(/臺/g, "台").slice(0, -1);
    let booking_city = document.getElementById("booking_city");
    booking_city.setAttribute("href", `https://www.booking.com/searchresults.zh-tw.html?ss=${city2}&lang=zh-tw&checkin=${startDate.value}&checkout=${endDate.value}group_adults=${personCount}&no_rooms=1&group_children=0`);
});
function displayAttractions(city){
    fetch('attractions.json')
    .then(response => response.json())
    .then(data => {
        const attractions = data[city] || [];
        const attractionsList = document.getElementById('attractionsList');
        attractionsList.innerHTML = ''; // 清空舊資料

        // 建立表格結構
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>描述</th>
                    <th>導航</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        // 將表格加入到 #attractionsList 這個 div 中
        attractionsList.appendChild(table);
        const tbody = table.querySelector('tbody');

        // 將每個景點加入表格
        attractions.forEach(attraction => {
             // 檢查景點是否已經在 selectedAttractions 中
            const isAlreadySelected = selectedAttractions.some(selectedAttraction => selectedAttraction.Name === attraction.Name);

            if (isAlreadySelected) {
                return; // 如果已經選過，跳過這個景點
            }
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${attraction.Name}</td>
                <td><p>${attraction.Description}</p></td>
                <td>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${attraction.Py},${attraction.Px}" target="_blank">map</a>
                </td>
                <td>
                    <button class="addAttraction">新增</button>
                </td>
            `;

            row.querySelector('.addAttraction').addEventListener('click', () => {
                selectedAttractions.push(attraction);
                console.log(selectedAttractions);
                row.remove(); // 從表格中移除該列
                displayAttractions(city);//bug
                displaySelect();
            });
            tbody.appendChild(row);
        });


    })
    .catch(error => console.error('Error fetching attractions:', error));
}
function displaySelect() {
    const selectedAttractionsDiv = document.getElementById('selectedAttractions');
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>名稱</th>
                <th>描述</th>
                <th>導航</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
    console.log("前端",selectedAttractions);
    // 遍歷 selectedList 陣列並添加每個景點的行
    selectedAttractions.forEach((attraction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${attraction.Name}</td>
            <td><p>${attraction.Description}</p></td>
            <td>
                <a href="https://www.google.com/maps/search/?q=${attraction.Py},${attraction.Px}" target="_blank">map</a>
            </td>
            <td>
                <button class="deleteAttraction" data-index="${index}">刪除</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // 清空已顯示的內容並插入新的表格
    selectedAttractionsDiv.innerHTML = ''; // 清空目前的景點
    selectedAttractionsDiv.appendChild(table); // 顯示更新後的表格

    // 綁定刪除按鈕的事件
    const deleteButtons = selectedAttractionsDiv.querySelectorAll('.deleteAttraction');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index'); // 取得要刪除的景點索引
            selectedAttractions.splice(index, 1); // 刪除景點
            displaySelect(); // 更新顯示
        });
    });
}