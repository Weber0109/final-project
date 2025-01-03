let attractions = [];
let selectedAttractions = [];

async function getDBAttractions(){
    try {
        const response = await fetch("/attractions", { method: 'GET' });
        const data = await response.json(); // 等待解析 JSON
        attractions = data;
        displayAttractions(attractions);
    } catch (err) {
        console.error("error get DB attractions:", err);
    }
}

function fetchAttractions(city){
    fetch('attractions.json')
    .then(response => response.json())
    .then(data => {
        console.log("here: ",data);
        attractions = data[city] ||[];
        //save attractions
        postAttractions();
        displayAttractions(attractions);
    })
    .catch(error => console.error('Error fetching attractions:', error));
}
function displayAttractions(attractions){
    console.log("attractions", attractions);
    const attractionsLDiv = document.getElementById('attractionsDiv');
    attractionsLDiv.innerHTML = ''; // 清空舊資料

    // 建立表格結構
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th class="name">名稱</th>
                <th class="description">描述</th>
                <th>導航</th>
                <th>收藏</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    // 將表格加入到 #attractionsList 這個 div 中
    if(city != undefined){
        document.getElementById("city").innerHTML = city+" ";
    }
    attractionsLDiv.appendChild(table);
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
            <td class="name">${attraction.Name}</td>
            <td class="description"><p class="scrollbar">${attraction.Description}</p></td>
            <td>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${attraction.Py},${attraction.Px}" target="_blank"><img src="./images/google-maps.png"></a>
            </td>
            <td>
                <div class="addAttraction"><img src="./images/heart.png"></div>   
            </td>
        `;

        row.querySelector('.addAttraction').addEventListener('click', () => {
            selectedAttractions.push(attraction);
            row.remove(); // 從表格中移除該列
            // save selectedAttractions
            postSelectedAttractions();
            displayAttractions(attractions);
            displaySelectedAttractions(selectedAttractions);
        });
        tbody.appendChild(row);
    });
    
}

//拿到後端資料，並顯示
async function fetchSelectedAttractions() {
    try {
        const response = await fetch("/selectedAttractions", { method: 'GET' });
        const data = await response.json(); // 等待解析 JSON
        selectedAttractions = data;
        displayAttractions(attractions);
        displaySelectedAttractions(selectedAttractions);
    } catch (err) {
        console.error("error fetch selected attractions:", err);
    }
}
function getSelectedAttractions(){
    return selectedAttractions;
}
function deleteSelectedAttractions(index){
    selectedAttractions.splice(index, 1); // 刪除景點
}
function displaySelectedAttractions(selectedAttractions) {
    console.log("selectedAttractions",selectedAttractions);
    const selectedAttractionsDiv = document.getElementById('selectedAttractionsDiv');
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th class="name">名稱</th>
                <th class="description">描述</th>
                <th>導航</th>
                <th>刪除</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
    // 使用全域變數 selectedAttractions
    selectedAttractions.forEach((attraction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="name">${attraction.Name}<br>(${attraction.Region})</td>
            <td class="description"><p class="scrollbar">${attraction.Description}</p></td>
            <td>
                <a href="https://www.google.com/maps/search/?q=${attraction.Py},${attraction.Px}" target="_blank"><img src="./images/google-maps.png"></a>
            </td>
            <td>
                <div class="deleteAttraction" data-index="${index}"><img src="./images/delete.png"></div>
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
            deleteSelectedAttractions(index);
            // save selectedAttractions
            postSelectedAttractions();
            displayAttractions(attractions);
            displaySelectedAttractions(getSelectedAttractions()); // 更新顯示
        });
    });
}
function postSelectedAttractions(){
    $.ajax({
        url: '/selectedAttractions/update-selected-attractions',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(selectedAttractions), 
        success: function(response) {
            if (response.success) {
                //alert('資料儲存成功！');
            } else {
                //alert('資料儲存失敗，請稍後再試！');
            }
        },
        error: function(xhr, status, error) {
            console.log('錯誤:', error);
            alert('發送請求時發生錯誤');
        }
    });
}

function postAttractions(){
    $.ajax({
        url: '/attractions/update-attractions',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(attractions), 
        success: function(response) {
            if (response.success) {
                //alert('資料儲存成功！');
            } else {
                //alert('資料儲存失敗，請稍後再試！');
            }
        },
        error: function(xhr, status, error) {
            console.log('錯誤:', error);
            alert('發送請求時發生錯誤');
        }
    });
}
