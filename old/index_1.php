<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
        <link href='http://fonts.googleapis.com/css?family=Carme' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="estilos_geo.css"/>	
        <script src="geolocation.js"></script>
        <title>Google Maps AJAX + MySQL/PHP Example</title>
        <script src="https://maps.google.com/maps?file=api&v=2&key=ABQIAAAAjU0EJWnWPMv7oQ-jjS7dYxTPZYElJSBeBUeMSX5xXgq6lLjHthSAk20WnZ_iuuzhMt60X_ukms-AUg"
        type="text/javascript"></script>
        <script>
            //<![CDATA[

            var iconBlue = new GIcon(); 
            iconBlue.image = 'http://labs.google.com/ridefinder/images/mm_20_blue.png';
            iconBlue.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
            iconBlue.iconSize = new GSize(12, 20);
            iconBlue.shadowSize = new GSize(22, 20);
            iconBlue.iconAnchor = new GPoint(6, 20);
            iconBlue.infoWindowAnchor = new GPoint(5, 1);

            var iconRed = new GIcon(); 
            iconRed.image = 'http://labs.google.com/ridefinder/images/mm_20_red.png';
            iconRed.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
            iconRed.iconSize = new GSize(12, 20);
            iconRed.shadowSize = new GSize(22, 20);
            iconRed.iconAnchor = new GPoint(6, 20);
            iconRed.infoWindowAnchor = new GPoint(5, 1);

            var customIcons = [];
            customIcons["restaurant"] = iconBlue;
            customIcons["bar"] = iconRed;

            function load() {
                if (GBrowserIsCompatible()) {
                    var map = new GMap2(document.getElementById("mapa_canvas"));
                    map.addControl(new GSmallMapControl());
                    map.addControl(new GMapTypeControl());
                    map.setCenter(new GLatLng(-42.373764, -73.616638), 9);
                    

                    GDownloadUrl("phpsqlajax_genxml.php", function(data) {
                        var xml = GXml.parse(data);
                        var markers = xml.documentElement.getElementsByTagName("marker");
                        for (var i = 0; i < markers.length; i++) {
                            var name = markers[i].getAttribute("name");
                            var address = markers[i].getAttribute("address");
                            var type = markers[i].getAttribute("type");
                            var point = new GLatLng(parseFloat(markers[i].getAttribute("lat")),
                            parseFloat(markers[i].getAttribute("lng")));
                            var marker = createMarker(point, name, address, type);
                            map.addOverlay(marker);
                        }
                    });
                }
            }

            function createMarker(point, name, address, type) {
                var marker = new GMarker(
                point, 
                customIcons[type]
            );
                var html = "<b>" + name + "</b> <br/>" + address;
                GEvent.addListener(marker, 'click', function() {
                    marker.openInfoWindowHtml(html);                    
                });
                return marker;
            }
            //]]>    
        </script>
    </head>
    <body onload="load()">
        <header>

            <hgroup ><h1>Geolocalización en HTML5</h2></hgroup>
        </header>
        <section>
            <p id="ver_mapa">Dejame encontrarte!</p>
            <div id="mapa_canvas"></div>
        </section>
        <footer>Desarrollado y engendrado por @tinguinito 2011</footer>



    </body>
</html>