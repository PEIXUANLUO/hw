// asyncProcess，function名字。
// (imageID, imageURL) ，兩個傳入值。

// return new Promise((resolve, reject) => { })。return ，回傳。Promise，平行開路執行。(resolve正常的執行的話, reject失敗的話)，
// function () {   resolve($(this)[0].naturalWidth);包著之後執行
// .attr( )，設定屬性值。
// 9、12行的resolve，同一個。

function asyncProcess(imageID, imageURL) {
    return new Promise((resolve, reject) => {
        $(imageID).attr('src', imageURL);
        $(imageID).on('load', function () {
            resolve($(this)[0].naturalWidth);
        });
    });
}

$(function () {
    $("button").on("click", go);
});

// asyncProcess上面的function。Promise，大家一起開始。.then前面都好了，再一起做的事。response，代表了一個請求會返回的回應，集合前面resolve($(this)[0].naturalWidth);。
// var totalWidth = 0;初始寬度0
// $("span").append(response[x]);
// if (x < response.length - 1) {$("span").append(" + ");，如果還不是最後一張，要加+。
// $("span").append(" = " + totalWidth);最後一張，加 = 。
function go() {
    Promise.all([
        asyncProcess("#image1", "https://punchline.asia/wp-content/uploads/2017/09/it-movie-poster-1.jpg"),
        asyncProcess("#image2", "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c618cd88432989.5dd5e72e505d1.jpg"),
        asyncProcess("#image3", "https://www.u-buy.com.tw/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFIQk9PN3RZNUwuX0FDX1NMMTUwMF8uanBn.jpg")
    ])
        .then(
            response => {
                var totalWidth = 0;
                for (var x = 0; x < response.length; x++) {
                    $("span").append(response[x]);
                    totalWidth += response[x];
                    if (x < response.length - 1) {
                        $("span").append(" + ");
                    } else {
                        $("span").append(" = " + totalWidth);
                    }
                }
            },
            error => {
                console.log(`Error:${error}`);
            }
        );
}