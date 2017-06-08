$(function(){
    var wHeight=$(window).height();
    $(".fullHeight").css("height",wHeight);
    
    $(window).resize(function(){
        var wHeight=$(window).height();
        $(".fullHeight").css("height",wHeight);
    });
    
    $("header h1").lettering();
    
    /*glow the stars of time line*/
    var star = $(".timeLine").find("i");
    
    star.each(function(){
        var sec=Math.random()+ 1 + "s";
        
        $(this).css("animation","light "+sec+" infinite linear alternate");
    });
    
    /*down button*/
    var tag=$("a[href^='#']");
   tag.each(function(){
       var id=$(this).attr("href");
       $(this).click(function(){
       
           $("html,body").animate({scrollTop:$(id).offset().top},"slow")

       });
   });
    
    
    /*to up button*/
    var top =$("#top");
    top.click(function(){
              $("html,body").animate({scrollTop:0},"slow");
              });
    $(window).scroll(function(){
        if($(window).scrollTop()>450){
           top.fadeIn();
           }else{
               top.fadeOut();
           }
    })
    
});


