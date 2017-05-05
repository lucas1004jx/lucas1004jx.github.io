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
}