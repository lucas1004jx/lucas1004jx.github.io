$(function(){
    var wHeight=$(window).height();
    $(".fullHeight").css("height",wHeight);
    
    $(window).resize(function(){
        var wHeight=$(window).height();
        $(".fullHeight").css("height",wHeight);
    });
});

