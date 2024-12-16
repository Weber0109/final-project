let essentialItems = [];

function fetchEssentialItems() {
    fetch("/essentialItems", { method: 'GET' })
        .then(res => res.json())  // 解析回應為 JSON
        .then(data => {
            // 檢查資料是否存在，若不存在則載入本地的 essentialItems.json
            if (data.length === 0) {
                fetch('essentialItems.json')
                    .then(response => response.json())
                    .then(jsonData => {
                        console.log("No essentialItems in DB, load 'essentialItems.json': ", essentialItems);
                        essentialItems = jsonData;
                        displayEssentialItems(essentialItems);
                    })
                    .catch(error => console.error("載入 JSON 資料失敗:", error));
            } else {
                essentialItems = data;  // 如果有資料，直接使用從伺服器獲得的資料
                console.log("essentialItems: ", essentialItems);
                displayEssentialItems(essentialItems);
            }
        })
        .catch(error => {
            console.error("無法從伺服器獲取資料：", error);
        });
}
function displayEssentialItems(items) {
    const essentialItemsDiv = document.getElementById('essentialItemsDiv');
    essentialItemsDiv.innerHTML = ''; // 清空目前顯示的內容

    items.forEach(item => {
        // 建立 checkbox 和 label
        const checkboxContainer = document.createElement('div');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.Name; // 用名稱作為 id
        checkbox.checked = item.IsBring; // 根據 IsBring 決定是否勾選
        
        const label = document.createElement('label');
        label.setAttribute('for', item.Name);
        label.textContent = item.Name; // 顯示項目名稱
        
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);

        essentialItemsDiv.appendChild(checkboxContainer);

        // 綁定 checkbox 變更事件
        checkbox.addEventListener('change', () => {
            item.IsBring = checkbox.checked; // 更新 IsBring 的值
            console.log(`${item.Name} 的 IsBring 更新為: ${item.IsBring}`);
        });
    });
}
function postEssentialItems(){
    console.log("essentialItems", essentialItems);
    $.ajax({
        url: '/essentialItems/update-essentialItems',
        type: 'POST',  // HTTP 方法
        contentType: 'application/json',
        data: JSON.stringify(essentialItems),
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