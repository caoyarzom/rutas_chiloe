$(window).ready(function(){
    geolocalizar();
});
var lat, lon;
function geolocalizar()
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(mostrarMapa,errorMapa);
         
    }
}
function mostrarMapa(datos)
{
    
    lat = datos.coords.latitude;
    lon = datos.coords.longitude;
    $("#ver_mapa").text("Ajá! Estás en " + lat +","+lon);
    var coordenada = new google.maps.LatLng(lat,lon);
    var opciones ={
        center: coordenada,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.satelitte
    };
    var mapa = new google.maps.Map(document.getElementById("mapa_canvas"),opciones);
    var opcionesChinche = {
        position: coordenada,
        map: mapa,
        title: "Coordenadas de bombardeo"
    };
    var chinche = new google.maps.Marker(opcionesChinche);
}
function errorMapa(errorsh)
{
    $("#ver_mapa").text("Explorador no compatible!");
}



//-------------------------------------------------------------------------------//
 