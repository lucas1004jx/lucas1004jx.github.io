$(function () {

    $("#get").click(function () {

        $.getJSON("quote.json", function (data) {
            var num = data.cita.length;
            var index = Math.floor(Math.random() * num) + 1;
            $("#quote").html("<p>" + data.cita[index] + "</p>");

            /*make font responsive according to text amount*/
            var $quote = $("#quote p");
            var $wordnum = $quote.text().split(" ").length;

            function resfont(){
               var $wWidth=$(window).width();
                
                if ($wWidth < 480) {
                  if($wordnum<=15 && $wordnum >=0){
                  $quote.css("font-size", "2.5rem");
                     
                }else if ($wordnum > 15 && $wordnum <=20) {
                    $quote.css("font-size", "2rem");
                    
                } else if ($wordnum > 20) {
                    $quote.css("font-size", "2rem");
                    
                }

            } else if ($wWidth > 481 && $wWidth < 768) {

                if($wordnum<=15 && $wordnum>=0){
                  $quote.css("font-size", "4rem");
                }else if ($wordnum > 15 && $wordnum<=20) {
                    $quote.css("font-size", "3.5rem");
                } else if ($wordnum > 20) {
                    $quote.css("font-size", "3rem");
                }

            } else if ($wWidth > 769) {
                 
                if($wordnum<=15 && $wordnum>=0){
                  $quote.css("font-size", "5rem");
                }else if ($wordnum > 15 && $wordnum<=20) {
                    $quote.css("font-size", "4.5rem");
                } else if ($wordnum > 20) {
                    $quote.css("font-size", "3rem");
                }
            }
            }

            resfont();
            $(window).resize(resfont);
            
        });
    });


    var wHeight = $(window).height();
    $(".fullHeight").css("height", wHeight);

    $(window).resize(function () {
        var wHeight = $(window).height();
        $(".fullHeight").css("height", wHeight);
    });

    /*navbar overlay*/
    $("#open").click(function () {
        $("#nav").fadeToggle();
        $("#open").css("visibility", "hidden");

    });
    $("#close").click(function () {
        $("#nav").fadeToggle();
        $("#open").css("visibility", "visible");
    });

    $(window).resize(function () {
        if (window.innerWidth >= 769) {
            $("#nav").css("display", "block");
        } else {
            $("#nav").css("display", "none");
            $("#open").css("visibility", "visible");
        }

    });


    /*btn position*/

    var $wbtn = $("#get").width();
    var $wWidth = $(window).width();
    var lbtn = ($wWidth - $wbtn) / 2;
    $("#get").css("left", lbtn);

    $(window).resize(function () {
        var $wbtn = $("#get").width();
        var $wWidth = $(window).width();
        var lbtn = ($wWidth - $wbtn) / 2;
        $("#get").css("left", lbtn);

    });

});
