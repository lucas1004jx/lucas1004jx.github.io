$(".carousel").carousel({
    interval:3000,
    pause:"hover"
});
/*to top function*/
(function(){
    var btn = document.querySelector("#toTop button");
    function top(){
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
    }
    btn.addEventListener("click",top,false);
    
    window.addEventListener("scroll",function(){
        
        if(document.body.scrollTop > 250 || document.documentElement.scrollTop > 250){
            btn.style.display ="block";
           }else{
               
               btn.style.display="none";
           }
        
    });
    
})()