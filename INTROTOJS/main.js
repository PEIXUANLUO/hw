$(function () {
    $("button").on("click", go);
});

const maleKeywords = ["雄", "強", "賢", "志"];
const femaleKeywords = ["芸", "芬", "佩"];


// = ( ) => { };，{ }，裡面是function。( )，參數(輸入的值)。
// =>，=，function(){}。
// .val()，取值，jquery的方法。var inputText = $("#userInput").val()。
// inputText等於，前端userInput的值。
// .some( )，陣列的方法，後面尋訪是否有true。.includes( )，字串用的方法，檢查裡面是否有包含。

let go = () => {
    var inputText = $("#userInput").val();
    debugger;
    const isMale = maleKeywords.some(thisElement => inputText.includes(thisElement));
    const isFemale = femaleKeywords.some(thisElement => inputText.includes(thisElement));
    if (isMale && isFemale) {
        $("h1").text("😁");
    } else if (isMale) {
        $("h1").text("🧑");
    } else if (isFemale) {
        $("h1").text("👩");
    } else {
        $("h1").text("😎");
    }
};