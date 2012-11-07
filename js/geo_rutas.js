var directionDisplay;
      var directionsService = new google.maps.DirectionsService();

//      function initialize() {
//        directionsDisplay = new google.maps.DirectionsRenderer();
//        var mapOptions = {
//          zoom: 8,
//          mapTypeId: google.maps.MapTypeId.ROADMAP,
//          center: new google.maps.LatLng(-42.500,-73.650)
//        };
//        var map = new google.maps.Map(document.getElementById('map_canvas'),
//            mapOptions);
//        directionsDisplay.setMap(map);
//        directionsDisplay.setPanel(document.getElementById('directions-panel'));
//
//        var control = document.getElementById('control');
//        control.style.display = 'block';
//        map.controls[google.maps.ControlPosition.TOP].push(control);
//      }

      function calcRoute() {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        //alert(start)
        //alert(end)
        var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      }

//      google.maps.event.addDomListener(window, 'load', initialize);
      // carga select con datos xml extraidos de la BD
      downloadUrl("phpsqlajax_genxml.php", function(data) {
            var markers = data.documentElement.getElementsByTagName("marker");
            for (var i = 0; i < markers.length; i++) {
                var name = markers[i].getAttribute("name");
                var address = markers[i].getAttribute("address").split(',', 2);
                var lat = parseFloat(markers[i].getAttribute("lat"));
                var lon = parseFloat(markers[i].getAttribute("lng"));
                $('<option value='+lat+','+lon+'>'+name+' - '+address+'</option>').appendTo("#start");
                $('<option value='+lat+','+lon+'>'+name+' - '+address+'</option>').appendTo("#end");
                
            }
            
        });