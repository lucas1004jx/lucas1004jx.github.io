$(function () {

    $("#get").on("click touchstart", function () {

        $.getJSON("quote.json", function (data) {
            var num;
            var index;
            if ($("#en").hasClass("active")) {
                num = data.cita.length;
                index = Math.floor(Math.random() * num);
                /*typing animation*/
                $("#quote p").typed({
                    strings: [data.quote[index]],
                    typeSpeed: 50,
                    contentType: "text"  
               
                });


            } else if ($("#es").hasClass("active")) {
                num = data.cita.length;
                index = Math.floor(Math.random() * num);
                /*typing animation*/
                $("#quote p").typed({
                    strings: [data.cita[index]],
                    typeSpeed: 50,
                    contentType: "text",
                    backSpeed: 50,
                    backDelay: 500
                });
            }

            //$("#quote").html("<p>" + data.cita[index] + "</p>");


            /*make font responsive according to text amount*/
            var $quote = $("#quote p");
            var $wordnum = $quote.text( ).split(" ").length;

            function resfont() {
                var $wWidth = $(window).width();

                if ($wWidth < 480) {
                    if ($wordnum <= 15 && $wordnum >= 0) {
                        $quote.css("font-size", "2rem");

                    } else if ($wordnum > 15 && $wordnum <= 20) {
                        $quote.css("font-size", "1.5rem");

                    } else if ($wordnum > 20 && $wordnum <= 25) {
                        $quote.css("font-size", "1rem");

                    } else if ($wordnum > 25 && $wordnum <= 50) {
                        $quote.css("font-size", "1rem");
                    }

                } else if ($wWidth > 481 && $wWidth < 768) {

                    if ($wordnum <= 15 && $wordnum >= 0) {
                        $quote.css("font-size", "3rem");
                    } else if ($wordnum > 15 && $wordnum <= 20) {
                        $quote.css("font-size", "3rem");
                    } else if ($wordnum > 20 && $wordnum <= 25) {
                        $quote.css("font-size", "2.5rem");
                    } else if ($wordnum > 25 && $wordnum <= 50) {
                        $quote.css("font-size", "2rem");
                    }

                } else if ($wWidth > 769) {

                    if ($wordnum <= 15 && $wordnum >= 0) {
                        $quote.css("font-size", "4.5rem");
                    } else if ($wordnum > 15 && $wordnum <= 20) {
                        $quote.css("font-size", "4rem");
                    } else if ($wordnum > 20 && $wordnum <= 25) {
                        $quote.css("font-size", "3rem");
                    } else if ($wordnum > 25 && $wordnum <= 50) {
                        $quote.css("font-size", "2.5rem");
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

    /*language choice*/
    
<<<<<<< HEAD
    /*type English*/
     function typingEn() {
            $("h1").typed({
                strings: ["it´s gym <br>time", "get motivated <br>by a quote", "it´s gym <br>time"],
                typeSpeed: 50,
                backSpeed: 50,
                backDelay: 500,
                contentType: "html",
                showCursor: false,
                loop: false
            });
        }
=======
    if($("#es").hasClass("active")){
       
        function typingEs() {
            $("h1").typed({
                strings: ["hoy te toca <br>gym", "anímate <br>con una frase",  "hoy te toca <br>gym"],
                typeSpeed: 50
            });
        }

        typingEs();
        
    
       }
>>>>>>> origin/master
    
    /*type Español*/
     function typingEs() {
            $("h1").typed({
                strings: ["hoy te toca <br>gym", "anímate <br>con una frase", "hoy te toca <br>gym"],
                typeSpeed: 50,
                backSpeed: 50,
                backDelay: 500,
                contentType: "html",
                showCursor: false,
                loop: false
            });
        }

    /*when load the page first time*/
    typingEs();
    
    /*when change english*/
    $("#en").on("click touchstart", function () {
        $("#en").addClass("active");
        $("#es").removeClass("active");
        $("#get").html("get motivated <i class='fa fa-arrow-circle-up'></i>");
        $("#quote p").html("<p>To achieve something you’ve never had before, you must do something you’ve never done before.</p>");
<<<<<<< HEAD
        typingEn();
=======

        function typingEn() {
            $("h1").typed({
                strings: ["it´s gym <br>time", "get motivated <br>by a quote", "it´s gym <br>time"],
                typeSpeed: 50
            });
        }

        typingEn();
        
>>>>>>> origin/master

    });

    /*when change español*/
    $("#es").on("click touchstart", function () {
        $("#es").addClass("active");
        $("#en").removeClass("active");
        $("#get").html("motívate con otra frase <i class='fa fa-arrow-circle-up'></i>");
        $("#quote p").html("<p>No es grande aquel que nunca falla si no el que nunca se da por vencido.</p>");
<<<<<<< HEAD
        typingEs();    
=======
        
        
       

        typingEs();
        
>>>>>>> origin/master
        
    });


});
