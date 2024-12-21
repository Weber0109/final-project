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
                        console.log("No essentialItems in DB, load 'essentialItems.json': ", jsonData);
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
    const essentials = document.getElementById("essentials");
    const personal = document.getElementById("personal");
    const electronics = document.getElementById("electronics");
    const medications = document.getElementById("medications");
    const others = document.getElementById("others");
    
    essentials.innerHTML = "";
    personal.innerHTML = "";
    electronics.innerHTML = "";
    medications.innerHTML = "";
    others.innerHTML = "";
    items.forEach(item => {
        // 建立 checkbox 和 label
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.Name; // 用名稱作為 id
        checkbox.checked = item.IsBring; // 根據 IsBring 決定是否勾選
        const label = document.createElement('label');
        const span = document.createElement('span');
        span.setAttribute('class', 'checkmark');
        label.setAttribute('class','container');
        label.textContent = item.Name; // 顯示項目名稱
        label.appendChild(checkbox);
        label.appendChild(span);
        switch(item.Category){
            case "essentials":
                essentials.appendChild(label);
                break;
            case "personal":
                personal.appendChild(label);
                break;
            case "electronics": 
                electronics.appendChild(label);
                break;
            case "medications": 
                medications.appendChild(label);
                break; 
            default:
                others.appendChild(label);
                break;
        }

        // 綁定 checkbox 變更事件
        checkbox.addEventListener('change', () => {
            item.IsBring = checkbox.checked; // 更新 IsBring 的值
            // save essentialItems
            postEssentialItems();
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