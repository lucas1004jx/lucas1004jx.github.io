//google map
var gMapKey="AIzaSyCH7BPtKPT_s1H7afWVn7mOTsuieKkVJlA";

var map;
      function initMap() {
          var myLocation ={lat: 41.637188, lng: -4.739163}; 
        map = new google.maps.Map(document.getElementById('gMap'), {
          center: myLocation,
          zoom: 14,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        });
          
          
          var popInfo="Lucas Jin<br>Paseo Zorrila<br>Valladolid";
          var infowindow = new google.maps.InfoWindow({
          content: popInfo
        });
          
          var marker = new google.maps.Marker({
          position: myLocation,
          map: map,
          title: 'I am living around here'
        });
          
          marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }

$("textarea").tooltip();