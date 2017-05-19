(function(){
    var myNode=document.querySelector(".container");
    var card=document.querySelector("#card");
    myNode.addEventListener("mouseover",function(){ 
        card.classList.add("flipped");
    },false);
    
    myNode.addEventListener("mouseleave",function(){
        card.classList.remove("flipped");
    },false);
})();