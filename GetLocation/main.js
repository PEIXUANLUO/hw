$(function () {
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
    // debugger;
    console.log(`location:${thisCoords.latitude},${thisCoords.longitude}`);      /*latitude，緯度。longtude，經度 */
    window.location.href = `https://maps.google.com.tw?q=${thisCoords.latitude},${thisCoords.longitude}`; /*跳轉頁面href */
}

function error(err) {
    alert(err);
}

let settings = {                            /*設定特殊選項，系統有的裡面選 */
    enableHighAccuracy: true               /*enableHighAccuracy，非常精確的位置:true */
};


