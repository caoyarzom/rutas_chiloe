

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
            var velocidad = position.coords.speed;
            var vector = position.coords.heading;
            var altitud = position.coords.accuracy;
            initialLocation = new google.maps.LatLng(latgeo,longeo);

            $("#ver_mapa").text("Ajá! Estás en "+initialLocation+","+position.coords.accuracy );
            //Deja el mapa centrado de acuerdo a los datos obtenidos            
            map.setCenter(initialLocation);

            $("#ver_mapa").text("Ajá! Estás en Latitud" + latgeo +" Longitud"+longeo+" Altitud "+altitud+" Velocidad "+velocidad+" Vector "+vector );
            //Deja el mapa centrado de acuerdo a los datos obtenidos
            
            mapa.setCenter(initialLocation);

            alert(initialLocation);
            //se configura la marcador dentro del mapa, indicandole las opciones de coordenadas,el mapa un titulo
            var marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                //                 animation: google.maps.Animation.BOUNCE,
                draggable:true,
                position: initialLocation, 
                map: mapa,
                title:"Tu, estas Aquí",
                icon:'images/smiley_happy.png'                
            }); 
         
        //---------------------------------------------//
        }, function() {
            //envia los datos    a la funcion error
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
        mapa.setCenter(initialLocation);
    }  