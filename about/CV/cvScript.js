/*back to top button*/
function topFunction(){
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
   
}
var toTop = document.getElementById("top");
function scrollFunction(){
    
    if(document.body.scrollTop>30 || document.documentElement.scrollTop>30){
       toTop.style.display="block";
       }else{
           toTop.style.display="none";
       }
}


window.onscroll=function(){
    scrollFunction();
};



//Magnify img with mouseover


(function(){
    var myNode = document.querySelector("#certificate ul");
    myNode.addEventListener("mouseover",preview,false);
    
    function preview(e){
        if(e.target.tagName === "IMG"){
            /*creae img element*/
            e.target.style.cursor="pointer";
            var container = document.createElement("div");
            container.id="preview";
            e.target.parentNode.appendChild(container);
            e.target.parentNode.style.position="relative";
            var largeImg = document.createElement("img");
            var tnImg = e.target.src; 
            largeImg.src = tnImg.substr(0,tnImg.length-7) + ".png";
            
           
           /*position*/
             container.appendChild(largeImg);
            container.style.top = -(largeImg.height-e.offsetY)- 15 + "px";
            container.style.left = -(largeImg.width-e.offsetX )- 15 + "px";
            
            
            e.target.addEventListener("mousemove",function(m){
                 container.style.top = -(largeImg.height-m.offsetY) - 15 + "px"; 
                container.style.left = -(largeImg.width-m.offsetX) - 15 +"px";
            },false);
            
            
           /* e.target.addEventListener("mouseout",function re(){
                container.parentElement.removeChild(container);
                largeImg.parentElement.removeChild(largeImg);
                e.target.removeEventListener("mouseout",re,false);
            },false);*/
           }
    }
       
        
    //when the window.innerWidth<=480px, remove mouseover listener
    
    window.addEventListener("resize",function(){
        if(window.innerWidth < 480 ){
       myNode.removeEventListener("mouseover",preview,false);
    }else {
        myNode.addEventListener("mouseover",preview,false);
    }
    
    },false);
    
  })();



 //magnify img with click
(function(){
    //center image function
    function centerImg(theImg){
        var x = (window.innerWidth-theImg.width)/2;
        var y = (window.innerHeight-theImg.height)/2;
        
        theImg.style.top=y +"px";
        theImg.style.left=x + "px";
        return theImg;
    }  
    
    
    var myNode = document.querySelector("#certificate ul");
    myNode.addEventListener("click",function(e){
        if(e.target.tagName === "IMG"){
           
            //add overlay 
        var myElement = document.createElement("div");
            document.body.appendChild(myElement);
         myElement.id="overLay";  
            //overlay style
            myElement.style.width=window.innerWidth + "px";
            myElement.style.height=window.innerHeight + "px";
            myElement.style.top=window.pageYOffset + "px";
            myElement.style.left=window.pageXOffset + "px";
            
            //add img
            var largeImg = document.createElement("img");
            var tnImg = e.target.src;
             largeImg.id="largeImg";
            largeImg.src =tnImg.substr(0,tnImg.length-7) + ".png";
            
            
            //load img
            largeImg.addEventListener("load",function(){
                var ratio =1;
                
            if(largeImg.width > window.innerWidth){
                  ratio = window.innerWidth/largeImg.width;
                largeImg.width=largeImg.width*ratio;
                largeImg.height =largeImg.height*ratio;
               } 
                
            if (largeImg.height> window.innerHeight){
                         ratio=window.innerHeight/largeImg.height;
                        largeImg.width=largeImg.width*ratio;
                       largeImg.height =largeImg.height*ratio;
                  
                         }
             
                centerImg(largeImg);
                myElement.appendChild(largeImg);
            },false);
           // when scroll
            window.addEventListener("scroll", function(){
                myElement.style.top =window.pageYOffset + "px";
                myElement.style.left = window.pageXOffset + "px";
                
            },false);
            
           //when resize 
            window.addEventListener("resize",function(){
                myElement.style.width=window.innerWidth +"px";
                myElement.style.height=window.innerHeight + "px";
                centerImg(largeImg);
                
               
            },false);
            
           //remove overlay 
        myElement.addEventListener("click",function (){
        myElement.parentNode.removeChild(myElement);
    },false);
            
        }
    },false);
    
    
    
})();


