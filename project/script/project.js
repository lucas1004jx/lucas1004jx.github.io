

$(function(){
    
    /*ReactDOM.render(React.createElement("div",null,"hello world"),document.getElementById("react"))*/
    
    
    
    
    var wHeight = $(window).height();
    var wWidth = $(window).width();
            $(".fullHeight").css("height", wHeight);

            $(window).resize(function () {
                var wHeight = $(window).height();
                $(".fullHeight").css("height", wHeight);
            });

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
    
    $("header h1").lettering();
    
    //control position of .letter
    
   
   function position(){
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    var lWidth= $(".letter").width();
    var lHeight =$(".letter").height();
    var top = (wHeight-lHeight)/2;
    var left =(wWidth-lWidth)/2;
     $(".letter").css("top",top);
    $(".letter").css("left",left);
   }

    //----------------position letters-------------------------
    var font = new FontFaceObserver("orbitron", {
  weight: 400
});

font.load().then(function () {
    position();
  
}, function () {
    position();
  console.log('Font is not available');
});
    position();
    $(window).resize(position);
    
    
    
    
});


