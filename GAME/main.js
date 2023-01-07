let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
// mapArray : map element data
// ctx : HTML5 Canvas
// currentImgMain : x, y location
// imgXXX : image object
const gridLength = 200;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}


//Game initial
$(function () {
    // 0 - Empty, 1 - Obstacle, 2 - Final Stop, 3 - Enemy
    mapArray = [
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];

    ctx = $("#myCanvas")[0].getContext("2d");

    //把主角擺上畫面
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    var sources = {
        mountain: 'images/material.png',
        enemy: 'images/Enemy.png'
    };

    loadImages(sources, function (images) {
        for (var x in mapArray) {               /*三個x，三個[]*/
            for (var y in mapArray[x]) {          /*y，[0, 1, 1],[0, 0, 0]，裡面的內容 */
                if (mapArray[x][y] == 1) {          /*陣列內容 == 1 ，就載竹子圖片進去 */
                    ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });

    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";

    // imgMountain.onload = function(){
    //   imgEnemy.onload = function(){
    //       for(var x in mapArray){
    //           for(var y in mapArray[x]){
    //               if(mapArray[x][y] == 1){
    //                   ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength, x*gridLength, gridLength, gridLength);
    //               }else if(mapArray[x][y] == 3){
    //                   ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
    //               }
    //           }
    //       }
    //   };
    // };

});

// User Event
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX-決定主角臉朝向哪個方向
    targetImg = { //主角的目標座標(初始值)(事件出發才會執行，但觸發之後，值就改變了)
        "x": -1,
        "y": -1
    };
    targetBlock = {
        //主角的目標(對應2維陣列)
        "x": -1,
        "y": -1
    }

    event.preventDefault();
    //避免鍵盤預設行為發生，如網頁捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標

    console.log(event.code);

    switch (event.code) {     /* 0, 200, 400去算 */
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//臉朝下
            break;
        default://其他按鍵不處理
            return;/* 終止事件 */

    }

    //確認目標位置不會超過地圖
    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {     /* 400座標大小 */
        targetBlock.x = targetImg.y / gridLength;   /*圖片區塊位置x = 圖片畫布位置y / 每格大小200 */
        targetBlock.y = targetImg.x / gridLength;   /*圖片區塊位置y = 圖片畫布位置x / 每格大小200 */
    } else {
        targetBlock.x = -1;   /*-1為不存在的地方，就沒辦法動作。*/
        targetBlock.y = -1;
    }
    //清空主角原本所在的位置，消失了
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){ /* !=不等於 &&且  */
        //Check Map data
        switch(mapArray[targetBlock.x][targetBlock.y]){     /* 找圖片區塊位置 */
          case 0: // can go     /* 0能走的路 */
            $("#talkBox").text(""); /* 對話框內容 */
            currentImgMain.x = targetImg.x; /*  */
            currentImgMain.y = targetImg.y;
            break;
          case 1: // Mountain
            $("#talkBox").text("有山");
            break;
          case 2: // can go - Final Stop
            $("#talkBox").text("終點");
            currentImgMain.x = targetImg.x;
            currentImgMain.y = targetImg.y;
            break;
          case 3: // Enemy
            $("#talkBox").text("哈摟");
            break;
        }
      }else{
        $("#talkBox").text("邊界");
      }
    
      ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    
    });
    



