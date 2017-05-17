//change perfil
var myPerfil = document.getElementById("perfil");
var imageArray = ["image/me0.jpg","image/me1.png",
                 "image/me2.png","image/me3.png","image/me4.png"];
var imageIndex = 0;
function changePerfil(){
    myPerfil.setAttribute("src",imageArray[imageIndex]);
    imageIndex++;
    if(imageIndex>=imageArray.length){
       imageIndex=0;
       }
}
setInterval(changePerfil, 3000);

//add to the top function

var toTop = document.getElementById("top");
function scrollFunction(){
    if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
        toTop.style.display="block";
        
     }  else{
         toTop .style.display="none";
     }
      
}
window.onscroll=function(){
    scrollFunction()
};

function topFunction(){
   
    document.body.scrollTop=0;
    document.documentElement.scrollTop = 0;
}

//add time 
(function(){
    window.addEventListener("load",function(){
        var c = document.querySelector("#cTime");
        
        function upDateTime(){
            
        var d = new Date();
            var sepClass = (d.getSeconds() % 2 === 0)?" ":"sep";
            var sep = '<span class="' + sepClass + '"> : </span>';
            var hours=d.getHours();
            var minutes = d.getMinutes();
            var ampm ="AM";
            var month =d.getMonth(), monthName;
            var date=d.getDate();
            var year=d.getFullYear();
            
            
            if(d.getHours()>12){
                hours=hours-12;
                ampm = "PM";
            }else if(d.getHours() === 0){
                     hours=0;
                     }
            
            if(minutes < 10){
               minutes= "0"+minutes;
               }
            
            switch(month){
                case 0 : 
                    monthName="Junaury";
                    break;
                case 1 : 
                    monthName="February";
                    break;
                case 2 : 
                    monthName="March";
                    break;
                 case 3 : 
                    monthName="April";
                    break;
                case 4 : 
                    monthName="May";
                    break;
                case 5 : 
                    monthName="June";
                    break;
                case 6 : 
                    monthName="July";
                    break;
                case 7 : 
                    monthName="August";
                    break;
                case 8 : 
                    monthName="September";
                    break;
                case 9 : 
                    monthName="October";
                    break;
                case 10 : 
                    monthName="November";
                    break;
                case 11 : 
                    monthName="December";
                    break;
                    
                   }
            
        c.innerHTML = monthName + " "+date+ " "+ year +"<br>";
        c.innerHTML+=hours + sep + minutes + " "+ampm;
        }
        
        setInterval(upDateTime, 1000);
        
    },false);
})();

//change background color
(function (){
    var myNode = document.querySelector("article")
    var colorArray = ["#FF5D54", "#2EA8F6", "#53CC2F", "#F26B13", "#3847EB","#ADCC2F","#ADCC2F"];
    var index =0;
    
    myNode.addEventListener("mouseover",function color(e){
           if(e.target.tagName === "DIV"){ 
        var box= e.target;    
        function changeColor(){
            box.style.background=colorArray[index];
        index++;
        if(index >= colorArray.length){
            index = 0;
        }  
            
         }
            
        var change=setInterval(changeColor,1000); 
               
     box.addEventListener("mouseout",function(d){
         clearInterval(change);
         
         switch(d.target.className){
             case "box1":
                 d.target.style.background="#1CAFC0";
                 break;
             case "box2":
                 d.target.style.background="#D9598A";
                 break;
            case "box3":
                 d.target.style.background="#FECA47";
                 break;
            case "box4":
                 d.target.style.background="#83C25A";
                 break;
            case "box5":
                 d.target.style.background="#F28140";
                 break;
            case "box6":
                 d.target.style.background="#9266C0";
                 break;
                }
     },false);
    }
           
        },false) 
    
     
    
})();