(function () {

    var title = document.querySelector("header  h1");
    var header = document.querySelector("header");


    title.style.top = (header.offsetHeight - title.offsetHeight) / 2 + "px";
    title.style.left = (header.offsetWidth - title.offsetWidth) / 2 + "px";


    function rePosition() {
        title.style.top = (header.offsetHeight - title.offsetHeight) / 2 + "px";
        title.style.left = (header.offsetWidth - title.offsetWidth) / 2 + "px";

    }

    window.addEventListener("resize", rePosition, false);

})();

//to top function
$(document).ready(function () {

    $("#toTop button").on("click", function () {
        $("html body").animate({scrollTop:0},"slow");
    });



$(window).on("scroll",function(){
    if ($(window).scrollTop() > 250) {
        
        $("#toTop button").css("display", "block");
    }else{
        $("#toTop button").css("display", "none");
    }
});
    
});
