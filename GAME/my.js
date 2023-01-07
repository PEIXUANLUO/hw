let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
//設定所有變數
//mapArray-決定地圖中每個格子的元素
//ctx-HTML5Canvas用
//currentImgMainX,currentImgMainY-決定主角所在座標
//imgMountain,imgMain,imgEnemy-障礙物,主角,敵人的圖片物件

const gridLength = 200;  //const確定不會變，每格大小都200*200

//1. 網頁載入完成後初始化動作
$(function () {
    mapArray = [    //0-可走,1-障礙,2-終點,3-敵人
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    //主角擺上畫面
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {                                            //擺的位置
        "x": 0,
        "y": 0
    };

    imgMain.onload = function () {                                                                                    //image跑完了，再load canvas出來。
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);            //ctx.drawImag，放圖片。(圖片要剪裁的x、y點(0, 0)，剪裁的寬跟高(80, 130)，顯示的寬、高。放的位置x、y，指定成gridLength大小)
    };

    imgMountain = newImage();
    imgMountain.src = "images/material.png";
    imgEnemy = newImage();
    imgEnemy.src = "images/Enemy.png"; i
    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (var x in mapArray) {   /* */
                for (var y in mapArray[x]) {
                    if (mapArray[x][y] == 1) {      /* 設置障礙物*/
                        ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);  /*引入圖片 */
                    } else if (mapArray[x][y] == 3) {   /*設置敵人 */
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);   /*引入圖片 */
                    }
                }
            }
        }
    }


});




//2. 處理使用者按下按鍵
//(event)傳入值，帶判斷與處理，不確定多少，先用event。
$(document).on("keydown", function (event) {

});

