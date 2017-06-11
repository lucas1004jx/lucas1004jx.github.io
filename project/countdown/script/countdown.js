$(function(){
    var wHeight=$(window).height();
    
  $(".fullHeight").css("height",wHeight);
    
    $(window).resize(function(){
        var wHeight = $(window).height();
        $(".fullHeight").css("height",wHeight);
    });
    
    /*countdown*/
    $(".countdown").countdown({
        until:$.countdown.UTCDate(
        2,2017,8,1,11,30,0
        )
    })
    
    /*navbar overlay*/
            $("#open").click(function() {
                    $("#nav").fadeToggle();
                $("#open").css("visibility","hidden");
               
                });
            $("#close").click(function(){
                $("#nav").fadeToggle();
               $("#open").css("visibility","visible");
            });              
            
    $(window).resize(function() {
        if (window.innerWidth >=769) {
            $("#nav").css("display", "block");
        }else{
            $("#nav").css("display", "none");
            $("#open").css("visibility","visible");
        }

    });      
    
});