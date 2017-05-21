(function(){
    var next = document.querySelector("#next");
    var pre= document.querySelector("#pre");
    var carousel = document.querySelector("#carousel");
    var deg = 0;
    var panelCount= carousel.children.length;
    next.addEventListener("click",function(){
        deg -= 360/panelCount;
        carousel.style.transform="translateZ(-468px) rotateY(" + deg + "deg)";
        
    },false);
    pre.addEventListener("click",function(){
       deg +=360/panelCount;
        carousel.style.transform="translateZ(-468px) rotateY(" + deg + "deg)";
    },false);
    
    
})();