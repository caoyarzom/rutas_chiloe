$(document).ready(function(){
//    initialize();
    geolocalizar();
    
//    detectBrowser();
});


var initialLocation;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var browserSupportFlag =  new Boolean();

function initialize() {
    //opciones del mapa
    var myOptions = {
        //el zoom con que se mostrará en el mapa
        zoom: 10,
        //el tipo de mapa
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapa_canvas"), myOptions);// crea el mapa en el div correspondiente
  
    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
        //Se cambia el valor a verdadero por que el bavegadore soporta geolocalizacion
        browserSupportFlag = true;
        //Obtiene las coordenadas a través del navegador
        navigator.geolocation.getCurrentPosition(function(position) {
            //Guarda los datos de las coordenadas 
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            $("#ver_mapa").text("Ajá! Estás en " + position.coords.latitude +","+position.coords.longitude+","+position.coords.accuracy );
            //Deja el mapa centrado de acuerdo a los datos obtenidos
            var coor = new google.maps.LatLng(-42.500,-73.650);
            map.setCenter(coor);
            //se configura la marcador dentro del mapa, indicandole las opciones de coordenadas,el mapa un titulo
//            var marker = new google.maps.Marker({
//                animation: google.maps.Animation.DROP,
//                //                 animation: google.maps.Animation.BOUNCE,
//                draggable:true,
//                position: initialLocation, 
//                map: map,
//                title:"Tu, estas Aquí",
//                icon:'images/smiley_happy.png'
//            }); 
            //--------------------------------------------------//
            downloadUrl("phpsqlajax_genxml.php", function(data) {
                var markers = data.documentElement.getElementsByTagName("marker");
                for (var i = 0; i < markers.length; i++) {
                    var name = markers[i].getAttribute("name");
                    var address = markers[i].getAttribute("address");
                    var type = markers[i].getAttribute("type");
                    var latlng = new google.maps.LatLng(parseFloat(markers[i].getAttribute("lat")),
                        parseFloat(markers[i].getAttribute("lng")));
                    var marker = createMarker(latlng, name, address, type);
                    marker.setMap(map);
                }
                google.maps.event.addListener(marker, 'click', function() {
                    var info=new google.maps.InfoWindow();
                    info.open(null);
                });
            });
        //---------------------------------------------//
        }, function() {
            //envia los datoa a la funcion error
            handleNoGeolocation(browserSupportFlag);
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
 
function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("mapa_canvas");
    
    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
}