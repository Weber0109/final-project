const form = document.getElementById("travelForm");

$(document).ready(function () {
    console.log("loading successfully");
    //display selectedAttractions at database
    displayAttractions(attractions);
    fetchSelectedAttractions();
    // get essentialItems
    fetchEssentialItems();
});
$('form').submit((event) => {
    event.preventDefault(); // 防止表單默認提交
    const city = document.getElementById("citySelector").value;
    const personCount = document.getElementById("personCount").value;
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    //限制時間
    //TODOs
    fetchAttractions(city);
    // booking連結
    let city2 = city;
    city2 = city2.replace(/臺/g, "台").slice(0, -1);
    let booking_city = document.getElementById("booking_city");
    booking_city.setAttribute("href", `https://www.booking.com/searchresults.zh-tw.html?ss=${city2}&lang=zh-tw&checkin=${startDate.value}&checkout=${endDate.value}group_adults=${personCount}&no_rooms=1&group_children=0`);
});
$('#save').click(function() {
    console.log("click");
    // save selectedAttractions
    postSelectedAttractions();
    // save essentialItems
    postEssentialItems();
    window.alert("儲存成功");
});
