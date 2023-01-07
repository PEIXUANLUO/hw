// 抓位置
$(function () {
    $("#nowSelect").on("click", loadServerData);
    getlocation();  /*一進來就呼叫函式 */
});

function getlocation() {
    if (navigator.geolocation == undefined) {    /*檢查有沒有navigator及geolocation，大瀏覽器都會有。 */
        alert("Fail to get location");      /*沒有就alert */
        return;     /* 結束 */
    } else {
        navigator.geolocation.getCurrentPosition(result, error, settings);      /*預設結果。getCurrentPosition(succes成功, error失敗, options其他) 。執行function，去抓這些結果*/
    }
}

// 檢查是否能抓到資料
// function result(position) {
//     debugger;
// }

// function error(err) {
//     alert(err);
// }

function result(position) {
    let thisCoords = position.coords;       /*coords，座標 */
    let a = (`${thisCoords.latitude}`);
    let b = (`${thisCoords.longitude}`);
    // debugger;
    // console.log (a);      /*latitude，緯度。longtude，經度 */
    console.log(`location:${thisCoords.latitude},${thisCoords.longitude}`);      /*latitude，緯度。longtude，經度 */
    console.log(`location:${a},${b}`);      /*latitude，緯度。longtude，經度 */
    // window.location.href = `https://maps.google.com.tw?q=${thisCoords.latitude},${thisCoords.longitude}`; /*跳轉頁面href */
    // let cityData = [
    //     { name: "現在位置", lat: 43.4086889, lon: 139.9360746 },
    //     // { name: "現在位置", lat:$a, lon:this.b },
    // ];
}






// 跑天氣
let cityData = [
    { name: "", lat: "", lon: "" },
    { name: "台北", lat: 25.0856513, lon: 121.421409 },
    { name: "台中", lat: 24.1852333, lon: 120.4946381 },
    { name: "高雄", lat: 22.7000444, lon: 120.0508691 },
    { name: "蘭嶼", lat: 22.0440891, lon: 121.5091228 },
    { name: "北海道", lat: 43.4086889, lon: 139.9360746 },
    { name: "現在位置", lat:00, lon:00 },
];

$(function () {
    for (let x = 0; x < cityData.length; x++) {
        $("#citySelect").append(`<option value='${x}'>${cityData[x].name}</option>`);
    }
    // change搭配select
    $("#citySelect").on("change", loadServerData);
});

function loadServerData() {
    // 先清空
    $("#result").empty();

    // if ( ) return;該方法之後的不執行，直接跳出該方法。
    if (this.value == 0) return;

    let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
    // 自己的密碼
    let weatherMapAPIKey = "98131fc2f921a668b35685e68f8362a4";

    // 設定條件
    // :冒號前，api的要求。冒號後，前面輸入的值。
    $.getJSON(weatherAPI_URL, {
        lat: cityData[this.value].lat,
        lon: cityData[this.value].lon,
        appid: weatherMapAPIKey,
        units: 'metric',
        lang: 'zh_tw'
    })
        .done(function (data) {
            $("#result")
                // ${data.main.temp_min}、${data.main.temp_max}api的資料。
                .append(`<p>氣溫: ${data.main.temp_min}~ ${data.main.temp_max}</p>`);
            $("#result")
                // @2x，兩倍。
                .append(`<p><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>${data.weather[0].description}</p>`);
        })
        .fail(function () {
            console.log("Error");
        })
        .always(function () {
            console.log("Always");
        });
}