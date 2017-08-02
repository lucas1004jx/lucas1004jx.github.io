$(function () {
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    var wWidth = $(window).width();
    var wHeight = $(window).height();
    canvas.width = 400;
    canvas.height = 400;
    var ratio = canvas.width / canvas.height;
    var radius;
    var bingo = false;
    var levelUp = false;
    var computerPlay = true;
    var gameBegin = false; // contro start btn ,before game begin show "start", afer game begins shows "restart"
    var beginBtn = true; //disable the btn when the text is changing
    var strict = false;
    var powerOn = false; //control power button,and intro animation
    var intro = false; // when intro animation is on, can´t turn off the power
    var tl = new TimelineLite();
    var tlOn = new TimelineLite();
    var tlOff = new TimelineLite();
    var tlBg = new TimelineLite();


    //-------------------creat audio-------------------------------
    var audioError = new Howl({
        src: ["sounds/error.wav"]
    });
    var audioWin = new Howl({
        src: ["sounds/win.wav"]
    });
    var audioIntro = new Howl({
        src: ["sounds/intro.wav"]
    });
    var audioMode = new Howl({
        src: ["sounds/mode.wav"]
    });
    var audioIntro0 = new Howl({
        src: ["sounds/intro0.wav"]
    });
    var audioOff = new Howl({
        src: ["sounds/off.wav"]
    });
    
    winSound();
    //----------------canvas size---------------------
    function canvasSize() {
        if (wWidth <= wHeight) {
            if (wWidth <= 400) {

                canvas.width = 300;
                radius = 130;
                canvas.height = canvas.width / ratio;
                $("#main").css("width", wWidth);
                $("#main").css("height", canvas.height);
            } else {
                canvas.width = 400;
                radius = 170;
                canvas.height = canvas.width / ratio;
                $("#main").css("width", wWidth);
                $("#main").css("height", canvas.height);
            }
        } else {
            if (wHeight <= 400) {
                canvas.height = 300;
                radius = 130;
                canvas.width = canvas.height / ratio;
                $("#main").css("width", wWidth);
                $("#main").css("height", canvas.height);
            } else {
                canvas.height = 400;
                radius = 170;
                canvas.width = canvas.height / ratio;
                $("#main").css("width", wWidth);
                $("#main").css("height", canvas.height);
            }
        }


    }


    canvasSize();

    $(window).resize(function () {
        wWidth = $(window).width();
        wHeight = $(window).height();
        $("#main").css("width", wWidth);
    });

    //$("#canvas").css("border", "2px solid black");
    //$("#canvas").css("background", "transparent");

    function toDeg(deg) {
        return Math.PI * 2 / 360 * deg;
    }

    function quarter(deg0, deg1, color0, color1) {
        var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, radius - 35, canvas.width / 2, canvas.height / 2, radius + 20);
        grd.addColorStop(0, color0);
        grd.addColorStop(1, color1);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, deg0, deg1);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);

        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.stroke();
    }



    function light(deg0, deg1, color0, color1, sound) {
        var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, radius - 35, canvas.width / 2, canvas.height / 2, radius + 40);
        grd.addColorStop(0, color0);
        grd.addColorStop(1, color1);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius + 40, deg0, deg1);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.lineWidth = 20;
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0)";
        ctx.stroke();


        var audio = new Howl({
            src: ["sounds/" + sound + ".wav"]
        });
        audio.play();
        circle();
    }

    //---------------------------fondo-------------
    function fondo() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, toDeg(0), toDeg(380));
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#000";
        ctx.stroke();
    }
    //----------------------------------center -circle------------------------
    function circle() {
        var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 5, canvas.width / 2, canvas.height / 2, 45);
        grd.addColorStop(0, "#f4d0b8");
        grd.addColorStop(0.7, "#d11111");
        grd.addColorStop(1, "#79051e");
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 45, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0)";
        ctx.stroke();
    }

    function circleDark() {
        //draw dark circle---------
        var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 5, canvas.width / 2, canvas.height / 2, 45);
        grd.addColorStop(0, "#5a5451");
        grd.addColorStop(0.7, "#520707");
        grd.addColorStop(1, "#1f0309");
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 45, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0)";
        ctx.stroke();
    }


    //------------------green--------------------
    var greenDeg0 = toDeg(181);
    var greenDeg1 = toDeg(-91);
    var greenColor0 = "rgb(151, 255, 113)";
    var greenColor1 = "rgba(32, 69, 30, 0)";

    function green() {
        greenDeg0 = toDeg(181);
        greenDeg1 = toDeg(-91);
        greenColor0 = "rgb(151, 255, 113)";
        greenColor1 = "rgba(32, 69, 30, 0)";
        quarter(greenDeg0, greenDeg1, greenColor0, greenColor1);

    }

    function greenDark() {
        greenDeg0 = toDeg(181);
        greenDeg1 = toDeg(-91);
        greenColor0 = "rgb(66, 139, 39)";
        greenColor1 = "rgba(32, 69, 30, 0)";
        quarter(greenDeg0, greenDeg1, greenColor0, greenColor1);
    }

    function greenLight() {
        greenDeg0 = toDeg(181);
        greenDeg1 = toDeg(-91);
        greenColor0 = "rgb(151, 255, 113)";
        greenColor1 = "rgba(32, 69, 30, 0)";
        light(greenDeg0, greenDeg1, greenColor0, greenColor1, a);

    }


    //--------------------red-----------------
    var redDeg0 = toDeg(-89);
    var redDeg1 = toDeg(-1);
    var redColor0 = "rgb(255, 102, 6)";
    var redColor1 = "rgba(75, 36, 3, 0)";

    function red() {
        redDeg0 = toDeg(-89);
        redDeg1 = toDeg(-1);
        redColor0 = "rgb(255, 102, 6)";
        redColor1 = "rgba(75, 36, 3, 0)";
        quarter(redDeg0, redDeg1, redColor0, redColor1);
    }

    function redDark() {
        redDeg0 = toDeg(-89);
        redDeg1 = toDeg(-1);
        redColor0 = "rgb(147, 61, 7)";
        redColor1 = "rgba(75, 36, 3, 0)";
        quarter(redDeg0, redDeg1, redColor0, redColor1);
    }

    function redLight() {
        redDeg0 = toDeg(-89);
        redDeg1 = toDeg(-1);
        redColor0 = "rgb(255, 102, 6)";
        redColor1 = "rgba(75, 36, 3, 0)";
        light(redDeg0, redDeg1, redColor0, redColor1, b);

    }


    //--------------------blue------------------
    var blueDeg0 = toDeg(1);
    var blueDeg1 = toDeg(89);
    var blueColor0 = "rgb(0, 145, 252)";
    var blueColor1 = "rgba(7, 33, 82, 0)";

    function blue() {
        blueDeg0 = toDeg(1);
        blueDeg1 = toDeg(89);
        blueColor0 = "rgb(0, 145, 252)";
        blueColor1 = "rgba(7, 33, 82, 0)";
        quarter(blueDeg0, blueDeg1, blueColor0, blueColor1);
    }

    function blueDark() {
        blueDeg0 = toDeg(1);
        blueDeg1 = toDeg(89);
        blueColor0 = "rgb(7, 75, 126)";
        blueColor1 = "rgba(7, 33, 82, 0)";
        quarter(blueDeg0, blueDeg1, blueColor0, blueColor1);
    }

    function blueLight() {
        blueDeg0 = toDeg(1);
        blueDeg1 = toDeg(89);
        blueColor0 = "rgb(0, 145, 252)";
        blueColor1 = "rgba(7, 33, 82, 0)";
        light(blueDeg0, blueDeg1, blueColor0, blueColor1, c);

    }


    //--------------------yellow------------------
    var yellowDeg0 = toDeg(91);
    var yellowDeg1 = toDeg(179);
    var yellowColor0 = "rgb(247, 247, 0)";
    var yellowColor1 = "rgba(65, 65, 4, 0)";

    function yellow() {
        yellowDeg0 = toDeg(91);
        yellowDeg1 = toDeg(179);
        yellowColor0 = "rgb(247, 247, 0)";
        yellowColor1 = "rgba(65, 65, 4, 0)";
        quarter(yellowDeg0, yellowDeg1, yellowColor0, yellowColor1);
    }

    function yellowDark() {
        yellowDeg0 = toDeg(91);
        yellowDeg1 = toDeg(179);
        yellowColor0 = "rgb(95, 95, 6)";
        yellowColor1 = "rgba(65, 65, 4, 0)";
        quarter(yellowDeg0, yellowDeg1, yellowColor0, yellowColor1);
    }

    function yellowLight() {
        yellowDeg0 = toDeg(91);
        yellowDeg1 = toDeg(179);
        yellowColor0 = "rgb(247, 247, 0)";
        yellowColor1 = "rgba(65, 65, 4, 0)";
        light(yellowDeg0, yellowDeg1, yellowColor0, yellowColor1, d);

    }

    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fondo();
        green();
        red();
        blue();
        yellow();
        circle();
    }
    //-------------------------turn off------------------------
    function turnOff() {
        fondo();
        greenDark();
        redDark();
        blueDark();
        yellowDark();
        circleDark();
        $("#start,#strict").attr("disabled", true);
        $("#info").text("");
    }

    function turnOn() {
        setTimeout(function () {
            green();
            light(greenDeg0, greenDeg1, greenColor0, greenColor1, e);
        }, 100);
        setTimeout(function () {
            draw();
            redDark();
            blueDark();
            yellowDark();
            circle();
        }, 600);
        setTimeout(function () {
            red();
            light(redDeg0, redDeg1, redColor0, redColor1, e);
        }, 1300);
        setTimeout(function () {
            draw();
            blueDark();
            yellowDark();
            circle();
        }, 1800);
        setTimeout(function () {
            blue();
            light(blueDeg0, blueDeg1, blueColor0, blueColor1, e);
        }, 2300);
        setTimeout(function () {
            draw();
            yellowDark();
            circle();
        }, 2800);
        setTimeout(function () {
            yellow();
            light(yellowDeg0, yellowDeg1, yellowColor0, yellowColor1, e);
        }, 3300);
        setTimeout(function () {
            draw();

        }, 3800);

    }
    var blur;//blur
    var br;//brightness

    function bgFadeIn() {
        blur = 5;
        br = 40;
        tlBg.to("#background", 2, {
            onUpdate: function () {
                TweenLite.set("#background", {
                    webkitFilter: "blur(" + blur + "px)",
                    webkitFilter: "brightness(" + br + "%)"
                });
                blur = blur * 0.99;
                br = br * 1.01;

            }
        });
        
        
    }

    function bgFadeOut() {
        blur = 1;
        br = 130;
        tlBg.to("#background", 2, {
            onUpdate: function () {
                TweenLite.set("#background", {
                    webkitFilter: "blur(" + blur + "px)",
                    webkitFilter: "brightness(" + br + "%)"
                });
                blur = blur * 1.01;
                br = br * 0.99;

            }
        });
    }

    function falied() {
        greenLight();
        redLight();
        blueLight();
        yellowLight();

    }
    //---------------------------------time line ----------------------------------
    function timeLine() {
        tl.fromTo("#info", 1, {
                opacity: 0,
                y: -60,
                fontSize: 10
            }, {
                opacity: 1,
                y: 0,
                color: "rgb(57, 255, 1)",
                fontSize: 18
            })
            .to("#info", 1, {
                opacity: 0,
                y: -60,
                color: "#fff",
                onComplete: function () {
                    if (powerOn) {
                        levelText();
                    }
                }
            }, "+=0.5")
            .to("#info", 1, {
                opacity: 1,
                y: 0,
                fontSize: 18,
                onComplete: function () {
                    if (powerOn) {
                        random();
                    }
                }
            })
            .to(".btn-default", 1, {
                onComplete: function () {
                    if (powerOn) { //if turn off the power, wiil shut down everything
                        $("#start,#strict").attr("disabled", false);
                        beginBtn = true;
                    } else {
                        $("#info").text("");
                    }
                }
            });
    }
    //-----------------------detect mobile device----------------
    function isMobile() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }
    //------------------------detect button area---------------
    canvas.addEventListener("mousemove", function () {
        var areaDetection = Math.pow(canvas.width / 2 - mouse.x, 2) + Math.pow(canvas.height / 2 - mouse.y, 2);
        if (areaDetection <= Math.pow(radius, 2)) {
            $("#canvas").css("cursor", "pointer");
        } else {
            $("#canvas").css("cursor", "auto");
        }
    }, false);

    var a = "a"; //sound name
    var b = "b";
    var c = "c";
    var d = "d";
    var e = "e";
    var current = [];




    function detect() {

        var areaDetection = Math.pow(canvas.width / 2 - mouse.x, 2) + Math.pow(canvas.height / 2 - mouse.y, 2);
        if (computerPlay === false) {
            if (areaDetection <= Math.pow(radius, 2) && areaDetection >= Math.pow(40, 2)) {
                if (mouse.x < canvas.width / 2 && mouse.y < canvas.height / 2) {
                    greenLight();
                    current.push(0);
                } else if (mouse.x < canvas.width && mouse.y < canvas.height / 2) {
                    redLight();
                    current.push(1);
                } else if (mouse.x < canvas.width / 2 && mouse.y > canvas.height / 2) {
                    yellowLight();
                    current.push(3);
                } else if (mouse.x < canvas.width && mouse.y > canvas.height / 2) {
                    blueLight();
                    current.push(2);
                }
            }


            for (var i = 0; i < current.length; i++) {

                if (current[i] === original[i] && current.length === original.length) {

                    bingo = true;

                } else if (current[i] !== original[i]) {

                    audioError.play();
                    bingo = false;
                    reset();
                    falied();
                    if (strict) {
                        level = 1;
                    }
                    beginBtn = false;
                    $("#start,#strict").attr("disabled", true);
                    $("#info").text("Failed");
                    timeLine();
                    break;
                }
            }

            if (bingo) {
                level++;
                reset();
                setTimeout(winSound, 500);
                levelUp = true;
            } else {
                levelUp = false;
            }

            if (levelUp) {
                beginBtn = false;
                $("#start,#strict").attr("disabled", true);
                $("#info").text("Level Up");
                timeLine();

            }
        }


    }

    function levelText() {
        $("#info").text("Level " + " " + level);
    }




    function winSound() {
        audioWin.play();
    }




    function introSound() {
        audioIntro.play();
    }

    //-------------------------------------reset--------------------------------------------
    function reset() {
        current = [];
        original = [];
        count = 0;
        levelUp = false;
        computerPlay = true;
        bingo = false;

    }

    var mouse = {
        x: undefined,
        y: undefined
    }

    if (!isMobile()) {

        canvas.addEventListener("mousemove", function (e) {
            if (!powerOn) {
                $('[data-toggle="tooltip"]').tooltip("show");
            } else {
                $('[data-toggle="tooltip"]').tooltip("hide");
            }
            mouse.x = e.offsetX;
            mouse.y = e.offsetY;
        }, false);
        canvas.addEventListener("mousedown", function () {
            if (powerOn && !intro) {

                detect();
            }
        }, false);

        canvas.addEventListener("mouseup", function () {
            if (powerOn && !intro) {
                draw();
            }

        }, false);
    } else {


        canvas.addEventListener("touchstart", function (e) {
            mouse.x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
            mouse.y = e.touches[0].pageY - $("#main")[0].offsetTop;
            if (powerOn && !intro) {
                detect();
                $('[data-toggle="tooltip"]').tooltip("hide");
            } else if(!powerOn) {
                $('[data-toggle="tooltip"]').tooltip("show");
            }

        }, false);

        canvas.addEventListener("touchend", function () {
            if (powerOn && !intro) {
                draw();
            }
        }, false);

    }



    //---------------main function----------

    var randomLight = [greenLight, redLight, blueLight, yellowLight];
    var original = [];
    var count = 0;
    var level = 1;


    function random() {
        if (gameBegin) {
            computerPlay = true;
            var num = Math.floor(Math.random() * 4);
            original.push(num);
            setTimeout(function () {
                randomLight[num]();
            }, 800);

            setTimeout(function () {
                if(powerOn){
                   ctx.clearRect(0, 0, canvas.width, canvas.height);
                draw();
                count++;
                computerPlay = false;
                if (count < level) {
                    random();
                }
                   }else if(!powerOn){
                       ctx.clearRect(0, 0, canvas.width, canvas.height);
                          turnOff();  
                            }
                
            }, 1200);
        }
    }

    function start() {
        if (gameBegin === false && beginBtn == true && powerOn === true) {
            gameBegin = true;
            beginBtn = false;
            introSound();
            $("#start,#strict").attr("disabled", true);
            $("#start").text("Restart");
            $("#info").text("Begin");
            timeLine();
        } else if (gameBegin === true && beginBtn === true && powerOn === true) {
            reset();
            beginBtn = false;
            introSound();
            $("#start,#strict").attr("disabled", true);
            level = 1;
            $("#info").text("Start Over");
            timeLine();
        }
    }


    turnOff();

    $("#start").click(start);



    $("#strict").click(function () {
        strict = !strict;

        audioMode.play();
        if (strict) {
            $("#mode").text("Strict Mode");
        } else {
            $("#mode").text("Normal mode");
        }
    });

    //--------------------power btn---------------------------------------------


    $("#powerIcon").click(function () {
        if (powerOn === false && intro === false) {
            powerOn = true;
            intro = true;
            audioIntro0.play();
            setTimeout(function () {
                intro = false;
            }, 5000);
            bgFadeIn();
            tlOn.to("#powerBtn", 0.3, {
                    x: 30
                })
                .to("#powerIcon", 1, {
                    background: "#0091fc",
                    onStart: function () {
                        turnOn();
                    }
                }, "-=0.3")
                .to("#mode", 1, {
                    opacity: 0,
                    y: -60,
                    onComplete: function () {
                        $("#mode").text("Normal mode");
                    }
                }, "+=1")
                .to("#mode", 1, {
                    opacity: 1,
                    y: 0,
                    ease: Bounce.easeOut,
                }, "+=1.5")
                .to("#mode", 1, {
                    onComplete: function () {
                        start();
                        $("#start,#strict").attr("disabled", false);
                    }
                }, "+=0.5");


        } else if (powerOn === true && intro === false) { //---turn off-----------------
            powerOn = false;
            gameBegin = false;
            reset();
            beginBtn = true;
            level = 1;
            $("#start").text("Start");
            $("#start,#strict").attr("disabled", true);

            audioOff.play();
            bgFadeOut();
            tlOff.to("#powerBtn", 0.4, {
                    x: 0
                })
                .to("#powerIcon", 1, {
                    background: "#463c45",
                    onStart() {
                        turnOff();
                    }
                }, "-=0.3")
                .to("#mode", 0.3, {
                    opacity: 0,
                    y: -50,
                    onComplete: function () {
                        $("#mode").text("simon game");
                    }
                }, "-=1")
                .to("#mode", 0.5, {
                    opacity: 1,
                    y: 0
                }, "-=0.5");

        }

    }); //--------power click


    //--------initialize menu
    var controller = new slidebars();
    controller.init();
    $('.menu').on('click', function (event) {
        // Stop default action and bubbling
        event.stopPropagation();
        event.preventDefault();

        // Toggle the Slidebar with id 'id-1'
        controller.toggle('id-1');
    });
    $("#body").click(function () {
        controller.close('id-1');
    });


});
