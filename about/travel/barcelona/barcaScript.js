//overlay
(function(){
    var myNode = document.querySelector("#aside .imgGroup ul");
    
    myNode.addEventListener("click",function(event){
        //to be sure the event target is image
        if(event.target.tagName === "IMG"){
           
            //create overlay
           var myOverlay=document.createElement("div");
            myOverlay.id="overLay";
            document.body.appendChild(myOverlay);
           //set overlay style
            myOverlay.style.position="absolute";
            myOverlay.style.width=window.innerWidth + "px"; 
            myOverlay.style.height=window.innerHeight + "px";
            myOverlay.style.backgroundColor="rgba(0,0,0,0.7)";
            myOverlay.style.cursor="pointer";
            myOverlay.style.top=window.pageYOffset + "px";
            myOverlay.style.left=window.pageXOffset + "px";
            
            //create img element
            var tnImg = event.target.src;
            var bigImg = document.createElement("img");
            
            bigImg.src= tnImg.substr(0,tnImg.length-7) + ".JPG";
            bigImg.style.position="absolute";
            bigImg.style.display="block";
            
            //resize image
            bigImg.addEventListener("load",function(){
                   var ratio=1;
                if(this.width>window.innerWidth  ){
                     ratio=window.innerWidth/this.width;
                    this.width=this.width*ratio;
                    this.height=this.height*ratio;
                   }
                if (this.height>window.innerHeight){
                    ratio=window.innerHeight/this.height;
                    this.height=this.height*ratio;
                    this.width=this.width*ratio;
                    }
                 centerImg(this);
                myOverlay.appendChild(bigImg);
            },false);
            
            //when resize the window
            window.addEventListener("resize",function(){
                
                myOverlay.style.width=window.innerWidth + "px";
               myOverlay.style.height=window.innerHeight +"px";
                myOverlay.style.top=window.pageYOffset + "px";
                myOverlay.style.left=window.pageXOffset + "px";
                centerImg(bigImg);
                
            },false);
            
            //when scroll the window
            window.addEventListener("scroll",function(){
                myOverlay.style.top=window.pageYOffset + "px";
                myOverlay.style.left=window.pageXOffset + "px";
            },false);
           }
        
        //remove listener
        bigImg.addEventListener("click",function(){
            myOverlay.parentNode.removeChild(myOverlay);
        },false);
           
    },false);
    
     function centerImg(theImage) {
        var x = (window.innerWidth - theImage.width)/2;
        var y = (window.innerHeight - theImage.height)/2;

        theImage.style.top = y + 'px';
        theImage.style.left = x + 'px';
         return theImage;
    }
    
})();

//play music
(function(){
 var list= document.querySelector(".musicGroup ul");
    var player = document.createElement("audio");
    
  list.addEventListener("click",function(e){
      
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
      player.addEventListener("ended",function(){
                e.target.id=" ";
            },false);   
  });
 
 })();