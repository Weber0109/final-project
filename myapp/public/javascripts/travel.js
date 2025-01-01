const form = document.getElementById("travelForm");

$(document).ready(function () {
    console.log("loading successfully");
    //get database travelInfo and set booking
    getDBTravelInfo();
    //display database selectedAttractions ，一定要先載入selectedAttractions，不然selectedAttractions，不然getDBAttractions()會顯示錯
    fetchSelectedAttractions();
    //get database attractions and display attractions
    getDBAttractions();
    // get essentialItems
    fetchEssentialItems();
});
$('form').submit((event) => {
    event.preventDefault(); // 防止表單默認提交
    city = document.getElementById("citySelector").value;
    personCount = document.getElementById("personCount").value;
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;
    //save travelInfo
    postTravelInfo();
    //限制時間
    //TODOs
    fetchAttractions(city);
    // booking連結
    setBooking();
});
function setBooking(){
    let city2 = city;
    city2 = city2.replace(/臺/g, "台").slice(0, -1);
    let booking_city = document.getElementById("booking_city");
    booking_city.setAttribute("href", `https://www.booking.com/searchresults.zh-tw.html?ss=${city2}&lang=zh-tw&checkin=${startDate}&checkout=${endDate}&group_adults=${personCount}&no_rooms=1&group_children=0`);
}