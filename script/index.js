//---------preloader----------------

$("#logo").css("fill", "rgb(57, 255, 1)");
wWidth = $(window).width();
wHeight = $(window).height();
$("#preloader").css({
    width: wWidth,
    height: wHeight
});

TweenMax.to("#outter", 1, {
    rotation: "360",
    transformOrigin: "45 45",
    repeat: -1
})


$(function () {
    $("body").fadeIn(500);
    setTimeout(function () {
        $("#preloader").fadeOut();
        initLogo();
        titleTl.play();
    }, 2000);

    function fullHeight() {
        wWidth = $(window).width();
        wHeight = $(window).height();
        $("html,body,.page,#preloader,nav,#page1,#page2,#page3").css({
            width: wWidth,
            height: wHeight
        });
    }

    fullHeight();
    $(window).resize(fullHeight);

    //-----------------------------------animate each page title----------------------------
    $("#dev").lettering();
    var titleTl = new TimelineLite({
        paused: true
    });
    var introTl = new TimelineLite({
        paused: true
    });
    var timelineTl = new TimelineLite({
        paused: true
    });
    var portTl = new TimelineLite({
        paused: true
    });
    var contactTl = new TimelineLite({
        paused: true
    });
    var meet = $("#meet-xin span");
    var dev = $("#dev span");
    titleTl
        .staggerFrom(meet, 1, {
            cycle: {
                x: [-200, 200]
            },
            ease: Power4.easeIn,
            opacity: 0,
            scale: 0.5
        }, 0.1)
        .staggerFrom(dev, 0.5, {
            cycle: {
                y: [10, -10],
                scale: [2, 0.5]
            },
            opacity: 0
        }, 0.1);



    introTl
        .from("#page2 h1", 0.5, {
            y: -200,
            opacity: 0
        }, "-=0.2")
        .staggerFrom("#self-intro p", 0.5, {
            cycle: {
                x: [-100, 100],
                scale: [2, 0.5]
            },
            opacity: 0
        }, 0.1);

    timelineTl
        .from("#page3 h1", 0.5, {
            scale: "2",
            opacity: 0
        })
        .staggerFrom(".footprint", 1, {
            y: -50,
            opacity: 0,
            fill: "#FECA47"
        }, 0.1)
        .staggerFrom(".tl", 1, {
            cycle: {
                x: [-50, 50]
            },
            opacity: 0
        }, 0.1, "-=1");

    portTl.
    from("#page4 h1", 0.5, {
        scale: "2",
        opacity: 0
    });

    contactTl
        .staggerFrom(".info", 0.5, {
            opacity: 0,
            y: -50
        }, 0.1);
    //-----------------------------portfolio carousel---------------------
    $(".owl-carousel").owlCarousel({
        loop: true,
        nav: false,
        center: true,
        autoHeight: true,
        responsive: {
            0: {
                items: 1
            },

            481: {
                items: 2
            },
            769: {
                items: 3
            }
        }
    });


    var owl = $(".owl-carousel");
    var alt = $("#portfolio .owl-carousel").find(".center figure img").attr("alt");
        $("#portfolio h2").text(alt);
    owl.on("translated.owl.carousel", function (e) {
         alt = $("#portfolio .owl-carousel").find(".center figure img").attr("alt");
        $("#portfolio h2").text(alt);
        TweenMax.from("#portfolio h2", 0.5, {
            opacity: 0,
            scale: 0.5
        });
    });



    //--------------logo animation--------
    function logoRota() {
        TweenMax.to("#outter", 1, {
            rotation: 720,
            transformOrigin: "45 45"
        })
        TweenMax.to("#text", 0.5, {
            fill: "rgb(216,253,53)"
        });
    }

    function logoReset() {
        TweenMax.to("#outter", 1, {
            rotation: 0

        });

        TweenMax.to("#text", 0.5, {
            fill: "rgb(57, 255, 1)"
        });
    }

    $(".logo").on("mouseover", function () {
        logoRota();

    })

    $(".logo").on("mouseout", function () {
        logoReset();

    });

    function initLogo() {
        logoRota();
        setTimeout(logoReset, 1000);
    }


    //--------------menu   animation-----------
    var tl = new TimelineLite({
        onReverseComplete: function () {
            tl.clear()
            $("#index").fadeIn();
        }
    });
    var navT = $(".nav-container-top");
    var navB = $(".nav-container-bottom");
    var nav = $(".nav");
    var factor = 65;

    function setFactor() {
        var wWidth = $(window).width();
        var wHeight = $(window).height();
        if (wWidth >= wHeight) {
            var radius = wWidth + 500;
        } else {
            var radius = wHeight + 500;
        }
        factor = radius / 40;
    }



    $(window).resize(function () {
        setFactor();
        if ($(".menu").hasClass("open")) {
            $(".nav-container-top,.nav-container-bottom").css({
                transform: "scale(" + factor + ")"
            });
        }
    });

    //setFactor();
    function navTl(num) {

        tl.to(["nav", ".nav"], 0.1, {
                display: "block",

            })
            .to(navT, 0.5, {
                scale: num,
                backgroundColor: "#D1EB0B",
                top: "50%",
                right: "50%"
            })
            .to(navB, 0.5, {

                scale: num,
                backgroundColor: "#fff",
                bottom: "50%",
                left: "50%"
            }, "-=0.3")
            .staggerFromTo(".nav li", 0.5, {
                cycle: {
                    x: [60, -60],
                    scale: [2, 0.5]
                },
                autoAlpha: 0
            }, {
                x: 0,
                scale: 1,
                autoAlpha: 1
            }, 0.2); //---time line

        tl.pause();

    }

    tl.reversed(true);
    $(".menu").click(function () {
        initLogo();
        $(".menu").toggleClass("open");
        if ($(".menu").hasClass("open")) {
            setFactor();
            navTl(factor);
            $("#index").fadeOut();
        }

        tl.reversed() ? tl.play() : tl.reverse();

    }); //menu click

    //---------------------------------init map------------
    var gMapKey = "AIzaSyAFb2c6JbK8KNBjYOYeEIDepVAGUSlZvNY";

    $('#map').mapit({
        latitude: 41.637188,
        longitude: -4.739163,
        marker: {
            latitude: 41.637188,
            longitude: -4.739163,
            icon: '../image/marker.png',
            title: '',
            open: false,
            center: true
        },
        address: 'PASEO ZORRILLA 45,VALLADOLID, SPAIN',
        styles: 'GRAYSCALE',
        locations: [],
        origins: []
    });

    // -------------------------------------------scroll-------------------------------
    var pageCount = 1;
    var up = false;
    var down = true;
    var scroll = true;

    function init() {
        up = true;
        down = true;

    }

    var page1Scroll = new TimelineLite({
        paused: true,
        onReverseComplete: function () {
            pageCount--;
            init();
            titleTl.play();
            introTl.reverse();
            //console.log("reverse:" + pageCount);
            TweenMax.to(".menu span", 0.5, {
                background: "#000"
            });
            TweenMax.to(".link", 0.5, {
                color: "#000"
            });
        }
    });
    var page2Scroll = new TimelineLite({
        paused: true,
        onReverseComplete: function () {
            pageCount--;
            init();
            introTl.play();
            timelineTl.reverse();
            TweenMax.to(".menu span", 0.5, {
                background: "rgb(57, 255, 1)"
            });
            TweenMax.to(".link", 0.5, {
                color: "rgb(57, 255, 1)"
            });
            //console.log("reverse:" + pageCount);
        }
    });
    var page3Scroll = new TimelineLite({
        paused: true,
        onReverseComplete: function () {
            pageCount--;
            init();
            timelineTl.play();
            portTl.reverse();
            //console.log("reverse:" + pageCount);
        }
    });
    var page4Scroll = new TimelineLite({
        paused: true,
        onReverseComplete: function () {
            pageCount--;
            init();
            portTl.play();
            contactTl.reverse();
            TweenMax.to(".menu span", 0.5, {
                background: "#000"
            });
            TweenMax.to(".link", 0.5, {
                color: "#000"
            });
            //console.log("reverse:" + pageCount);
        }
    });



    page1Scroll
        .to("#page1", 0.8, {
            y: "-100%",
            ease: Power1.easeIn

        })
        .to("#home", 0.4, {
            y: "-100%",
            ease: Power1.easeOut

        }, "-=0.2")
        .to("#intro", 0.5, {
            y: "-100%",
            ease: Power1.easeOut,
            onComplete: function () {
                pageCount = 2;
                init();
                titleTl.reverse();
                introTl.play();
                TweenMax.to(".menu span", 0.5, {
                    background: "rgb(57, 255, 1)"
                });
                TweenMax.to(".link", 0.5, {
                    color: "rgb(57, 255, 1)"
                });
                //console.log("complete:" + pageCount);
            }
        }, "-=0.2");

    page2Scroll
        .to("#page2", 0.8, {
            y: "-100%",
            ease: Power1.easeIn
        })
        .to("#intro", 0.4, {
            y: "-200%",
            ease: Power1.easeOut
        }, "-=0.2")
        .to("#timeline", 0.5, {
            y: "-100%",
            ease: Power1.easeOut,
            onComplete: function () {
                pageCount = 3;
                init();
                introTl.reverse();
                timelineTl.play();
                TweenMax.to(".menu span", 0.5, {
                    background: "#000"
                });
                TweenMax.to(".link", 0.5, {
                    color: "#000"
                });
                //console.log("complete:" + pageCount);
            }
        }, "-=0.2");

    page3Scroll
        .to("#page3", 0.8, {
            y: "-100%",
            ease: Power1.easeIn
        })
        .to("#timeline", 0.4, {
            y: "-200%",
            ease: Power1.easeOut
        }, "-=0.2")
        .to("#portfolio", 0.5, {
            y: "-100%",
            ease: Power1.easeOut,
            onComplete: function () {
                pageCount = 4;
                init();
                timelineTl.reverse();
                portTl.play();
                //console.log("complete:" + pageCount);
            }
        }, "-=0.2");

    page4Scroll
        .to("#page4", 0.8, {
            y: "-100%",
            ease: Power1.easeIn
        })
        .to("#portfolio", 0.4, {
            y: "-200%",
            ease: Power1.easeOut
        }, "-=0.2")
        .to("#contact", 0.5, {
            y: "-100%",
            ease: Power1.easeOut,
            onComplete: function () {
                pageCount = 5;
                init();
                portTl.reverse();
                contactTl.play();
                TweenMax.to(".menu span", 0.5, {
                    background: "rgb(57, 255, 1)"
                });
                TweenMax.to(".link", 0.5, {
                    color: "rgb(57, 255, 1)"
                });
                //console.log("complete:" + pageCount);
            }
        }, "-=0.2");


    function pageScroll() {
        if (scroll) {
            initLogo();
            scroll = false;
            setTimeout(function () {
                scroll = true;
            }, 1000);

            if ((delta > 0 || touchDir === "panup") && down === true) {

                up = false;
                down = false;

                switch (pageCount) {
                    case 1:
                        page1Scroll.play().timeScale(1);
                        $(".active").removeClass("active");
                        $(".aboutLink span").addClass("active");
                        break;
                    case 2:
                        page2Scroll.play().timeScale(1);
                        $(".active").removeClass("active");
                        $(".timeLineLink span").addClass("active");
                        break;
                    case 3:
                        page3Scroll.play().timeScale(1).timeScale(1);
                        $(".active").removeClass("active");
                        $(".portfolioLink span").addClass("active");
                        break;
                    case 4:
                        page4Scroll.play().timeScale(1);
                        $(".active").removeClass("active");
                        $(".contactLink span").addClass("active");
                        break;
                    case 5:
                        init();
                        break;
                }

            } else if ((delta < 0 || touchDir === "pandown") && up === true) {
                up = false;
                down = false;

                switch (pageCount) {
                    case 1:
                        init();
                        break;
                    case 2:
                        page1Scroll.reverse().timeScale(1);
                        $(".active").removeClass("active");
                        $(".homeLink span").addClass("active");
                        break;
                    case 3:
                        page2Scroll.reverse().timeScale(1);
                        $(".active").removeClass("active");
                        $(".aboutLink span").addClass("active");
                        break;
                    case 4:
                        page3Scroll.reverse().timeScale(1);
                        $(".active").removeClass("active");
                        $(".timeLineLink span").addClass("active");
                        break;
                    case 5:
                        page4Scroll.reverse().timeScale(1);
                        $(".active").removeClass("active");
                        $(".portfolioLink span").addClass("active");
                        break;
                }

            }
        }

    }


    var delta = 0;
    $("body").on("mousewheel", function (e) {

        delta = e.originalEvent.deltaY
        pageScroll();

    });


    var body = document.getElementById("body");
    var mc = new Hammer(body);
    var touchDir;
    mc.get('pan').set({
        direction: Hammer.DIRECTION_ALL
    });

    // listen to events...
    mc.on(" panup pandown ", function (ev) {

        touchDir = ev.type;

        pageScroll();
    });
    /*--------------------------------------link---------------------------*/
    var $home = $("#home");
    var $intro = $("#intro");
    var $timeline = $("#timeline");
    var $portfolio = $("#portfolio");
    var $contact = $("#contact");
    var homePage = false;
    var introPage = false;
    var timelinePage = false;
    var portfolioPage = false;
    var contactPage = false;

    var circleTl = new TimelineLite({
        onReverseComplete: function () {
            tl.clear()
            $("#index").fadeIn();
        }
    });

    function checkPage() {
        var currTrans1 = $home.css('transform').split(/[()]/)[1];
        var posy1 = currTrans1.split(',')[5];
        var currTrans2 = $intro.css('transform').split(/[()]/)[1];
        var posy2 = currTrans2.split(',')[5];
        var currTrans3 = $timeline.css('transform').split(/[()]/)[1];
        var posy3 = currTrans3.split(',')[5];
        var currTrans4 = $portfolio.css('transform').split(/[()]/)[1];
        var posy4 = currTrans4.split(',')[5];
        var currTrans5 = $contact.css('transform').split(/[()]/)[1];
        var posy5 = currTrans5.split(',')[5];

        if (posy1 < 0 && posy2 < 0 && posy3 < 0 && posy4 < 0 && posy5 < 0) { // in contact page
            homePage = false;
            introPage = false;
            timelinePage = false;
            portfolioPage = false;
            contactPage = true;
            //console.log("contact");
        } else if (posy1 < 0 && posy2 < 0 && posy3 < 0 && posy4 < 0) { // in portafolio page
            homePage = false;
            introPage = false;
            timelinePage = false;
            portfolioPage = true;
            contactPage = false;
            //console.log("port");
        } else if (posy1 < 0 && posy2 < 0 && posy3 < 0) { //in timeline page
            homePage = false;
            introPage = false;
            timelinePage = true;
            portfolioPage = false;
            contactPage = false;
            //console.log("time");

        } else if (posy1 < 0 && posy2 < 0) { // in intro page
            homePage = false;
            introPage = true;
            timelinePage = false;
            portfolioPage = false;
            contactPage = false;
            //console.log("intro");
        } else if (posy1 == 0) {
            homePage = true;
            introPage = false;
            timelinePage = false;
            portfolioPage = false;
            contactPage = false;
            //console.log("home");
        }

    }

    function circle(num) {
        circleTl.to("nav", 0.1, {
                display: "block"

            })
            .to(navT, 0.5, {
                scale: num,
                backgroundColor: "#D1EB0B",
                top: "50%",
                right: "50%"
            })
            .to(navB, 0.5, {
                scale: num,
                backgroundColor: "#fff",
                bottom: "50%",
                left: "50%"
            }, "-=0.3");
    }


    function toHome() {
        if (contactPage) { // in contact page
            page4Scroll.reverse().timeScale(10);
            setTimeout(function () {
                page3Scroll.reverse().timeScale(10);
            }, 200);
            setTimeout(function () {
                page2Scroll.reverse().timeScale(10);
            }, 400);
            setTimeout(function () {
                page1Scroll.reverse().timeScale(10);
            }, 800);

        } else if (portfolioPage) { // in portafolio page
            page3Scroll.reverse().timeScale(10);
            setTimeout(function () {
                page2Scroll.reverse().timeScale(10);
            }, 200);
            setTimeout(function () {
                page1Scroll.reverse().timeScale(10);
            }, 400);
        } else if (timelinePage) { //in timeline page
            page2Scroll.reverse().timeScale(10);
            setTimeout(function () {
                page1Scroll.reverse().timeScale(10);
            }, 600);

        } else if (introPage) { // in intro page
            page1Scroll.reverse().timeScale(10);
        } else if (homePage) {

        }

    }

    function toIntro() {
        if (contactPage) { // in contact page
            page4Scroll.reverse().timeScale(10);
            setTimeout(function () {
                page3Scroll.reverse().timeScale(10);
            }, 200);
            setTimeout(function () {
                page2Scroll.reverse().timeScale(10);
            }, 400);


        } else if (portfolioPage) { // in portafolio page
            page3Scroll.reverse().timeScale(10);
            setTimeout(function () {
                page2Scroll.reverse().timeScale(10);
            }, 200);

        } else if (timelinePage) { //in timeline page
            page2Scroll.reverse().timeScale(10);


        } else if (introPage) { // in intro page

        } else if (homePage) {

            page1Scroll.play().timeScale(10);
        }

    }

    function toTimeline() {
        if (contactPage) { // in contact page
            page4Scroll.reverse().timeScale(10);
            setTimeout(function () {
                page3Scroll.reverse().timeScale(10);
            }, 200);


        } else if (portfolioPage) { // in portafolio page
            page3Scroll.reverse().timeScale(10);

        } else if (timelinePage) { //in timeline page


        } else if (introPage) { // in intro page
            page2Scroll.play().timeScale(10);
        } else if (homePage) {
            page1Scroll.play().timeScale(10);
            setTimeout(function () {
                page2Scroll.play().timeScale(10);
            }, 200);

        }
    }

    function toPortfolio() {
        if (contactPage) { // in contact page
            page4Scroll.reverse().timeScale(10);

        } else if (portfolioPage) { // in portafolio page

        } else if (timelinePage) { //in timeline page
            page3Scroll.play().timeScale(10);


        } else if (introPage) { // in intro page
            page2Scroll.play();
            setTimeout(function () {
                page3Scroll.play().timeScale(10);
            }, 200);
        } else if (homePage) {
            page1Scroll.play().timeScale(10);
            setTimeout(function () {
                page2Scroll.play().timeScale(10);
            }, 400);
            setTimeout(function () {
                page3Scroll.play().timeScale(10);
            }, 600);

        }
    }

    function toContact() {
        if (contactPage) { // in contact page

        } else if (portfolioPage) { // in portafolio page
            page4Scroll.play().timeScale(10);

        } else if (timelinePage) { //in timeline page
            page3Scroll.play().timeScale(10);
            setTimeout(function () {
                page4Scroll.play().timeScale(10);
            }, 200);

        } else if (introPage) { // in intro page
            page2Scroll.play().timeScale(10);
            setTimeout(function () {
                page3Scroll.play().timeScale(10);
            }, 200);
            setTimeout(function () {
                page4Scroll.play().timeScale(10);
            }, 400);
        } else if (homePage) {
            page1Scroll.play().timeScale(10);
            setTimeout(function () {
                page2Scroll.play().timeScale(10);
            }, 200);
            setTimeout(function () {
                page3Scroll.play().timeScale(10);
            }, 400);
            setTimeout(function () {
                page4Scroll.play().timeScale(10);
            }, 600);
        }
    }



    $(".link").click(function () {
        checkPage();
        setFactor();
        circle(factor);
        circleTl.play();
        initLogo();
        $("#index").fadeOut();
        $(".active").removeClass("active");
        setTimeout(function () {
            circleTl.reverse();
        }, 800);


    });

    $(".link").each(function () {
        $(this).click(function () {
            $(this).addClass("active");
        })
    });

    $(".homeLink").click(function () {
        
        setTimeout(function () {
            toHome();
        }, 400);

    });


    $(".aboutLink").click(function () {
        setTimeout(function () {
            toIntro();
        }, 400);

    });
    $(".timeLineLink").click(function () {

        setTimeout(function () {
            toTimeline();
        }, 400);


    });
    $(".portfolioLink").click(function () {
        setTimeout(function () {
            toPortfolio();
        }, 400);

    });
    $(".contactLink").click(function () {
        setTimeout(function () {
            toContact();
        }, 400);
    });
    
    
    
    //--------htm page transition----------------
    $(".navLink").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(500, redirectPage);      
    });
         
    function redirectPage() {
        window.location = linkLocation;
    }


}); //-------($function)
