(function(){
    
    var hourHand=document.querySelector("#hour");
    var minHand=document.querySelector("#min");
    var secHand=document.querySelector("#sec");
    
    clock();
    function clock(){
    //---------------get current date-----------------
    var date = new Date();
    var hr=date.getHours();
    var min=date.getMinutes();
    var sec=date.getSeconds();
    
    //-------------turn hr min sec to deg-------------------
    var hrPo = (hr+min/60+sec/3600)*360/12;
    var minPo = (min+sec/60)*360/60;
    var secPo=sec*360/60;
        
       
    //-------------------rotate hr min sec hand--------------
    hourHand.style.transform="rotate(" + hrPo +"deg)";
    minHand.style.transform="rotate(" + minPo +"deg)";
    secHand.style.transform="rotate(" + secPo +"deg)";
        
    }
    
    setInterval(clock,1000);
    
})()
