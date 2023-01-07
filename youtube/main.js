let player;
let currentPlay = 0;
//這邊function名稱不能改 是YT設定好的
function onYouTubeIframeAPIReady() {
    // alert("hi");
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: playList[currentPlay],
        playerVars: { //這邊控制項要參考YT api文件
            autoplay: 0,//是否自動撥放
            controls: 0,//是否顯示控制項
            start: playTime[currentPlay][0],//開始秒數
            end: playTime[currentPlay][1],//結束秒數
            iv_load_policy: 3


        }, events: {
            // when the video player is ready =>onReady
            onReady: onPlayerReady,
            // when the player's state changes => onStateChange 
            onStateChange: onPlayerStateChange
        }
    });

}

function onPlayerReady(event) {
    $('#playButton').on("click", function () {
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

function onPlayerStateChange(event) {
    console.log(event.data);
    // -1 – unstarted
    // 0 – ended
    // 1 – playing
    // 2 – paused
    // 3 – buffering
    // 5 – video cued
    if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) {
        // go to next song
        if (currentPlay < playList.length - 1) {
            currentPlay++;
            player.loadVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        } else {
            // 最後一首
            currentPlay = 0;
            player.cueVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        }
    } if (event.data == 1) {
        $("h2").text(player.getVideoData().title);
    }
}
