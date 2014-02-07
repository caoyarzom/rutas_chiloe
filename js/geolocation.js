$(document).ready(function(){
    initialize();
    geolocalizar(); 
    cargarCombo();
    
    posicionActual();

});

var file;
var latgeo, longeo;
var initialLocation;
var chiloe = new google.maps.LatLng(-42.500,-73.650);
var browserSupportFlag =  new Boolean();
var directionsService = new google.maps.DirectionsService();
var myOptions;
var map;
var directionDisplay;
var customIcons = [];
customIcons["iglesia"] = 'images/church-2.png';
customIcons["fuerte"] = 'images/fuerte.png';
customIcons["parque"] = 'images/forest2.png';
customIcons["mirador"] = 'images/binoculars.png';
//----------------------------cargar Combobox-------//
function cargarCombo(){
    $("#start").change(function(){
        calcRoute(); 
    });
    $("#end").change(function(){
        calcRoute(); 
    });
}


//---------------------------Start initialize-------------------------------------------//
function initialize() {
    
    directionsDisplay = new google.maps.DirectionsRenderer();
    //opciones del mapa
    myOptions = {
        //el zoom con que se mostrará en el mapa
        zoom: 9,
        //el tipo de mapa
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapa_canvas"), myOptions);// crea el mapa en el div correspondiente
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    var control = document.getElementById('control');
    control.style.display = 'block';
    //    map.controls[google.maps.ControlPosition.TOP].push(control);
    map.setCenter(chiloe);
    
    // Try W3C Geolocation (Preferred)
    //Se cambia el valor a verdadero por que el bavegadore soporta geolocalizacion
    browserSupportFlag = true;
        
    //--------------------------------------------------//
     var path = window.location.pathname.split('/',4); //obtiene el pathname //rutas_chiloe/ubi...html En hosting se coloca 4
//   alert(path[path.length-1] + " pathname")
    console.log(path);
    if (path[path.length-1] == "ubicacion_fuertes_espanoles_chiloe.html"){
        file = "fuerteXml.xml";
     //   alert("fuerte "+file)
    }else if(path[path.length-1] == "ubicacion_iglesias_patrimoniales_chiloe.html"){
        file = "iglesiasXml.xml";
       // alert("iglesia "+file)
    }else if(path[path.length-1] == "ubicacion_parques_de_chiloe.html"){
        file = "parquesXml.xml";
       // alert("iglesia "+file)
    }else if(path[path.length-1] == "ubicacion_miradores_comunas_chiloe.html"){
        file = "miradorXml.xml";
       // alert("iglesia "+file)
    }
   
    downloadUrl(file, function(data) {
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
    //            google.maps.event.addListener(marker, 'click', function() {
    //                var info=new google.maps.InfoWindow();
    //                info.open(null);
    //            });
    });
    // Si el navegador no soprta la Geolocalizacion
    
    //Funcion que crea el marcador con su descripcion
    function createMarker(latlng, name, address, type) {
        var marker = new google.maps.Marker({
            position:latlng,
            title:type,
            //            icon:'images/church-2.png',
            icon:customIcons[type]
            
           
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
    
   
}
//-------------------------------End Initialize----------------//
//------------------Calcular Ruta-----------------------------//

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
    
    //Se cambia el valor a verdadero por que el bavegadore soporta geolocalizacion
    //        browserSupportFlag = true;
    //Obtiene las coordenadas a través del navegador
    if(latgeo != "" & longeo != "")
        navigator.geolocation.getCurrentPosition(mostrarMapa, err);
} 
        
function mostrarMapa(position) {
    //Guarda los datos de las coordenadas 
    latgeo = position.coords.latitude;
    longeo = position.coords.longitude;
    initialLocation = new google.maps.LatLng(latgeo,longeo);
    $("#ver_mapa").text("Ajá! Estás en Lat-Long "+initialLocation+" márgen de error "+position.coords.accuracy+" mts." );
    $('<option value='+latgeo+','+longeo+'>Mi Ubicación ('+latgeo+','+longeo+')</option>').appendTo("#start");
    //Deja el mapa centrado de acuerdo a los datos obtenidos
        var norte = new google.maps.LatLng(-41.78369722222222, -73.69047222222223);
        var sur = new google.maps.LatLng(-43.52104722222222, -74.17047500000001);
    if (latgeo <= -41.78369722222222 && latgeo >= -43.52104722222222  ){

    console.log(""+initialLocation+" >= "+norte+"&&"+initialLocation+" <= "+sur );          
    map.setCenter(initialLocation);
    //alert("Bienvenido a Chiloé");
    $("#info_geo").text("Bienvenido a Chiloé" );
        }
    else{
    console.log("Inicio >="+initialLocation+"Chiloe "+chiloe);
    map.setCenter(chiloe);
    $("#info_geo").text("Lo siento, la geolocalizacion es solo en Chiloé :(, pero puedes recorrer las rutas!" );
    //alert("Lo siento, la geolocalizacion es solo en Chiloé :(, pero puedes recorrer las rutas!");
        }
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

}
//---------------------------------------------//
function err(err) {
    console.log(err);
    //envia los datos    a la funcion error
    handleNoGeolocation(browserSupportFlag);
      
    if (err.code == 0) {
        alert("Oops! Algo ha salido mal");
        map.setCenter(initialLocation);
    }
    if (err.code == 1) {
        alert("Oops! No has aceptado compartir tu posición");
        map.setCenter(initialLocation);
    }
    if (err.code == 2) {
        alert("Oops! No se puede obtener la posición actual");
        map.setCenter(initialLocation);
    }
    if (err.code == 3) {
        alert("Oops! Hemos superado el tiempo de espera");
        map.setCenter(initialLocation);
    }
        
        
}   



//-----------------------------Fin Geolocalizar----------------------------------------------//
//-----------------------------Ver Posicion Actual----------------------------------------------//

function posicionActual(){
    var watchID = null;

    // PhoneGap esta lista
    //
  
    // Actualizar cada 3 segundos
    var options = {
        frequency: 3000
    };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

// Función onSuccess
//
function onSuccess(newPosition) {
    var element = document.getElementById('#ver_mapa');
    var newLatgeo = newPosition.coords.latitude;
    var newLongeo = newPosition.coords.longitude;
    var InitialLocation = new google.maps.LatLng(newLatgeo,newLongeo);
        
    $("#ver_mapa").text("Ajá! Estás en "+InitialLocation+","+newPosition.coords.accuracy );
    
//        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
//                            'Longitude: ' + position.coords.longitude     + '<br />' +
//                            '<hr />'      + element.innerHTML;
}

// Función onError
//
function onError(error) {
    alert('código: '    + error.code    + '\n' +
        'mensaje: ' + error.message + '\n');
}
//-----------------------------Fin Posicion Actual----------------------------------------------//