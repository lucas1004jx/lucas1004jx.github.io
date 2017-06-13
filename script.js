$(function () {
            var wHeight = $(window).height();
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

                /*glow the stars of time line*/
                var star = $(".timeLine").find("i");

                star.each(function () {
                    var sec = Math.random() + 1 + "s";

                    $(this).css("animation", "glow " + sec + " infinite linear alternate");
                });

                /*down button*/
                var tag = $("a[href^='#']"); tag.each(function () {
                    var id = $(this).attr("href");
                    $(this).click(function () {

                        $("html,body").animate({
                            scrollTop: $(id).offset().top
                        }, "slow")

                    });
                });


                /*to up button*/
                var top = $("#top"); top.click(function () {
                    $("html,body").animate({
                        scrollTop: 0
                    }, "slow");
                }); $(window).scroll(function () {
                    if ($(window).scrollTop() > 450) {
                        top.fadeIn();
                    } else {
                        top.fadeOut();
                    }
                })





            });

        /*animate visible element on screen*/

        $(window).on("load", function () {
            $(window).scroll(function () {
                var windowBottom = $(this).scrollTop() + $(this).innerHeight();
                $("figure, .fade,#timeLine h4,#timeLine p,#timeLine i").each(function () {
                    /* Check the location of each desired element */
                    var objectBottom = $(this).offset().top + $(this).outerHeight();

                    /* If the element is completely within bounds of the window, fade it in */
                    if (objectBottom < windowBottom) { //object comes into view (scrolling down)
                        if ($(this).css("opacity") == 0) {
                            $(this).fadeTo(1000, 1);
                        }
                    } else { //object goes out of view (scrolling up)
                        if ($(this).css("opacity") == 1) {
                            $(this).fadeTo(1000, 0);
                        }
                    }
                });
            }).scroll(); //invoke scroll-handler on page-load


        });
