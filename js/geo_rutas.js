var directionDisplay;
var directionsService = new google.maps.DirectionsService();

function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    alert('start '+start)
    alert('end '+end)
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
    $('<option value='+latgeo+','+longeo+'>Mi Ubicación ('+latgeo+','+longeo+')</option>').appendTo("#start");   
});