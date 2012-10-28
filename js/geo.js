function geolocalizar(){
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
            map.setCenter(initialLocation);
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