$(function () {
    var result;
    var url;

    //-------------get random data------------
    function randomEn() {
        var url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnfilterredir=redirects&rnlimit=10";
        
        $.get(url).done(function (response) {
            console.log(response);
            var id;
            var randomUrl;
            var title;
             for(var i=0;i<10;i++){
            id = response.query.random[i].id;
            title=response.query.random[i].title;
             randomUrl = "https://en.wikipedia.org/?curid=" + id;
             $("#article ul").find("a").eq(i).attr("href",randomUrl);
             $("#article ul").find("a").eq(i).text(title);

         }
            
        })
    };
    
      function randomEs() {
        var url = "https://cors-anywhere.herokuapp.com/https://es.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnfilterredir=redirects&rnlimit=10";
        $.get(url).done(function (response) {
            console.log(response);
            var id;
            var randomUrl;
            var title;
             for(var i=0;i<10;i++){
            id = response.query.random[i].id;
            title=response.query.random[i].title;
             randomUrl = "https://es.wikipedia.org/?curid=" + id;
             $("#article ul").find("a").eq(i).attr("href",randomUrl);
             $("#article ul").find("a").eq(i).text(title);
         }
            
        })
    };

    
    //---------------random button click event-----------------
    
    $("#random").click(function () {
        $("#social").fadeOut();
        var wHeight=$(window).height();
        $("#article").css("top",0);
        $("#main").css("top",-wHeight);
        if($("#back").text() === "Back"){
           randomEn();
           }else if($("#back").text() === "Volver"){
            randomEs();   
           }
    })
    
    $("#random2").click(function(){
        
        if($("#back").text() === "Back"){
           randomEn();
           }else if($("#back").text() === "Volver"){
            randomEs();   
           }
    });

    //----------get data form wikipedia--------------
    function get() {

        $.get(url).done(function (response) {
            var info = response[2].toString();
            var link = response[3];
            $("#search").attr("href", link);
            $("#info").html(info + "...");
            console.log(response);

        });
    }

    /*-----get value of input------------*/


    function update() {
        result = $("#searchBar").val();
        $("#searchBar").val(result);
        url ="https://cors-anywhere.herokuapp.com/"+ url + result + "&limit=1";
        get();
    };





    /*---------full height-----*/
    function fullHeight() {
        var wHeight = $(window).height();
        $(".fullHeight").css("height", wHeight);
    }

    fullHeight();
    $(window).resize(fullHeight);

    //-----------control input position---------------
    $(window).resize(function () {
        $("div.easy-autocomplete.eac-icon-right").css("width", "50%");
    });
    /*----------search bar----------------------*/
    var options = {
        url: function (result) {
            return "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=xml&search=" + result;
        },
        dataType: "xml",
        xmlElementName: "Item",
        getValue: function (element) {
            return $(element).find("Section Item Text").text();
        },

        list: {
            match: {
                enabled: true
            },
            maxNumberOfElements: 10,
            showAnimation: {
                type: "fade", //normal|slide|fade
                time: 400,
                callback: function () {}
            },

            hideAnimation: {
                type: "slide", //normal|slide|fade
                time: 400,
                callback: function () {}
            },
            onShowListEvent:function(){
                $(".easy-autocomplete-container").css("height",250);
                console.log("aa");
            },
            onHideListEvent:function(){
                $(".easy-autocomplete-container").css("height",0);
            },
            onClickEvent: function (element) {
                update();
                var wHeight = $(window).height();
                $("#main").css("top", -wHeight);
                $("#intro").css("top", 0);


            }
        },

        template: {
            type: "iconRight",
            fields: {
                iconSrc: function (element) {
                    if ($(element).find("Image").length > 0) {
                        return $(element).find("Image").attr("source");
                    } else {
                        return "images/wiki.png";
                    }

                }

            }
        },
        requestDelay: 200


    };

    $("#searchBar").easyAutocomplete(options);

    //---------------------go back btn------------------------
    $("#back").click(function () {
        var wHeight=$(window).height();
        $("#main").css("top", 0);
        $("#intro").css("top",wHeight);
        $("#searchBar").val("");
//--------------reset url---------------------
        if ($("#back").text() === "Back") {
            url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
        } else if ($("#back").text() === "Volver") {
            url = "https://es.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
        }

    });
    
    $("#back2").click(function(){
        $("#social").fadeIn();
        var wHeight=$(window).height();
        $("#article").css("top",wHeight);
        $("#main").css("top",0);
    });
    //---------------set initial position of each section------

   
    function InitPo(){
         var wHeight = $(window).height();
         $("#lang").css("top", 0);
        $("#main").css("top", wHeight);
        $("#intro").css("top", wHeight);
        $("#article").css("top",wHeight);
    }

   InitPo();
    
    
//----------------change position  when resize-------------------
    $(window).resize(function () {
        var wHeight = $(window).height();
        if ($("#main").css("top") === "0px") {
            $("#main").css("top", 0);
            $("#intro").css("top", wHeight);
            $("#lang").css("top", -wHeight);
            $("#article").css("top", wHeight);
        } else if ($("#lang").css("top") === "0px") {
            $("#main").css("top", wHeight);
            $("#intro").css("top", wHeight);
            $("#lang").css("top", 0);
            $("#article").css("top", wHeight);
            
        } else if ($("#intro").css("top") === "0px") {
            $("#main").css("top", -wHeight);
            $("#intro").css("top", 0);
            $("#lang").css("top", -wHeight);
            $("#article").css("top", wHeight);
            
        } else if ($("#article").css("top") === "0px") {
            $("#main").css("top", -wHeight);
            $("#intro").css("top", wHeight);
            $("#lang").css("top", -wHeight);
            $("#article").css("top",0);
        }

    });

    //---------------language button function----------------
    $("#en").click(function () {
        
        var wHeight = $(window).height();
        $("#lang").css("top", -wHeight);
        $("#main").css("top", 0);
        url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
        //----------change language of the text-------------------
        $("#random").text("Give a try");
        $("#change").text("Change language");
        $("#back").text("Back");
        $("#search button").text("Know more");
        $("#random2").text("Another try");
        $("#back2").text("Back");

    });

    $("#es").click(function () {
        
        var wHeight = $(window).height();
        $("#lang").css("top", -wHeight);
        $("#main").css("top", 0);

        url = "https://es.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
        //----------change language of the text-------------------
        $("#random").text("Al azar");
        $("#change").text("Cambiar idioma");
        $("#back").text("Volver");
        $("#search button").text("Saber más");
        $("#random2").text("Probar otra vez");
        $("#back2").text("Volver");
    });

    $("#change").click(function () {
        var wHeight = $(window).height();
        $("#lang").css("top", 0);
        $("#main").css("top", wHeight);
    });

//---------------use typed.js to animate language page h1---------------
    $(".typedText h1").typed({
        strings:["Choose your language?!","Elige tu idioma?!"],
        typeSpeed:100,
        backSpeed:50,
        backDelay:600,
        loop:true,
        contentType:"text"
    });

    //--------------initialize slide menu-------------
    var controller = new slidebars();
  controller.init();
    $( '.menu' ).on( 'click', function ( event ) {
  // Stop default action and bubbling
  event.stopPropagation();
  event.preventDefault();

  // Toggle the Slidebar with id 'id-1'
  controller.toggle( 'id-1' );
} );
    
});
