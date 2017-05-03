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
var toTop=document.getElementById("toTop");
window.onscroll=function(){
    
    toTop.style.display="inline-block";
};

function disppear (){
     var width = 0;
    // get the width.. more cross-browser issues
    if (window.innerHeight) {
        width = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        width = document.documentElement.clientWidth;
    } else if (document.body) {
        width = document.body.clientWidth;
    }
    if(width < 600){
        
       toTop.style.display="none";
       }
    
    
}

window.onresize=function(){
    
    disppear();
};