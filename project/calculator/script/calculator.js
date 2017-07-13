$(function () {
    var input = [];
    var result;
    var resultB;
    var equationMulti="";
    var operation = false;
    var input = true;
    var continuo = false;
    
    //---------detect mobile deveice-----------
    function isMobile() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    if (isMobile()) {
        $("#calc button").not(".oper").each(function () {
            $(this).on("touchstart", function () {
                $(this).css("background", "#D9598A");
            });
            $(this).on("touchend", function () {
                $(this).css("background", "#5958B9");
            });
        });

        $("#calc .oper").each(function () {
            $(this).on("touchstart", function () {
                $(this).css("background", "rgb(166,38,87)");
            });
            $(this).on("touchend", function () {
                $(this).css("background", "#403E4B");
            });
        });
    }
    //----------------------------main functoin-----------------------------
    function showNum() {
        var length = $("#screen-lower p").text().length;
        var text = $("#screen-lower p").text();
        var num = $(this).text();

        if (input === true && length === 1 && text === "0" && num!==".") {
            $("#screen-lower p").text(num);
            operation = true;
        } else if (input === true) {
            $("#screen-lower p").append(num);
            operation = true;
        }else if(input===false){
            clearAll();
            $("#screen-lower p").text(num);
            operation=true;
                
                 }


    }

    function showOper() {
        var num = $(this).text();
        var text=$("#screen-lower p").text();
        if (operation === true && input === true) {
            $("#screen-lower p").append(num);
            operation = false;
        }else if(operation===false && input===true && num==="-" && text==="0"){
                 $("#screen-lower p").text(num);
            operation = false;
                 }else if(operation===true && input===false ){
                      $("#screen-lower p").text(num);
                   operation = false;  
                     input=true;
                     continuo=true;
                          }
    }

    function clearAll() {
        $("#screen-lower p").text("0");
        $("#screen-upper p").text("0");
        input = true;
        operation = false;
        equationMulti="";
    }

    function clear() {
        if (input === true) {
            var length = $("#screen-lower p").text().length;
            var num = $("#screen-lower p").text();
            if(length>1){
            num = num.substr(0, length - 1);
            $("#screen-lower p").text(num);
               }else if(length===1){
                $("#screen-lower p").text("0");    
                        }
        
        var check = num.substr(length - 2, 1);
            
        }

        if (check === "+" || check === "-" || check === "×" || check === "÷") {
            operation = false;
        } else {
            operation = true;
        }
    }


    function calc() {
        var length = $("#screen-lower p").text().length;
        
            var equation = $("#screen-lower p").text();
            equation = equation.substr(0, length - 1);
            equation = equation.replace(/÷/g, "/");
            equation = equation.replace("×", "*");
            equationMulti +=equation;
        console.log(equationMulti);
        if ( operation === true && continuo ===false) {    
        try{   
             result = math.eval(equationMulti).toString().substr(0, 6);
            resultB=result;
            $("#screen-upper p").text(result);
            $("#list").append("<p>" + equation + "=" + result + "</p>");
            input = false;
            }catch(err){
                $("#screen-upper p").text("ERROR");
                input=false
            }
        }else if(operation === true && continuo ===true){
                try{   
             result = math.eval(equationMulti).toString().substr(0, 6);
            
            $("#screen-upper p").text(result);
            $("#list").append("<p>" + resultB+equation + "=" + result + "</p>");
            input = false;
            resultB=result;
            }catch(err){
                $("#screen-upper p").text("ERROR");
                input=false
            } 
                 }
        
         
         
    }

    function showList() {
        $("#list").fadeToggle().toggleClass("showList");

    }

    //-------------------------event handler--------------------  

    $("#calc button.num").each(function () {
        $(this).click(showNum);
    });
    $("#calc button.oper").not("#equal").each(function () {
        $(this).click(showOper);
    })
    $("#equal").click(function () {
        if (operation === true && input === true) {
            var num = $(this).text();
            $("#screen-lower p").append(num);

        }
    });
    $("#equal").click(calc);

    $("button.clearAll").click(clearAll);
    $("button.clear").click(clear);
    $("#history").click(showList);
    
    //-------------use math js -----------------------------
    math.config({
  number: 'BigNumber', // Default type of number:
                       // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 64        // Number of significant digits for BigNumbers
});
    
    //-----------position calculator-------------
    function center(){
        var wWidth=$(".wrap").width();
        var wHeight=$(".wrap").height();
        var width=$("#main").width();
        var height=$("#main").height();
      
        $("#main").css({
            "top":(wHeight-height)/2,
            "left":(wWidth-width)/2
        });
         
    }
    
    center();
    $(window).resize(center);
    
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
    $( '#main,#body' ).click(function(){
        controller.close( 'id-1' );
    });
    
});
