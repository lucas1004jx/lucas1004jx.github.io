$(function () {
    var text_es = ["Premio Nobel se otorga cada año a personas que efectúen investigaciones o descubrimientos sobresalientes durante el año precedente o lleven a cabo el mayor beneficio a la humanidad o contribución notable a la sociedad.", "Cada laureado recibe una medalla de oro, un diploma y una suma de dinero.Los premios se instituyeron como última voluntad de Alfred Nobel, inventor de la dinamita e industrial sueco.", "La primera ceremonia de entrega de los Premios Nobel se celebró en la Antigua Real Academia de Música de Estocolmo (Suecia) en 1901. Desde 1902, los premios los entrega el Rey de Suecia. Los premios se conceden en una ceremonia anualmente el 10 de diciembre, fecha en que Alfred Nobel murió."];
    
var text_en=["Time travel is the concept of movement (such as by a human) between certain points in time, analogous to movement between different points in space, typically using a hypothetical device known as a time machine, in the form of a vehicle or of a portal connecting distant points in time.","Time travel is a recognized concept in philosophy and fiction, but traveling to an arbitrary point in time has a very limited support in theoretical physics, and usually only connected with quantum mechanics or wormholes, also known as Einstein-Rosen bridges.","In a more narrow sense, one-way time travel into the future via time dilation is a well-understood phenomenon within the frameworks of special relativity and general relativity, but advancing a large amount of time is not feasible with current technology."];
    var time = [0, 0, 0];
    var count;
    var begin = false;
    var currentText;
    var vez=0,high_score=0,countError=0;
    var record=[];
    var error=false;
    record[0]=0;
    
    var textArr;
    var countWord;
    
    

    function updateTime() {
        var min = Math.floor(time[2] / 100 / 60);
        var sec = Math.floor(time[2] / 100 - min * 60);
        var miniSec = time[2] - sec * 100-min*6000;

        min < 9 ? min = "0" + min : min = min;
        sec < 9 ? sec = "0" + sec : sec = sec;
        miniSec < 9 ? miniSec = "0" + miniSec : miniSec = miniSec;
        
        $("#timer span").text(min + ":" + sec + ":" + miniSec);
        time[2]++;
    };

     function stop(){
        clearInterval(count); 
        count=null;
         time=[0,0,0];
         begin=false;
    }
    
    function reset() {
        stop();
        countError=0;
        $("#timer span").text("00:00:00");
        $("textarea").val("");
        $("textarea").css("outline","rgb(153,153,153) solid 2px");
        $("#result_btn").prop("disabled",false);
    }

    function spellCheck() {
        var input = $("textarea").val();
        var orignalText = currentText.substr(0, input.length);
        if(input === currentText && begin=== true){
            record[vez-1]=time[2]-1;
           stop();
            showResult();
            $("#result_btn").prop("disabled",false);
            $("#stc h1").text("ENHORABUENA!");
            
           }else {
              if(input===orignalText && input.length !== 0){
           $("textarea").css("outline","#83C25A solid 2px");
                  error=false;
           }else if(input !==orignalText){
               if(error===false){
                  countError++;
                   error=true;
                  }
              $("textarea").css("outline","#ff0000 solid 2px");
               
           }else if(input.length===0){
                    $("textarea").css("outline","rgb(153,153,153) solid 2px");
                    } 
           }
        
        
    }
    
   function showResult(){
       $(".act").fadeIn("slow");
       $(".card").fadeIn().css("top", "50%");
       $("#result_es h1").text("ENHORABUENA!");
       $("#result_en h1").text("CONGRATULATIONS!");
       $(".try").text(" "+vez+" ");
       var time=$("#timer span").text();
       $(".time").text(time);
       record.sort(function(a, b){return a-b});
       high_score=record[0];
       $(".reco").text(format(high_score));
       $(".error").text(countError);
      
       var accu=((countWord-countError)/countWord).toFixed(3);
       var speed=Math.floor((countWord/(record[vez-1]/6000)));
       $(".accu").text(" "+accu*100+"%");
       $(".speed").text(" "+speed);
   }

    function hideResult(){
        $(".act").fadeOut("slow");
       $(".card").css("top", "100vh").fadeOut();
    }
    $("textarea").on("keypress", function () {
        if ($("textarea").val().length === 0 && begin === false) {
            count = setInterval(updateTime, 10);
            begin = true;
            vez++;
            $("#result_btn").prop("disabled",true);
        }
    });
    
    function español(){
//-------------------hide lang section, show main section-----------------
        $("#main").fadeIn().css("left",0);
        $("#lang").css("left","-100vw").fadeOut();
        $("#result_es").addClass("act");
        $("#result_en").removeClass("act");
    
        currentText = text_es[0];
        textArr=currentText.split(" ");
        countWord=textArr.length;
        $("#text").text(text_es[0]);
      $("button.text").map(function (index, arr) {

        $(this).click(function () {
            $("#text").text(text_es[index]);
            currentText = text_es[index];
            textArr=currentText.split(" ");
            countWord=textArr.length;
            
        });
    });
        /*-------change language----------*/
        $("#main h1").text("Test de velocidad");
        $("#timer span").text("00:00:00");
        $("start").text("probar otra vez");
        $("#result_btn").text("estatistica");
        
        /*----------change color-------------*/
        $(".text").css("background","#83C25A");
        $("#start").css("background","#83C25A");  
        $("#result_btn").css("background","#83C25A");
        /*------change icon------------------*/
        $("#arrow").attr("src","images/arrow_green.png");
    }
    
    function english(){
        //-------------------hide lang section, show main section-----------------
        $("#main").fadeIn().css("left",0);
        $("#lang").css("left","-100vw").fadeOut();
        $("#result_en").addClass("act");
        $("#result_es").removeClass("act");
        
        currentText = text_en[0];
        textArr=currentText.split(" ");
        countWord=textArr.length;
        $("#text").text(text_en[0]);
      $("button.text").map(function (index, arr) {

        $(this).click(function () {
            $("#text").text(text_en[index]);
            currentText = text_en[index];
            textArr=currentText.split(" ");
            countWord=textArr.length;
            
        });
    });
        /*-------change language----------*/
        $("#main h1").text("typing speed test");
        $("#timer span").text("00:00:00");
        $("#start").text("start over");
        $("#result_btn").text("statistic");
        /*----------change color-------------*/
        $(".text").css("background","#E0932B");
        $("#start").css("background","#E0932B");  
        $("#result_btn").css("background","#E0932B");
        /*------change icon------------------*/
        $("#arrow").attr("src","images/arrow_orange.png");
    }
    
    function lang(){
        $("#main").css("left","100vw").fadeOut();
        $("#lang").fadeIn().css("left","0");
    }
   
    function format(time){
        var min = Math.floor(time / 100 / 60);
        var sec = Math.floor(time / 100 - min * 60);
        var miniSec = time - sec * 100-min*6000;

        min < 9 ? min = "0" + min : min = min;
        sec < 9 ? sec = "0" + sec : sec = sec;
        miniSec < 9 ? miniSec = "0" + miniSec : miniSec = miniSec;
        
        return (min + ":" + sec + ":" + miniSec);
    }
    
    $("#result_btn").prop("disabled",true);
    $("textarea").keyup(spellCheck);

    $("#start").click(reset);
    
    $("#result_btn").click(function(){
        showResult();
        $("#result_es h1").text("ESTATISTICA");
        $("#result_en h1").text("STATISTIC");
    });
    $(".back").click(hideResult);
    $("#es").click(español);
    $("#en").click(english);
    $("#arrow").click(lang);
    
     //--------------initialize slide menu-------------
    var controller = new slidebars();
  controller.init();
    $( '#menu' ).on( 'click', function ( event ) {
  // Stop default action and bubbling
  event.stopPropagation();
  event.preventDefault();

  // Toggle the Slidebar with id 'id-1'
  controller.toggle( 'id-1' );
} );
    $( '#lang' ).click(function(){
        controller.close( 'id-1' );
    });
   
    //--------postion-----------
    function position(){
        var wWidth=$(window).width();
        var wHeight=$(window).height();
        $("html,body,#lang,#main,#result_es,#result_en,.overlay").css("width",wWidth);
        $("html,body,#lang,#main,#result_es,#result_en,.overlay").css("height",wHeight);
    }
    
    position();
    $(window).resize(position);
    
    //-------------overlay nav------------
    $("#menu").click(function(){
        
    });
    
    //------prevent copy and past text-------------
    $("body").on("copy paste",function(e){
        e.preventDefault();
        return false;
    })
    
});
