// 需求影片格式
const legalVideoFormats = [
    "mp4", "flv", "avi", "mov", "mkv", "mpeg", "3gp", "wmv", "swf"];
window.URL = window.URL || window.webkitURL;                                    /* ||or，兩種網址都接受 */

// 檔案輸入時，觸發事件
$(function () {
    $("#inputFile").on("change", function (e) {                                  /*inputFile有動作時，執行函式{ } */
        $("table").empty();                                                     /*empty、append，清空再填回去。每次進來都先清空，再載入 */
        $("table").append("<tr><th>檢核項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
        processFile(e.target.files);                                            /*某個內容，之後設定。e.target.files，上面e的資料路徑。 */
    });
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);

    function dragenter() {                                  /*進去之後 */
        $("#dropbox").css("background-color", "pink");       /*改背景色 */
    }

    function dragleave() {                                                              /*離開之後 */
        $("#dropbox").css("background-color", "rgb(146, 146, 200)");                    /*改回原色 */
    }

    function dragover(e) {                                   /*dragover，拖曳的過程。e，event */
        e.preventDefault();                                  /*禁止瀏覽器的預設功能 */
    }

    function drop(e) {                                       /*丟進去 */
        e.preventDefault();                                 /*禁止瀏覽器的預設功能 */
        let files = e.originalEvent.dataTransfer.files;     /*資料e.originalEvent.dataTransfer.files，用consloe可以確認 */
        if (files.length == 0) {                             /*如果沒有文件進來，0個 */
            return false;                                   /*失敗並結束 */
        }
        
        $("table").empty();                                                     /*empty、append，清空再填回去。每次進來都先清空，再載入 */
        $("table").append("<tr><th>檢核項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
        processFile(files);                                 /*對應的位置是e.originalEvent.dataTransfer.files。 */
        dragleave();
    }

});

// 檢查檔案格式是否為video並且是指定影片格式之一

function processFile(files) {                                                   /*瀏覽器抓到的影片(上傳的那個) */

    // 第1件事，抓到資料後，表格列出來，內容有名字、長度、格式。files可以抓到type類型，先處理。
    let thisVideo = files[0];                                                   /*處理第一個影片 */
    $("table").append($(`<tr><td colspan="4">影片名稱: ${thisVideo.name}</td></tr>`).css("background-color", "yellow"));
    /* <td colspan="4">占整行，影片名稱: ${thisVideo.name}，抓上傳的名稱。.css抓前面的東西，設定css*/
    $("table").append($(`<tr><td>影片長度</td><td>需介於60~90秒</td><td id="thisDuration"></td><td id="thisDurationResult"></td></tr>`));
    $("table").append($(`<tr><td>影片格式</td><td>MP4、FLV、AVI、MOV、MKV、MPEG、3GP、WMV、SWF</td><td id="thisFormat">${thisVideo.type}</td><td id="thisFormatResult"></td></tr>`));
    $("table").append($(`<tr><td>解析度</td><td>720p(1280*720)以上</td><td id="thisResolution"></td><td id="thisResolutionResult"></td></tr>`));

    // 第2件事，先處理影片類型。將影片檔案，分段處理。
    var thisFileType = thisVideo.type.split("/");                               /* split，分段，切成陣列(video、mp4) */
    if (thisFileType[0] == "video") {                                           /* thisFileType，第一個段。確認是不是video。是影片，繼續確認。不是影片，else處理掉*/
        if (legalVideoFormats.indexOf(thisFileType[1]) != -1) {                 /* 假設，legalVideoFormats上面的陣列。跟(thisFileType[1])，切割後的第二項影片類型。用indexof確認。indexof的-1，等於沒有。 != -1，負負得正，代表有，跟上面legalVideoFormats有相同。*/
            $("#thisFormatResult").text("O").css("color", "green");;            /* 是mp4，改內容 */
        } else {
            $("#thisFormatResult").text("X").css("color", "red");               /* 不是mp4，改內容 */
        }
    } else {                                                                    /* 不是video */
        $("#thisFormatResult").text("非影片格式").css("color", "red");
    }


    // 第3件事。files抓不到影片長度、解析度等資料。要引入後再做處理。
    let videoElement = document.createElement('video');     /*.createElement()，依指定的標籤名稱（tagName）建立HTML元素。先設一個假標籤。 */
    videoElement.preload = 'metadata';                      /*preload = 'metadata'。preload，必要資料，直接下載。metadata，要的資訊 */
    videoElement.src = URL.createObjectURL(thisVideo);
    // videoElement.src = URL.createObjectURL(thisVideo);                  /*對到let videoElement，資料來源為URL.createObjectURL()。*/
    /* URL.createObjectURL()，用於建立一個帶有 URL 的 DOMString 以代表參數中所傳入的物件. 該 URL 的生命週期與創造它的 window 中的 document一致. 這個新的物件 URL 代表了所指定的物件*/
    // 因為影片來源不一定。所以透過URL網路裏的方法，createObjectURL，去抓第50行中的thisVideo的路徑。給第71行的videoElement。

    videoElement.onloadedmetadata = function () {           /*onloadedmetadata，影片載完之後觸發，去做要做的事 */
        thisVideo.duration = videoElement.duration;         /*抓時間 */
        thisVideo.videoWidth = videoElement.videoWidth;     /*抓寬度 */
        thisVideo.videoHeight = videoElement.videoHeight;   /*抓高度 */
        $("#thisDuration").text(thisVideo.duration);        /*設另外的變數，把時間用文字顯示出來 */
        $("#thisResolution").text(thisVideo.videoWidth + "*" + thisVideo.videoHeight);  /*設另外的變數，把解析度用文字顯示出來。 * ，幾乘幾 */
        if (thisVideo.duration >= 60 && thisVideo.duration < 150) {          /*長度判斷式 */
            $("#thisDurationResult").text("O").css("color", "green");       /*符合標準，結果 */
        } else {                                                            /*不符合標準 */
            $("#thisDurationResult").text("X").css("color", "red");         /*結果顯示 */
        }
        if (thisVideo.videoWidth >= 1280 && thisVideo.videoHeight >= 720) { /*解析度判斷式 */
            $("#thisResolutionResult").text("O").css("color", "green");
        } else {
            $("#thisResolutionResult").text("X").css("color", "red");
        }
    }

    
}


