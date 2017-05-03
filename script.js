
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