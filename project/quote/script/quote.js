$(function () {

    $("#get").click(function () {

        $.getJSON("quote.json", function (data) {
            var num = data.cita.length;
            var index = Math.floor(Math.random() * num);
            //$("#quote").html("<p>" + data.cita[index] + "</p>");

            /*typing animation*/
            $("#quote p").typed({
                strings: [data.cita[index]],
                typeSpeed: 50,
                contentType: "text",
                backSpeed:50,
                backDelay:500
            });
            
            
            
            /*make font responsive according to text amount*/
            var $quote = $("#quote p");
            var $wordnum = $quote.text().split(" ").length;

            function resfont() {
                var $wWidth = $(window).width();

                if ($wWidth < 480) {
                    if ($wordnum <= 15 && $wordnum >= 0) {
                        $quote.css("font-size", "2.5rem");

                    } else if ($wordnum > 15 && $wordnum <= 20) {
                        $quote.css("font-size", "2rem");

                    } else if ($wordnum > 20 && $wordnum <= 25) {
                        $quote.css("font-size", "2rem");

                    } else if ($wordnum > 25 && $wordnum <= 50) {
                        $quote.css("font-size", "1.5rem");
                    }

                } else if ($wWidth > 481 && $wWidth < 768) {

                    if ($wordnum <= 15 && $wordnum >= 0) {
                        $quote.css("font-size", "4rem");
                    } else if ($wordnum > 15 && $wordnum <= 20) {
                        $quote.css("font-size", "3.5rem");
                    } else if ($wordnum > 20 && $wordnum <= 25) {
                        $quote.css("font-size", "3rem");
                    } else if ($wordnum > 25 && $wordnum <= 50) {
                        $quote.css("font-size", "2.5rem");
                    }

                } else if ($wWidth > 769) {

                    if ($wordnum <= 15 && $wordnum >= 0) {
                        $quote.css("font-size", "5rem");
                    } else if ($wordnum > 15 && $wordnum <= 20) {
                        $quote.css("font-size", "4.5rem");
                    } else if ($wordnum > 20 && $wordnum <= 25) {
                        $quote.css("font-size", "3.5rem");
                    }else if ($wordnum > 25 && $wordnum <= 50) {
                        $quote.css("font-size", "3rem");
                    }
                }
            }

            resfont();
            $(window).resize(resfont);

        });
    });
    
    function typing(){
        $("h1").typed({
                strings:["hoy te toca <br>gym","anímate <br>con una frase","tú <br> puedes"],
                typeSpeed:50
            }); 
    }
    
    typing();
    setInterval(typing,30000)
     

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




});
