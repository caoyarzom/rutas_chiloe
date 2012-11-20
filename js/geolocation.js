$(document).ready(function(){    
    initialize();
    geolocalizar();
	
    $("#start").change(function(){
        calcRoute(); 
    });
    $("#end").change(function(){
        calcRoute(); 
    });
     
console.log(errorFlag);
});
var latgeo, longeo;
var initialLocation;
var chiloe = new google.maps.LatLng(-42.500,-73.650);
var browserSupportFlag =  new Boolean();
var directionsService = new google.maps.DirectionsService();
var myOptions;
var map;
var directionDisplay;
//---------------------------Start initialize-------------------------------------------//
function initialize() {

    directionsDisplay = new google.maps.DirectionsRenderer();
    //opciones del mapa
    myOptions = {
        //el zoom con que se mostrará en el mapa
        zoom: 10,
        //el tipo de mapa
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapa_canvas"), myOptions);// crea el mapa en el div correspondiente
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    var control = document.getElementById('control');
    control.style.display = 'block';
    //    map.controls[google.maps.ControlPosition.TOP].push(control);
    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
	 
        //Se cambia el valor a verdadero por que el bavegadore soporta geolocalizacion
        browserSupportFlag = true;
         
        map.setCenter(chiloe);
        //--------------------------------------------------//
        downloadUrl("phpsqlajax_genxml.php", function(data) {
            var markers = data.documentElement.getElementsByTagName("marker");
            
            for (var i = 0; i < markers.length; i++) {
                var name = markers[i].getAttribute("name");
                var address = markers[i].getAttribute("address");
                var address1 = markers[i].getAttribute("address").split(',', 2);
                var type = markers[i].getAttribute("type");
                var latlng = new google.maps.LatLng(parseFloat(markers[i].getAttribute("lat")),
                    parseFloat(markers[i].getAttribute("lng")));
                var marker = createMarker(latlng, name, address, type);
                marker.setMap(map);
                var lat = parseFloat(markers[i].getAttribute("lat"));
                var lon = parseFloat(markers[i].getAttribute("lng"));
                $('<option value='+lat+','+lon+'>'+name+' - '+address1+'</option>').appendTo("#start");
                $('<option value='+lat+','+lon+'>'+name+' - '+address1+'</option>').appendTo("#end");
            }
            google.maps.event.addListener(marker, 'click', function() {
                var info=new google.maps.InfoWindow();
                info.open(null);
            });
        });
    // Si el navegador no soprta la Geolocalizacion
    } else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
    //Funcion que crea el marcador con su descripcion
    function createMarker(latlng, name, address, type) {
        var marker = new google.maps.Marker({
            position:latlng,
            title:type,
            icon:'images/church-2.png'
           
        });
        var html = "<b>" + name + "</b> <br/>" + address;
        var infowindow = new google.maps.InfoWindow({
            content: html
        });
        //evento que muestra la informacion
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
        
        return marker;
    } 
    function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
            alert("Geolocation service failed.");
            initialLocation = newyork;
        } else {
            alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
            initialLocation = siberia;
        }
        map.setCenter(initialLocation);
    }
   
}
//-------------------------------End Initialize----------------//
//------------------Calcular Ruta-----------------------------//

//var directionsService = new google.maps.DirectionsService();

function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    //    alert('start '+start)
    //    alert('end '+end)
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
//-----------------------------Fin Calcular Ruta ----------------------------------------------------------//
//-----------------------------Geolocalizar----------------------------------------------------------------//
function geolocalizar(){
    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
        //Se cambia el valor a verdadero por que el bavegadore soporta geolocalizacion
        browserSupportFlag = true;
        //Obtiene las coordenadas a través del navegador
        navigator.geolocation.getCurrentPosition(function(position) {
            //Guarda los datos de las coordenadas 
            latgeo = position.coords.latitude;
            longeo = position.coords.longitude;
            initialLocation = new google.maps.LatLng(latgeo,longeo);
            $("#ver_mapa").text("Ajá! Estás en "+initialLocation+","+position.coords.accuracy );
            $('<option value='+latgeo+','+longeo+'>Mi Ubicación ('+latgeo+','+longeo+')</option>').appendTo("#start");
            //Deja el mapa centrado de acuerdo a los datos obtenidos            
            map.setCenter(initialLocation);
            //            alert(initialLocation);
            //se configura la marcador dentro del mapa, indicandole las opciones de coordenadas,el mapa un titulo
            var marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                //                 animation: google.maps.Animation.BOUNCE,
                draggable:true,
                position: initialLocation, 
                map: map,
                title:"Tu, estas Aquí",
                icon:'images/smiley_happy.png'                
            }); 
            var html = "<b>Esta es tu Posición :)</b>";
        var infowindow = new google.maps.InfoWindow({
            content: html
        });
        //evento que muestra la informacion
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
         
        //---------------------------------------------//
        }, function() {
            //envia los datoa a la funcion error
            handleNoGeolocation(browserSupportFlag);
        });
    } else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}
function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Servicio de Geolocalizción ha fallado! Lo Sentimos :{");
        initialLocation = chiloe;
    } else {
        alert("Tu navegador no soporta el servicio de Geolocalizacón. Nuestro lugar se encuentra en Chile, Isla de Chiloé");
        initialLocation = chiloe;
    }
    map.setCenter(initialLocation);
    
}  
//-----------------------------Fin Geolocalizar----------------------------------------------//