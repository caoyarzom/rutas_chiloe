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
            //Deja el mapa centrado de acuerdo a los datos obtenidos            
            map.setCenter(initialLocation);
            alert(initialLocation);
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
            alert("Geolocation service failed.");
            initialLocation = newyork;
        } else {
            alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
            initialLocation = siberia;
        }
        map.setCenter(initialLocation);
    }  