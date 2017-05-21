(function(){
    var myNode=document.querySelectorAll(".container");
    var card=document.querySelectorAll(".card");
    var cardSec=document.querySelector("#cardSec");
    var fCard;
    //judge it is  a touche deveice or not
    function isTouchScreen(){
        return "ontouchstart" in document.documentElement;
    }
    
   if(isTouchScreen()){
       for(var i=0;i<myNode.length;i++){
      myNode[i].addEventListener("click",function(e){
          if(e.target.tagName==="FIGURE"){ 
              e.target.parentElement.classList.add("flipped");
          }else if(e.target.className ==="container"){
              e.target.children[0].classList.remove("flipped");
          }
        
            
    },false);
        }
      } else{
          for(var i=0;i<myNode.length;i++){
          myNode[i].addEventListener("mouseover",function(e){
              if(e.target.tagName==="FIGURE"){
                  fCard=e.target.parentElement;
                      fCard.classList.add("flipped");
                  
              }
                  
          },false);
        
            
              myNode[i].addEventListener("mouseout",function(){
                fCard.classList.remove("flipped");
              
          },false);}
          
      }
    
    
    
    /*set position
    
    function position(){  
         var x =(window.innerWidth-myNode.offsetWidth*numOfContainer)/2;
        var y = (window.innerHeight-myNode.offsetHeight)/2;
      cardSec.style.top= y + "px";
        cardSec.style.left=x + "px";
    }
    
    window.addEventListener("load",position,false);*/
    
})();