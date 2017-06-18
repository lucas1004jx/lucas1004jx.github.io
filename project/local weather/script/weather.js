//operweather api  0b723ce4aade68f38bd6fb0ae3303df4
//{lat: 41.637188, lng: -4.739163}
//google geo api AIzaSyAnIcTjsNB5mCVOHW7KUuJVIR9kFV1G28E
//var url= "https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY";

$(function(){
    var lat=0;
    var lng=0;
    var url="";
    var api="0b723ce4aade68f38bd6fb0ae3303df4";
   
    
    
    function getInfo(){
        
       $.get(url + "&appid=" + api).done(function(response){
        console.log(response);
        weatherInfo(response);
    }); 
    }
    
    
    function weatherInfo(response){
        var condition = response.weather[0].main;
        var maxDegC = Math.floor(response.main.temp_max-273.15);
        var minDegC = Math.floor(response.main.temp_min-273.15);
        var maxDegF = maxDegC*1.8+32;
        var minDegF = minDegC*1.8+32;
        var humidity = response.main.humidity + "%";
        var city=response.name;
        var info ="You are in "+city+"<br>Current weather condition is:"+condition+"<br>Max temperature is: "+ maxDegC + "&#176;C/" + maxDegF +"&#176;F"+"<br>Min temperature is: "+ minDegC + "&#176;C/" + minDegF +"&#176;F" +"<br>The humidity is: "+ humidity;
        $("#weather").html("<p>" + info + "</p>");
    }
    
    function getLocation(){
        
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(function(position){
            lat =position.coords.latitude;
            lng =position.coords.longitude;
               
            url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng;
             console.log(url);  
           },function(){
              $("#weather").html("<p>can´t get your location</p>");
           });
           }
       
    }
});
  

  



