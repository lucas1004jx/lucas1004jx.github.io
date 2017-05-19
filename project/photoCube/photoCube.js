(function(){
    var myButton = document.querySelector(".btn");
    var myCube = document.querySelector("#cube");
    myButton.addEventListener("click",spinning,false);
    function spinning(e){
        switch(e.target.id){
            case "show1":
                myCube.className="show-front";
                break;
            case "show2":
                myCube.className="show-back";
                break;
            case "show3":
                myCube.className="show-right";
                break;
             case "show4":
                myCube.className="show-left";
                break;
             case "show5":
                myCube.className="show-top";
                break;
             case "show6":
                myCube.className="show-bottom";
                break;
               }
    }
})();