$(function () {

    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    var wWidth = window.innerWidth;
    var wHeight = window.innerHeight;
    canvas.width = 400;
    canvas.height = 400;;
    var ratio = canvas.width / canvas.height;
    var circle = false; // control who go first,and prevent draw function when one player win
    var aspa = true; //by default player choose X
    var move = 0;
    var ganar = false; //to control empate
    var empate = false;
    var playerX = true; // by default player play X
    var playerMove = true; // control when the ai draw, the player can´t  draw
    var gameStart = false; // only can draw when the grid animation complete
    var draw = [d1, d2, d3, d4, d5, d6, d7, d8, d9];
    var oScore = 0; //count circle score
    var xScore = 0; // count x score
    var ocupiedO = [],
        ocupiedX = [];
    for (var i = 0; i < 9; i++) {
        ocupiedO[i] = false;
        ocupiedX[i] = false;
    }

    //make canvas size responsible according to the window-------
    function canvasSize() {
        if (wWidth <= wHeight) {
            if (wWidth <= 400) {
                canvas.width = wWidth;
                canvas.height = canvas.width / ratio;
            } else {
                canvas.width = 400;
                canvas.height = canvas.width / ratio;
            }
        } else {
            if (wHeight <= 400) {
                canvas.height = wHeight;
                canvas.width = canvas.height / ratio;
            } else {
                canvas.height = 400;
                canvas.width = canvas.height / ratio;
            }
        }

        if (wWidth >= 320 && wWidth <= 414) {
            canvas.width = 300;
            canvas.height = canvas.width / ratio;
        }
    }


    canvasSize();
    $("#end").css({
        width: canvas.width,
        height: canvas.height
    })

    $("#main").css({
        width: canvas.width,
        height: canvas.height
    });

    //draw grid-----------------
    var x = 0,
        y = 0,
        dx = 5,
        dy = 5;

    function animate() {
        if (y >= canvas.height) {
            gameStart = true; // only can draw when the grid animation complete
            $("#ai").fadeIn();
            return;
        }
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, wWidth, wHeight);
        for (var i = 1; i <= 2; i++) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width / 3 * i, 0);
            ctx.lineTo(canvas.width / 3 * i, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 3 * i);
            ctx.lineTo(x, canvas.height / 3 * i);
            ctx.stroke();
        }


        y += dy;
        x += dx;
    }

    //animate();

    function toDeg(deg) {
        return Math.PI * 2 / 360 * deg;
    }

    var deg = 0;
    var degV = 20;
    var x1, x2, y1, y1 = 0;


    function draw1() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[0] === false && ocupiedX[0] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[0] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw1);
                ctx.clearRect(0, 0, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 0, canvas.width / 3 / 2, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;



            } else if (aspa === true) {
                if (x1 > canvas.width / 3 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[0] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw1);
                ctx.clearRect(0, 0, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40, 40);
                ctx.lineTo(x1, y1);
                //ctx.lineTo(canvas.width/3-40,canvas.height/3-40);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 - 40, 40);
                ctx.lineTo(x2, y2);
                //ctx.lineTo(40,canvas.height/3-40);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;


            }

        }

    } //---------function draw1------------------

    function draw2() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[1] === false && ocupiedX[1] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[1] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw2);
                ctx.clearRect(canvas.width / 3 + 5, 0, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 1, canvas.width / 3 / 2, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 * 2 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[1] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw2);
                ctx.clearRect(canvas.width / 3 + 5, 0, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40 + canvas.width / 3, 40);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 * 2 - 40, 40);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }

        }


    } //--------function draw2------------------

    function draw3() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[2] === false && ocupiedX[2] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[2] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw3);
                ctx.clearRect(canvas.width / 3 * 2 + 5, 0, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 2, canvas.width / 3 / 2 + canvas.height / 3 * 0, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 * 3 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[2] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw3);
                ctx.clearRect(canvas.width / 3 * 2 + 5, 0, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40 + canvas.width / 3 * 2, 40);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 * 3 - 40, 40);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }

        }


    } //---------function draw3---------------

    function draw4() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[3] === false && ocupiedX[3] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[3] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw4);
                ctx.clearRect(0, canvas.height / 3 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 0, canvas.width / 3 / 2 + canvas.height / 3 * 1, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[3] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw4);
                ctx.clearRect(0, canvas.height / 3 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40, 40 + canvas.height / 3);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 - 40, 40 + canvas.height / 3);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }

        }


        x = 0;
        y = 0;
        win();
    } //---------------function draw4-----------------------

    function draw5() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[4] === false && ocupiedX[4] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[4] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw5);
                ctx.clearRect(canvas.width / 3 + 5, canvas.height / 3 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 1, canvas.width / 3 / 2 + canvas.height / 3 * 1, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 * 2 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[4] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw5);
                ctx.clearRect(canvas.width / 3 + 5, canvas.height / 3 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40 + canvas.width / 3, 40 + canvas.height / 3);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 * 2 - 40, 40 + canvas.height / 3);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }

        }



    } //-----------function draw5-------------

    function draw6() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[5] === false && ocupiedX[5] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[5] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw6);
                ctx.clearRect(canvas.width / 3 * 2 + 5, canvas.height / 3 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 2, canvas.width / 3 / 2 + canvas.height / 3 * 1, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 * 3 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[5] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw6);
                ctx.clearRect(canvas.width / 3 * 2 + 5, canvas.height / 3 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40 + canvas.width / 3 * 2, 40 + canvas.height / 3);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 * 3 - 40, 40 + canvas.height / 3);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }
        }


    } //-----------function draw6-------------------

    function draw7() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[6] === false && ocupiedX[6] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[6] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw7);
                ctx.clearRect(0, canvas.height / 3 * 2 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 0, canvas.width / 3 / 2 + canvas.height / 3 * 2, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[6] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw7);
                ctx.clearRect(0, canvas.height / 3 * 2 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40, 40 + canvas.height / 3 * 2);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 - 40, 40 + canvas.height / 3 * 2);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }

        }


    } //---------function draw7------------------

    function draw8() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[7] === false && ocupiedX[7] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[7] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw8);
                ctx.clearRect(canvas.width / 3 + 5, canvas.height / 3 * 2 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 1, canvas.width / 3 / 2 + canvas.height / 3 * 2, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 * 2 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[7] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw8);
                ctx.clearRect(canvas.width / 3 + 5, canvas.height / 3 * 2 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40 + canvas.width / 3, 40 + canvas.height / 3 * 2);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 * 2 - 40, 40 + canvas.height / 3 * 2);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }
        }



    } //------------function draw8----------------

    function draw9() {
        $("#circle").attr("disabled", true);
        $("#x").attr("disabled", true);
        if (ocupiedO[8] === false && ocupiedX[8] === false) {
            if (circle === true) {
                if (deg >= 381) {
                    move++;
                    circle = false;
                    aspa = true;
                    ocupiedO[8] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw9);
                ctx.clearRect(canvas.width / 3 * 2 + 5, canvas.height / 3 * 2 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.arc(canvas.width / 3 / 2 + canvas.width / 3 * 2, canvas.width / 3 / 2 + canvas.height / 3 * 2, 30, 0, toDeg(deg));
                ctx.stroke();
                deg += degV;
            } else if (aspa === true) {
                if (x1 > canvas.width / 3 * 3 - 35) {
                    move++;
                    aspa = false;
                    circle = true;
                    ocupiedX[8] = true;
                    x = 0;
                    y = 0;
                    cx = canvas.width;
                    cy = 0;
                    win();
                    return;
                }
                requestAnimationFrame(draw9);
                ctx.clearRect(canvas.width / 3 * 2 + 5, canvas.height / 3 * 2 + 5, canvas.width / 3 - 10, canvas.height / 3 - 10);
                ctx.beginPath();
                ctx.strokeStyle = "rgb(51,51,51)";
                ctx.moveTo(40 + canvas.width / 3 * 2, 40 + canvas.height / 3 * 2);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                x1 += dx;
                y1 += dy;

                ctx.beginPath();
                ctx.moveTo(canvas.width / 3 * 3 - 40, 40 + canvas.height / 3 * 2);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                x2 -= dx;
                y2 += dy;
            }

        }


    } //---------function draw9-------------

    function d1() {
        deg = 0;
        x1 = 40;
        y1 = 40;
        x2 = canvas.width / 3 - 40;
        y2 = 40;
        dx = 5;
        dy = 5;
        draw1();
    }

    function d2() {
        deg = 0;
        x1 = 40 + canvas.width / 3;
        y1 = 40;
        x2 = canvas.width / 3 * 2 - 40;
        y2 = 40;
        dx = 5;
        dy = 5;
        draw2();
    }

    function d3() {
        deg = 0;
        x1 = 40 + canvas.width / 3 * 2;
        y1 = 40;
        x2 = canvas.width / 3 * 3 - 40;
        y2 = 40;
        dx = 5;
        dy = 5;
        draw3();
    }

    function d4() {
        deg = 0;
        x1 = 40;
        y1 = 40 + canvas.height / 3;
        x2 = canvas.width / 3 - 40;
        y2 = 40 + canvas.height / 3;
        dx = 5;
        dy = 5;
        draw4();
    }

    function d5() {
        deg = 0;
        x1 = 40 + canvas.width / 3;
        y1 = 40 + canvas.height / 3;
        x2 = canvas.width / 3 * 2 - 40;
        y2 = 40 + canvas.height / 3;
        dx = 5;
        dy = 5;
        draw5();
    }

    function d6() {
        deg = 0;
        x1 = 40 + canvas.width / 3 * 2;
        y1 = 40 + canvas.height / 3;
        x2 = canvas.width / 3 * 3 - 40;
        y2 = 40 + canvas.height / 3;
        dx = 5;
        dy = 5;
        draw6();
    }

    function d7() {
        deg = 0;
        x1 = 40;
        y1 = 40 + canvas.height / 3 * 2;
        x2 = canvas.width / 3 - 40;
        y2 = 40 + canvas.height / 3 * 2;
        dx = 5;
        dy = 5;
        draw7();
    }

    function d8() {
        deg = 0;
        x1 = 40 + canvas.width / 3;
        y1 = 40 + canvas.height / 3 * 2;
        x2 = canvas.width / 3 * 2 - 40;
        y2 = 40 + canvas.height / 3 * 2;
        dx = 5;
        dy = 5;
        draw8();
    }

    function d9() {
        deg = 0;
        x1 = 40 + canvas.width / 3 * 2;
        y1 = 40 + canvas.height / 3 * 2;
        x2 = canvas.width / 3 * 3 - 40;
        y2 = 40 + canvas.height / 3 * 2;
        dx = 5;
        dy = 5;
        draw9();
    }



    function reset() {
        $("#end").fadeOut();
        $("#circle").attr("disabled", false);
        $("#x").attr("disabled", false);
        $("#reset_btn").fadeOut();
        $("#ai").fadeIn();
        ctx.clearRect(0, 0, wWidth, wHeight);
        y = 0;
        x = 0;
        animate();
        if (playerX === true) {
            circle = false;
            aspa = true;
        } else if (playerX === false) {
            circle = true;
            aspa = false;
        }

        ganar = false;
        empate = false;
        move = 0;
        gameStart = false;
        playerMove = true;
        for (var i = 0; i < 9; i++) {
            ocupiedO[i] = false;
            ocupiedX[i] = false;
        }

    }

    var cx = canvas.width; //cross x
    var cy = 0; // cross y
    //------------the condition for the winner-----------------
    function win() {

        //------------win for circle-----------------------
        if (ocupiedO[0] == true && ocupiedO[1] === true && ocupiedO[2] === true) {
            ganar = true;
            gameStart = false;
            circle = false; //----after win, can´t draw anything
            aspa = false; //-------afet win,cant´t draw anything
            if (x >= canvas.width) {
                oScore++;
                console.log(oScore);
                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, canvas.height / 3 / 2);
            ctx.lineTo(x, canvas.height / 3 / 2);
            ctx.stroke();
            x += dx;
        } //----first possibility

        if (ocupiedO[3] == true && ocupiedO[4] === true && ocupiedO[5] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (x >= canvas.width) {
                oScore++;
                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, canvas.height / 3 / 2 + canvas.height / 3);
            ctx.lineTo(x, canvas.height / 3 / 2 + canvas.height / 3);
            ctx.stroke();
            x += dx;
        } //----seconde possibility

        if (ocupiedO[6] == true && ocupiedO[7] === true && ocupiedO[8] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;

            if (x >= canvas.width) {
                oScore++;

                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, canvas.height / 3 / 2 + canvas.height / 3 * 2);
            ctx.lineTo(x, canvas.height / 3 / 2 + canvas.height / 3 * 2);
            ctx.stroke();
            x += dx;
        } //----third possibility

        if (ocupiedO[0] == true && ocupiedO[3] === true && ocupiedO[6] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;

            if (y >= canvas.height) {
                oScore++;
                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width / 3 / 2, 0);
            ctx.lineTo(canvas.width / 3 / 2, y);
            ctx.stroke();
            y += dy;
        } //----forth possibility

        if (ocupiedO[1] == true && ocupiedO[4] === true && ocupiedO[7] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;

            if (y >= canvas.height) {
                oScore++;
                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width / 3 / 2 + canvas.width / 3, 0);
            ctx.lineTo(canvas.width / 3 / 2 + canvas.width / 3, y);
            ctx.stroke();
            y += dy;
        } //----fifth possibility

        if (ocupiedO[2] == true && ocupiedO[5] === true && ocupiedO[8] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;

            if (y >= canvas.height) {
                oScore++;
                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width / 3 / 2 + canvas.width / 3 * 2, 0);
            ctx.lineTo(canvas.width / 3 / 2 + canvas.width / 3 * 2, y);
            ctx.stroke();
            y += dy;
        } //----sixth possibility

        if (ocupiedO[0] == true && ocupiedO[4] === true && ocupiedO[8] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;

            if (y >= canvas.height) {
                oScore++;
                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
            x += dx;
            y += dy;
        } //----seventh possibility

        if (ocupiedO[2] == true && ocupiedO[4] === true && ocupiedO[6] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;

            if (cy >= canvas.height) {
                oScore++;
                document.getElementById("winner").className = "fa fa-circle-o";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#oScore").text(oScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width, 0);
            ctx.lineTo(cx, cy);
            ctx.stroke();
            cx -= dx;
            cy += dy;
        } //----eighth possibility

        //-----------------win for X-----------------------
        if (ocupiedX[0] == true && ocupiedX[1] === true && ocupiedX[2] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (x >= canvas.width) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, canvas.height / 3 / 2);
            ctx.lineTo(x, canvas.height / 3 / 2);
            ctx.stroke();
            x += dx;
        } //----first possibility

        if (ocupiedX[3] == true && ocupiedX[4] === true && ocupiedX[5] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (x >= canvas.width) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, canvas.height / 3 / 2 + canvas.height / 3);
            ctx.lineTo(x, canvas.height / 3 / 2 + canvas.height / 3);
            ctx.stroke();
            x += dx;
        } //----seconde possibility

        if (ocupiedX[6] == true && ocupiedX[7] === true && ocupiedX[8] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (x >= canvas.width) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, canvas.height / 3 / 2 + canvas.height / 3 * 2);
            ctx.lineTo(x, canvas.height / 3 / 2 + canvas.height / 3 * 2);
            ctx.stroke();
            x += dx;
        } //----third possibility

        if (ocupiedX[0] == true && ocupiedX[3] === true && ocupiedX[6] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (y >= canvas.height) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width / 3 / 2, 0);
            ctx.lineTo(canvas.width / 3 / 2, y);
            ctx.stroke();
            y += dy;
        } //----forth possibility

        if (ocupiedX[1] == true && ocupiedX[4] === true && ocupiedX[7] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (y >= canvas.height) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width / 3 / 2 + canvas.width / 3, 0);
            ctx.lineTo(canvas.width / 3 / 2 + canvas.width / 3, y);
            ctx.stroke();
            y += dy;
        } //----fifth possibility

        if (ocupiedX[2] == true && ocupiedX[5] === true && ocupiedX[8] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (y >= canvas.height) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width / 3 / 2 + canvas.width / 3 * 2, 0);
            ctx.lineTo(canvas.width / 3 / 2 + canvas.width / 3 * 2, y);
            ctx.stroke();
            y += dy;
        } //----sixth possibility

        if (ocupiedX[0] == true && ocupiedX[4] === true && ocupiedX[8] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (y >= canvas.height) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
            x += dx;
            y += dy;
        } //----seventh possibility

        if (ocupiedX[2] == true && ocupiedX[4] === true && ocupiedX[6] === true) {
            ganar = true;
            gameStart = false;
            circle = false;
            aspa = false;
            if (cy >= canvas.height) {
                xScore++;
                document.getElementById("winner").className = "fa fa-times";
                document.getElementById("empate").className = "";
                $("#end p").text("winner!");
                $("#xScore").text(xScore);
                $("#end").fadeIn("slow");
                return;
            }
            requestAnimationFrame(win);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(208, 166, 25, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(canvas.width, 0);
            ctx.lineTo(cx, cy);
            ctx.stroke();
            cx -= dx;
            cy += dy;

        } //----eighth possibility

        //---------empate condition-------------------
        if (move === 9 && ganar === false) {
            empate = true;
            gameStart = false;
            document.getElementById("winner").className = "fa fa-circle-o";
            document.getElementById("empate").className = "fa fa-times";
            $("#end p").text("draw");
            $("#end").fadeIn("slow");
        }
    }

    function randomMove() {
        var random = Math.floor(Math.random() * 9);

        if (ganar === true || empate === true) { // to avoid maximun stack error
            return
        }
        if (ocupiedO[random] === false && ocupiedX[random] === false) {
            draw[random]();
            
        } else if (ocupiedO[random] === true || ocupiedX[random] === true) {
            randomMove();
            console.log("2:" + random);
        }

    }

    function blockMove() {
        if (playerX) {
            if (ocupiedX[0] === true && ocupiedX[1] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedX[0] === true && ocupiedX[2] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedX[1] === true && ocupiedX[2] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedX[3] === true && ocupiedX[4] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedX[3] === true && ocupiedX[5] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[5] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedX[6] === true && ocupiedX[7] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedX[6] === true && ocupiedX[8] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedX[7] === true && ocupiedX[8] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedX[0] === true && ocupiedX[3] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedX[0] === true && ocupiedX[6] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedX[3] === true && ocupiedX[6] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedX[1] === true && ocupiedX[4] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedX[1] === true && ocupiedX[7] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[7] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedX[2] === true && ocupiedX[5] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedX[2] === true && ocupiedX[8] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedX[5] === true && ocupiedX[8] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedX[0] === true && ocupiedX[4] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedX[0] === true && ocupiedX[8] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[8] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedX[2] === true && ocupiedX[4] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedX[2] === true && ocupiedX[6] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[6] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedX[0] === true && ocupiedX[4] === true && ocupiedO[8] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedX[4] === true && ocupiedX[8] === true && ocupiedO[0] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedX[2] === true && ocupiedX[4] === true && ocupiedO[6] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedX[4] === true && ocupiedX[6] === true && ocupiedO[2] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else {
                randomMove();
            }
        } //------player choose X-------------
        if (!playerX) {
            if (ocupiedO[0] === true && ocupiedO[1] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedO[0] === true && ocupiedO[2] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedO[1] === true && ocupiedO[2] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedO[3] === true && ocupiedO[4] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedO[3] === true && ocupiedO[5] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[5] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedO[6] === true && ocupiedO[7] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedO[6] === true && ocupiedO[8] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedO[7] === true && ocupiedO[8] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedO[0] === true && ocupiedO[3] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedO[0] === true && ocupiedO[6] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedO[3] === true && ocupiedO[6] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedO[1] === true && ocupiedO[4] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedO[1] === true && ocupiedO[7] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[7] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedO[2] === true && ocupiedO[5] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedO[2] === true && ocupiedO[8] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedO[5] === true && ocupiedO[8] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedO[0] === true && ocupiedO[4] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedO[0] === true && ocupiedO[8] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[8] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedO[2] === true && ocupiedO[4] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedO[2] === true && ocupiedO[6] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[6] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedO[0] === true && ocupiedO[4] === true && ocupiedX[8] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedO[4] === true && ocupiedO[8] === true && ocupiedX[0] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedO[2] === true && ocupiedO[4] === true && ocupiedX[6] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedO[4] === true && ocupiedO[6] === true && ocupiedX[2] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else {
                randomMove();
            }
        } //----------player choose O----------
    }

    function winMove() {
        if (playerX) {
            if (ocupiedO[0] === true && ocupiedO[1] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedO[0] === true && ocupiedO[2] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedO[1] === true && ocupiedO[2] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedO[3] === true && ocupiedO[4] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedO[3] === true && ocupiedO[5] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[5] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedO[6] === true && ocupiedO[7] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedO[6] === true && ocupiedO[8] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedO[7] === true && ocupiedO[8] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedO[0] === true && ocupiedO[3] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedO[0] === true && ocupiedO[6] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedO[3] === true && ocupiedO[6] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedO[1] === true && ocupiedO[4] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedO[1] === true && ocupiedO[7] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[7] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedO[2] === true && ocupiedO[5] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedO[2] === true && ocupiedO[8] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedO[5] === true && ocupiedO[8] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedO[0] === true && ocupiedO[4] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedO[0] === true && ocupiedO[8] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[8] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedO[2] === true && ocupiedO[4] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedO[2] === true && ocupiedO[6] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedO[4] === true && ocupiedO[6] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else {
                blockMove();
            }
        } //------AI choose O------------- 
        if (!playerX) {
            if (ocupiedX[0] === true && ocupiedX[1] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedX[0] === true && ocupiedX[2] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedX[1] === true && ocupiedX[2] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedX[3] === true && ocupiedX[4] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedX[3] === true && ocupiedX[5] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[5] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedX[6] === true && ocupiedX[7] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedX[6] === true && ocupiedX[8] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedX[7] === true && ocupiedX[8] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedX[0] === true && ocupiedX[3] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedX[0] === true && ocupiedX[6] === true && ocupiedO[3] === false && ocupiedX[3] === false) {
                draw[3]();
            } else if (ocupiedX[3] === true && ocupiedX[6] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedX[1] === true && ocupiedX[4] === true && ocupiedO[7] === false && ocupiedX[7] === false) {
                draw[7]();
            } else if (ocupiedX[1] === true && ocupiedX[7] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[7] === true && ocupiedO[1] === false && ocupiedX[1] === false) {
                draw[1]();
            } else if (ocupiedX[2] === true && ocupiedX[5] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedX[2] === true && ocupiedX[8] === true && ocupiedO[5] === false && ocupiedX[5] === false) {
                draw[5]();
            } else if (ocupiedX[5] === true && ocupiedX[8] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else if (ocupiedX[0] === true && ocupiedX[4] === true && ocupiedO[8] === false && ocupiedX[8] === false) {
                draw[8]();
            } else if (ocupiedX[0] === true && ocupiedX[8] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[8] === true && ocupiedO[0] === false && ocupiedX[0] === false) {
                draw[0]();
            } else if (ocupiedX[2] === true && ocupiedX[4] === true && ocupiedO[6] === false && ocupiedX[6] === false) {
                draw[6]();
            } else if (ocupiedX[2] === true && ocupiedX[6] === true && ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4]();
            } else if (ocupiedX[4] === true && ocupiedX[6] === true && ocupiedO[2] === false && ocupiedX[2] === false) {
                draw[2]();
            } else {
                blockMove();
            }
        } //------AI choose X------------- 
    }

   /* function move0268() {
        if (playerX) {
            console.log("move0268");
            if (ocupiedO[0] === true && ocupiedO[4] === true && ocupiedX[1] === true) {
                draw[6]();
            }else if (ocupiedO[0] === true && ocupiedO[4] === true && ocupiedX[3] === true) {
                draw[2]();
            }else if (ocupiedO[0] === true && ocupiedO[4] === true && ocupiedX[5] === true) {
                draw[2]();
            }else if (ocupiedO[0] === true && ocupiedO[4] === true && ocupiedX[7] === true) {
                draw[6]();
            }else if (ocupiedO[4] === true && ocupiedO[8] === true && ocupiedX[1] === true) {
                draw[2]();
            }else if (ocupiedO[4] === true && ocupiedO[8] === true && ocupiedX[3] === true) {
                draw[6]();
            }else if (ocupiedO[4] === true && ocupiedO[8] === true && ocupiedX[5] === true) {
                draw[6]();
            }else if (ocupiedO[4] === true && ocupiedO[8] === true && ocupiedX[7] === true) {
                draw[2]();
            }else if (ocupiedO[2] === true && ocupiedO[4] === true && ocupiedX[1] === true) {
                draw[8]();
            }else if (ocupiedO[2] === true && ocupiedO[4] === true && ocupiedX[3] === true) {
                draw[0]();
            }else if (ocupiedO[2] === true && ocupiedO[4] === true && ocupiedX[5] === true) {
                draw[0]();
            }else if (ocupiedO[2] === true && ocupiedO[4] === true && ocupiedX[7] === true) {
                draw[8]();
            }else if (ocupiedO[4] === true && ocupiedO[6] === true && ocupiedX[1] === true) {
                draw[0]();
            }else if (ocupiedO[4] === true && ocupiedO[6] === true && ocupiedX[3] === true) {
                draw[8]();
            }else if (ocupiedO[4] === true && ocupiedO[6] === true && ocupiedX[5] === true) {
                draw[8]();
            }else if (ocupiedO[4] === true && ocupiedO[6] === true && ocupiedX[7] === true) {
                draw[0]();
            }else{
                console.log("winmove");
                winMove();
            }
        }//--------ai play O---------
        
        if (!playerX) {
            if (ocupiedX[0] === true && ocupiedX[4] === true && ocupiedO[1] === true) {
                draw[6]();
            }else if (ocupiedX[0] === true && ocupiedX[4] === true && ocupiedO[3] === true) {
                draw[2]();
            }else if (ocupiedX[0] === true && ocupiedX[4] === true && ocupiedO[5] === true) {
                draw[2]();
            }else if (ocupiedX[0] === true && ocupiedX[4] === true && ocupiedO[7] === true) {
                draw[6]();
            }else if (ocupiedX[4] === true && ocupiedX[8] === true && ocupiedO[1] === true) {
                draw[2]();
            }else if (ocupiedX[4] === true && ocupiedX[8] === true && ocupiedO[3] === true) {
                draw[6]();
            }else if (ocupiedX[4] === true && ocupiedX[8] === true && ocupiedO[5] === true) {
                draw[6]();
            }else if (ocupiedX[4] === true && ocupiedX[8] === true && ocupiedO[7] === true) {
                draw[2]();
            }else if (ocupiedX[2] === true && ocupiedX[4] === true && ocupiedO[1] === true) {
                draw[8]();
            }else if (ocupiedX[2] === true && ocupiedX[4] === true && ocupiedO[3] === true) {
                draw[0]();
            }else if (ocupiedX[2] === true && ocupiedX[4] === true && ocupiedO[5] === true) {
                draw[0]();
            }else if (ocupiedX[2] === true && ocupiedX[4] === true && ocupiedO[7] === true) {
                draw[8]();
            }else if (ocupiedX[4] === true && ocupiedX[6] === true && ocupiedO[1] === true) {
                draw[0]();
            }else if (ocupiedX[4] === true && ocupiedX[6] === true && ocupiedO[3] === true) {
                draw[8]();
            }else if (ocupiedX[4] === true && ocupiedX[6] === true && ocupiedO[5] === true) {
                draw[8]();
            }else if (ocupiedX[4] === true && ocupiedX[6] === true && ocupiedO[7] === true) {
                draw[0]();
            }else{
                console.log("winmove");
                winMove();
            }
        }//--------ai play X---------
    }
*/
    function ai() {
        if (move === 0) {
            draw[4]();
        }

        if (move === 1 || move === 2) {
           
            if (ocupiedO[4] === false && ocupiedX[4] === false) {
                draw[4](); //if the center is empty, take the center at the first move
            } else if (ocupiedO[4] === true || ocupiedX[4] === true) {
                
                var arr = [0, 2, 6, 8];
                var random = Math.floor(Math.random() * 4)
                var num = arr[random];
                draw[num]();
            } else {
                randomMove();
            }
        } //------------the first step, a random move-------------
        if (move >= 3) {
            
          winMove();
        } //-------move 2-------------

        setTimeout(player, 300); // avoid player and ai draw at the same time
    }

    function player() {
        playerMove = true;
    }
    var mouse = {
        x: undefined,
        y: undefined
    }
    canvas.addEventListener("mousemove", function (e) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;

    }, false);


    canvas.addEventListener("click", function () {

        $("#reset_btn").fadeIn("slow");
        $("#ai").fadeOut();
        if (playerMove === true && gameStart === true) {


            if (mouse.x < canvas.width / 3 * 1 && mouse.y < canvas.height / 3 * 1) {
                if (ocupiedO[0] === false && ocupiedX[0] === false) {
                    playerMove = false;
                    d1();
                    setTimeout(ai, 500);
                }

            } else if (mouse.x < canvas.width / 3 * 2 && mouse.y < canvas.height / 3 * 1) {
                if (ocupiedO[1] === false && ocupiedX[1] === false) {
                    playerMove = false;
                    d2();
                    setTimeout(ai, 500);
                }

            } else if (mouse.x < canvas.width / 3 * 3 && mouse.y < canvas.height / 3 * 1) {
                if (ocupiedO[2] === false && ocupiedX[2] === false) {
                    playerMove = false;
                    d3();
                    setTimeout(ai, 500);
                }

            } else if (mouse.x < canvas.width / 3 * 1 && mouse.y < canvas.height / 3 * 2) {
                if (ocupiedO[3] === false && ocupiedX[3] === false) {
                    playerMove = false;
                    d4();
                    setTimeout(ai, 500);
                }

            } else if (mouse.x < canvas.width / 3 * 2 && mouse.y < canvas.height / 3 * 2) {
                if (ocupiedO[4] === false && ocupiedX[4] === false) {
                    playerMove = false;
                    d5();
                    setTimeout(ai, 500);
                }
            } else if (mouse.x < canvas.width / 3 * 3 && mouse.y < canvas.height / 3 * 2) {
                if (ocupiedO[5] === false && ocupiedX[5] === false) {
                    playerMove = false;
                    d6();
                    setTimeout(ai, 500);
                }
            } else if (mouse.x < canvas.width / 3 * 1 && mouse.y < canvas.height / 3 * 3) {
                if (ocupiedO[6] === false && ocupiedX[6] === false) {
                    playerMove = false;
                    d7();
                    setTimeout(ai, 500);
                }
            } else if (mouse.x < canvas.width / 3 * 2 && mouse.y < canvas.height / 3 * 3) {
                if (ocupiedO[7] === false && ocupiedX[7] === false) {
                    playerMove = false;
                    d8();
                    setTimeout(ai, 500);
                }
            } else if (mouse.x < canvas.width / 3 * 3 && mouse.y < canvas.height / 3 * 3) {
                if (ocupiedO[8] === false && ocupiedX[8] === false) {
                    playerMove = false;
                    d9();
                    setTimeout(ai, 500);
                }
            }

        } //----playerMove---------
    }, false);

    $("#circle").click(function () {

        circle = true;
        aspa = false;
        playerX = false;
        $("#circle").addClass("active");
        $("#x").removeClass("active");

    });

    $("#x").click(function () {
        aspa = true;
        circle = false;
        playerX = true;
        $("#x").addClass("active");
        $("#circle").removeClass("active");
    });

    $("#end").click(reset);
    $("#reset").click(reset);
    $("#play").click(function () {
        $("#body").css("background","#FECA47");
        $("#intro").fadeOut();
        $("#main").fadeIn();
        animate();
    });

    $("#ai").click(function () {
        if (gameStart) {
            playerMove = false;
            circle = !circle;
            aspa = !aspa;
            $("#ai").fadeOut();
            ai();
        }

    });


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
    //---------animate intro section---------------------
    var tic = $("#tic"),
        tac = $("#tac"),
        toe = $("#toe");


    var header = $("#intro h1");
    TweenLite.fromTo(tic, 1.5, {
        opacity: 0,
        x: -150,
        ease: Power2.easeOut
    }, {
        opacity: 1,
        x: 0,
        ease: Power4.easeOut
    });
    TweenLite.fromTo(toe, 1.5, {
        opacity: 0,
        x: 150,
        ease: Power4.easeOut
    }, {
        opacity: 1,
        x: 0,
        ease: Power4.easeOut
    });
    TweenLite.from(tac, 1.5, {
        opacity: 0,
        y: -150,
        ease: Bounce.easeOut
    });
    TweenLite.from("#play", 1, {
        opacity: 0,
        delay: 0.8
    });
});
