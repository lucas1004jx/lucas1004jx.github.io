(function(){
    var myNode=document.querySelector(".container");
    var card=document.querySelector("#card");
    myNode.addEventListener("click",function(){
       
        card.classList.toggle("flipped");
         
    },false);
    
    
})();