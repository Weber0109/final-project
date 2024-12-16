let city;
let personCount;
let startDate;
let endDate;

async function getDBTravelInfo(){
    try {
        const response = await fetch("/travelInfo", { method: 'GET' });
        const data = await response.json(); // 等待解析 JSON
        console.log("travelInfo: ", data);
        if(data.length != 0){
            city = data[0].city;
            personCount = data[0].personCount;
            startDate = data[0].startDate;
            endDate = data[0].endDate;
            document.getElementById("citySelector").value = `${city}`;//下面這種寫法不會work
            document.getElementById("personCount").setAttribute("value",`${personCount}`);
            document.getElementById("startDate").setAttribute("value",`${startDate}`);
            document.getElementById("endDate").setAttribute("value",`${endDate}`);
        }
    } catch (err) {
        console.error("error get DB travel DB:", err);
    }
}

function postTravelInfo(){
    $.ajax({
        url: '/travelInfo/update-travelInfo',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ city:city, personCount:personCount, startDate:startDate, endDate:endDate}), 
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