$(function () {
    var hour = 0;
    var min = 0;
    var sec = 0;
    var total = 0;
    var countdown;
    var update = false;
    var pause = true;
    var sessionRun = false;
    var breakRun = false;
    var running = false; //check the timer is running or not
    var session = 1;
    var breaking = 1;



    //draw in canvas
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, 800, 0);
    grd.addColorStop("0", "#FFD800");
    grd.addColorStop("1", "#FF7F00");
    ctx.lineWidth = 20;
    ctx.strokeStyle = grd;
    ctx.lineCap = "round";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#FECA47";
    //function
    function toRadius(deg) {
        var factor = 2 * Math.PI / 360;

        return deg * factor;
    }

    function shape() {
        //get time
        hour = Math.floor(total / 3600);
        min = Math.floor(total / 60) - hour * 60;
        sec = total - 60 * min - 3600 * hour;

        if (total < 0) {
            hour = 0;
            min = 0;
            sec = 0;
        }

        hour < 10 && hour >= 0 ? hour = "0" + hour : hour = hour;
        min < 10 && min >= 0 ? min = "0" + min : min = min;
        sec < 10 && sec >= 0 ? sec = "0" + sec : sec = sec;



        //draw background
        var grd = ctx.createRadialGradient(400, 400, 5, 400, 400, 200);
        grd.addColorStop(0, "#F28140");
        grd.addColorStop(1, "#CC0033");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 800, 800);

        //mono
        
        var foto=session%7;
        $("#human").attr("src","image/human"+foto+".png");
        if(running===false){ 
         var img = document.getElementById("human");
           ctx.drawImage(img,360,360);
           }else  if(sessionRun===true || running===false){
            var img = document.getElementById("human");
           ctx.drawImage(img,360,360);
           }else if(breakRun===true){
                var img = document.getElementById("storm"); 
               ctx.drawImage(img,360,360);
                    }
        
        //draw hour   
        ctx.beginPath();
        ctx.arc(400, 400, 250, toRadius(360 - 90), toRadius(hour * 15 - 90));
        ctx.stroke();

        //draw min   
        ctx.beginPath();
        ctx.arc(400, 400, 180, toRadius(360 - 90), toRadius(min * 6 - 90));
        ctx.stroke();

        //draw sec   
        ctx.beginPath();
        ctx.arc(400, 400, 110, toRadius(360 - 90), toRadius(sec * 6 - 90));
        ctx.stroke();



        $("#timer").text(hour + " : " + min + " : " + sec);
        /*//show hour
        ctx.font = "20px orbitron";
        ctx.fillStyle = "#fff";
        ctx.fillText(hour + ":", 345, 250);
        //show min
        ctx.font = "20px orbitron";
        ctx.fillStyle = "#fff";
        ctx.fillText(min + ":", 385, 250);
        //show sec
        ctx.font = "20px orbitron";
        ctx.fillStyle = "#fff";
        ctx.fillText(sec, 425, 250);*/
    }

    function init() {
        
        min = $("#sTime").val();
        total = min * 60;
        shape();
        $("#start").text("Start");
        $("#showSession").text("Pomodoro clock");
        position("#showSession");
        position("#timer");
        $("#sTime").fadeIn();
        $("#bTime").fadeIn();
        $("#sMin").fadeOut();
        $("#bMin").fadeOut();
        
    }

    function draw() {


        if (update === true) {
            min = $("#sTime").val();
            total = min * 60;
            update = false
        }

        if (total > 0) {
            sessionRun = true;
            $("#showSession").text("session " + session);
            position("#showSession");
            shape();
            total--
            update = false;
            
        }

        if (sessionRun === false && breakRun === false && running === true) {
            reset();
        } // if seesion time and break time both is 0,reset the timer
        else if (total <= 0) {
            sessionRun = false;
            clearInterval(countdown);
            countdown = null;
            update = true;
            session++;
            countdown = setInterval(breakTime, 1000);

        }

    }
    //-------------------breaktime function--------------------------
    function breakTime() {



        if (update === true) {
            min = $("#bTime").val();
            total = min * 60;
            update = false;
            console.log("break");

        }

        if (total > 0) {
            breakRun = true;
            $("#showSession").text("break " + breaking);
            position("#showSession");
            shape();
            total--
            update = false;
        }
        if (sessionRun === false && breakRun === false && running === true) {
            reset();
        } else if (total <= 0) {
            clearInterval(countdown);
            breaking++;
            countdown = null;
            breakRun = false;
            countdown = setInterval(draw, 1000);
            update = true;
        }


    }
    //--------------------------start function------------------------------------
    function start() {
        createjs.Sound.stop();
        var time = $("#sTime").val();
        var bTime = $("#bTime").val();
        if (time >= 0) {
            $("#sTime,#bTime").hide();
            $("#sMin").fadeIn().text(time);
            $("#bMin").fadeIn().text(bTime);

            if ((pause === true && sessionRun === true) || (running === false)) { //when timer is paused during counting session time or when the first time the timer is loaded or reseted
                countdown = setInterval(draw, 1000);
                $("#start").text("Pause");
                pause = false;
                running = true;
            } else if (pause === true && breakRun === true) { // when timer is paused during is counting break time
                countdown = setInterval(breakTime, 1000);
                $("#tart").text("Pause");
                pause = false;
            } else if (pause === false) { // when is counting
                clearInterval(countdown);
                countdown = null;
                $("#start").text("continue");
                pause = true;

            }
        }

    }

    //--------------------------reset function------------------------------------ 
    function reset() {
        $("#sTime").val(0);
        $("#bTime").val(0);
        clearInterval(countdown);
        countdown = null;
        pause = true;
        update = false;
        sessionRun = false;
        breakRun = false;
        running = false;
        session=1;
        breaking=1;
        foto=1;
        init();
    }
    //--------------plus and minus function-------------------------
    function sPlus() {
        var time = Number($("#sTime").val());
        time += 1;
        $("#sTime").val(time);
        $("#sMin").text(time);

        if (sessionRun === false && breakRun === false) { // before start
            total += 60;
            shape();
            update = true;
        }
        if (sessionRun === true && breakRun === false) {
            total += 60;
            shape();
        }

    }

    function sMinus() {
        var time = Number($("#sTime").val());
        if (time > 0) {
            time -= 1;
            $("#sTime").val(time);
            $("#sMin").text(time);
            if (sessionRun === false && breakRun === false) {
                update = true;
                total -= 60;
                shape();
            }
            if (sessionRun === true && breakRun === false) {
                total -= 60;
                shape();
            }
        }

    }

    function bPlus() {
        var time = Number($("#bTime").val());
        time += 1;
        $("#bTime").val(time);
        $("#bMin").text(time);

        if (breakRun === true && sessionRun === false) {
            total += 60;
            shape();
        }


    }

    function bMinus() {
        var time = Number($("#bTime").val());
        if (time > 0) {
            time -= 1;
            $("#bTime").val(time);
            $("#bMin").text(time);

            if (breakRun === true && sessionRun === false) {
                total -= 60;
                shape();
            }
        }

    }
    
    function skip(){
        $("#animation_container").fadeOut();
        $("#pomodoro").fadeIn(function(){
            init();
            $("#skip").fadeOut();
            position("#timer");
          position("#showSession");
            createjs.Sound.stop();
        });
    }
    //---------------------event handler--------------------------
    init();
    $("#sTime").keyup(function () {
        update = true;
        init();
    });

    $("#sTime").on("focus", function () {
        var time = $("#sTime").val();
        if (time == 0) {
            $("#sTime").val("");
        }

    });
    $("#sTime").on("blur", function () {
        var time = $("#sTime").val();
        if (time == "") {
            $("#sTime").val("0");
        }
    });

    $("#bTime").on("focus", function () {
        var time = $("#bTime").val();
        if (time == 0) {
            $("#bTime").val("");
        }

    });
    $("#bTime").on("blur", function () {
        var time = $("#bTime").val();
        if (time == "") {
            $("#bTime").val("0");
        }
    });

    $("#start").click(start);
    $("#reset").click(reset);
    $("#sPlus").click(sPlus);
    $("#sMinus").click(sMinus);
    $("#bPlus").click(bPlus);
    $("#bMinus").click(bMinus);
    $("#skip").click(skip);

    //----------------------timer position-----------------
    function position(ele) {
        var wWidth = $(window).width();
        var width = $(ele).width();
        if(width>wWidth){
           width=wWidth;
           }
        var center = (wWidth - width) / 2;
        $(ele).css("left", center);
    }

    position("#timer");
    position("#showSession");
    $(window).resize(function () {
        position("#timer");
        position("#showSession");
        position("#animation_container");
        positionH("#animation_container");
        position("#toClock");
        positionH("#toClock");
    });

    function positionH(ele){
        var height=$(ele).height();
        var wHeight=$(window).height();
        var center=(wHeight-height)/2;
       $(ele).css("top",center);
        
    }
    
    
   
    positionH("#animation_container");
    position("#animation_container");
    position("#toClock");
    positionH("#toClock");
   
    
});

