$(function () {
    $("#myVideo").attr("src", "./classic-care-bears-care-a-lots-birthday-part-1.mp4");                       //id"#myVideo"，引用檔案sample-mp4-file.mp4
    $("#playBtn").on("click", function () {                                 //播放鈕，被點擊後，執行函式
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(1));
        $("#progressBar")[0].max = $("#myVideo")[0].duration
        if ($("#myVideo")[0].paused) {                                      //兩種狀況，第一影片暫停的話
            $("#myVideo")[0].play();                                        //影片播放
            $("#playBtn").text("Pause");                                    //按鈕改名"暫停"
        } else {                                                            //第二種狀況，影片撥放中
            $("#myVideo")[0].pause();                                       //影片暫停
            $("#playBtn").text("Play");                                     //按鈕改名"撥放"
        }
    });
    $("#fullBtn").on("click", function () {                                 //id"fullBtn"點擊之後
        $("#myVideo")[0].webkitEnterFullscreen();                           //影片要全螢幕
    });

    $("#lowerVolumeBtn").on("click", downVolume);                           //變數綁定on要發生的事件，click被點擊，執行function，downVolume。
    $("#higherVolumeBtn").on("click", upVolume);
    $("#myVideo").on("timeupdate", updateProgress);
    $("#progressBar").on("change", changeProgress);

}); 


function downVolume() {                                                                     // downVolume這個function
    var myVideo = $("#myVideo")[0];                                                         //jquery簡短後的變數$("#myVideo")[0]，再縮更短。變var myVideo
    if (myVideo.volume == 0) {                                                              //if、else、else if，判斷式。if因樣等於0，沒事。                                 
    } else if (myVideo.volume < 0.1) {                                                      //如果小於0.1，直接等於0
        myVideo.volume = 0;                                                                 
    } else {                        
        myVideo.volume = myVideo.volume - 0.1;                                              //不等於0，也不小於0.1。音量執行-0.1
    } volumeDisplay.innerHTML = myVideo.volume.toFixed(1);                                  //值回傳給HTML。
}

function upVolume() {
    var myVideo = $("#myVideo")[0];
    if (myVideo.volume == 1) {
    } else if (myVideo.volume > 0.9) {
        myVideo.volume = 1;
    } else {
        myVideo.volume = myVideo.volume + 0.1;
    } volumeDisplay.innerHTML = myVideo.volume.toFixed(1);
}

function updateProgress(){                                                                  //更新時間的部分
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));                       //改文字，抓現在的時間
    // $("#timeDisplay").append(`/${Math.floor($("#myVideo")[0].duration)}秒`);             
    $("#timeDisplay").append("/"+Math.floor($("#myVideo")[0].duration)+"秒");               //改文字，秒數後面增加新的。(/總共幾秒)
    $("#progressBar")[0].value =$("#myVideo")[0].currentTime;                               //$("#progressBar")改時間後，也要更改。
}

function changeProgress(){                                                                  //改進度條
    $("#myVideo")[0].pause();                                                               //先暫停(才不會跟TIMEUPDATE打架)
    $("#myVideo")[0].currentTime=$("#progressBar")[0].value;                                //$("#progressBar")的值，回傳給影片現在的時間。
    $("#myVideo")[0].play();                                                                //繼續撥放(才不會跟TIMEUPDATE打架)
}
