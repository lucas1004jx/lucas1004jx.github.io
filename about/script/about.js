(function () {

    var wHeight = $(window).height();
    $(".fullHeight").css("height", wHeight);

    $(window).resize(function () {
        var wHeight = $(window).height();
        $(".fullHeight").css("height", wHeight);
    });


    function position() {
        var title = document.querySelector("header  h1");
        var header = document.querySelector("header");


        title.style.top = (header.offsetHeight - title.offsetHeight) / 2 + "px";
        title.style.left = (header.offsetWidth - title.offsetWidth) / 2 + "px";
    }



    var font = new FontFaceObserver("gfs-didot");
    font.load().then(function () {
        position();

    }, function () {
        position();
        console.log('Font is not available');
    });

    position();
    window.addEventListener("resize", position, false);

})();

//to top function
$(document).ready(function () {

    $("#toTop button").on("click", function () {
        $("html body").animate({
            scrollTop: 0
        }, "slow");
    });



    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 250) {

            $("#toTop button").fadeIn();
        } else {
            $("#toTop button").fadeOut();
        }
    });

});
