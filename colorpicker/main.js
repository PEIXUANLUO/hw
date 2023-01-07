//initial
$(function(){
    $("[type='color']").on("change",changeColor);  
  });
  
  function changeColor(){
    // console.log("[changeColor] in");
    console.log(this.value);
    // set body background-color
    $('body').css("background-color", this.value);
  }