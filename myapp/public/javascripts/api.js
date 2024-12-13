
$(document).ready(function () {
    console.log("loading successfully");
    // get selectedAttractions
    $.get('selectedAttractions', (res) => {
        console.log("res",res);
        selectedAttractions = res;
        console.log("selectedAttractions",selectedAttractions);
        displaySelect();
    },'json');
});
$('#save').click(function() {
    console.log("click");
    // 發送 POST 請求到後端，並將資料傳遞過去
    $.ajax({
        url: '/selectedAttractions/update-attractions',  // API 路徑
        type: 'POST',  // HTTP 方法
        contentType: 'application/json',  // 設置 Content-Type
        data: JSON.stringify(selectedAttractions),  // 將資料轉換為 JSON 字串
        success: function(response) {
            if (response.success) {
                alert('資料儲存成功！');
            } else {
                alert('資料儲存失敗，請稍後再試！');
            }
        },
        error: function(xhr, status, error) {
            console.log('錯誤:', error);
            alert('發送請求時發生錯誤');
        }
    });
});