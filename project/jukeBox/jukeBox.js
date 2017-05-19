//play music
(function(){
 var list= document.querySelector(".musicGroup ul");
    var player = document.createElement("audio");
    
  list.addEventListener("click",function(e){
      if(e.target.tagName ==="LI"){
      var music = e.target.getAttribute("data-src");
      
     
      if(document.querySelector("#playing") || document.querySelector("#pause")){
          if (music === player.getAttribute("src")){ 
              if(document.querySelector("#playing")){ 
                  player.pause();
            e.target.id="pause";
                  
              }else{
                  player.play();
                  e.target.id="playing";
                  
              }
           
            }else{
                if(document.querySelector("#playing")){
                    document.querySelector("#playing").id=" ";
                }else{
                    document.querySelector("#pause").id=" ";
                }
                player.pause();
                player.src=music;
                player.play();
                e.target.id="playing";
                
            }
         }
            else{
             
             document.body.appendChild(player);
             player.src=music;
             e.target.id="playing";
             player.play();
                
            }
      }
      player.addEventListener("ended",function(){
                e.target.id=" ";
            },false);   
  });
 
 })();