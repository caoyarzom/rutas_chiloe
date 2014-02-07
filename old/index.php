<?php
require_once('PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));
$fuerte = 'fuerte';
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <title>Rutas de Chiloé</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="@tinguinito" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <!-- <link rel="stylesheet" type="text/css" href="css/demo.css" />-->
        <link rel="stylesheet" type="text/css" href="css/style_menu_rutas.css" />
        <link rel="stylesheet" type="text/css" href="css/estilo_menu_footer.css" />
        <link rel="stylesheet" type="text/css" href="css/estilos_geo.css" />
        <link href='http://fonts.googleapis.com/css?family=Terminal+Dosis' rel='stylesheet' type='text/css' />
    </head>
    <body>
        <header>
            <hgroup>
                <h1><a href="index.php">Rutas de Chiloé</a></h1>

            </hgroup>
            <p id="sub_h1"> Falta un eslogan!</p>
        </header>


        <div id="container_menu_rutas">
            <div id="menu_derecha">
                <ul class="roundabout-holder">
                    <li class="roundabout-moveable-item">
                        <h2 class="">¿Qué es "Rutas de Chiloé"?</h2>
                        <h3 class="">¡La nueva forma de recorrer la Magia del Archipielago de Chiloé!</h3>
                        <p class="capitalLetter">Las <strong>Rutas de Chiloé</strong> es una idea, que desea entregar información sobre
                            los lugares más cognotados, através de las nuevas tecnologías web.</p>
                        <p>Esta idea nace, con el objetivo de cubrir la necesiad de información respecto a nuestra isla,
                            recorrer nuestro lugares más significativos disfrutando del hermoso paisaje y misterios que nos rodean :)</p>
                    </li>
                    <li class="roundabout-moveable-item">
                        <h2 class="">¿Qué tecnología usamos?</h2>
                        <h3 class="">¡Al alcance de tu mano!</h3>
                        <p class="capitalLetter">Con el desarrollo de nuevas tecnologías web y las capacidades de HTML5 hemos logrado integrar
                            el poder de los Mapas de Google con una herramienta muy poderosa llamada Geolocalización</p>
                        <p>Estas características las tienen la gran mayoria de dispositivos móviles que possen conexión a internet
                            vía Redes Móviles, Wi-Fi y GPS </p>
                        <p>Entonces que esperas! conecta tu Smartphone, Notebook, tablets o cualquier dispositivo que tengas!</p>
                        <p><strong>Comienza ahora a planificar tu Ruta!</strong></p>

                    </li>
                    <li class="roundabout-moveable-item">
                        <h2>¿Cómo funciona?</h2>
                        <h3 >¡Muy Simple!</h3>
                        <p class="capitalLetter">Para disfrutar del encanto nuestra isla debes:</p>
                        <ul>
                            <li> Tener muchas ganas de conocer Chiloé y sus encantos</li>
                            <li>Estar dispuesto a disfrutar nuestro clima Tropical</li>
                            <li>Impregnarse con la Magia del Sur</li>
                            <li>Y por supuesto, un dispositivo móvil con conexión a internet </li>
                        </ul>
                        <p>Más...</p>
                    </li>

                </ul>

            </div>
          

                <ul class="ca-menu">
                    <li>
                        <a href="phpsqlajax_genxml.php?tipo=iglesia" >
                         
                            <span class="ca-icon">S</span>
                            <div class="ca-content">
                                <h2 class="ca-main">Ruta Iglesias Patrimoniales</h2>
                                <h3 class="ca-sub">Tour de la Aquitectura Jesuita</h3>
                            </div>
                        </a>
                    </li>
                    <li>
                        
                        <a href="phpsqlajax_genxml.php?tipo=fuerte">
<!--                            <a href="ubicacion_fuertes_espanoles_chiloe.html">-->
                           
                            <span class="ca-icon">I</span>
                            <div class="ca-content">
                                <h2 class="ca-main">Ruta la Defensa Española</h2>
                                <h3 class="ca-sub">Fuertes Españoles de Chiloé</h3>
                            </div>
                        </a>
<!--                        <a href="phpsqlajax_genxml.php?tipo=fuerte" hidden=""></a>-->
                    </li>
                    <li>
                        <a href="phpsqlajax_genxml.php?tipo=parque">
                            <span class="ca-icon">S</span>
                            <div class="ca-content">
                                <h2 class="ca-main">Rutas de los Parques</h2>
                                <h3 class="ca-sub">Contacto con la Naturaleza</h3>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="ca-icon">d</span>
                            <div class="ca-content">
                                <h2 class="ca-main">Rutas de los Miradores</h2>
                                <h3 class="ca-sub">Observa Chiloé de las AlturasS</h3>
                            </div>
                        </a>
                    </li>
                </ul>
              
        </div><!-- content -->

        <footer>
            <div id="container_menu_footer">   
                <ul id="paneltwo">
                    <li class="mask"><h3>MENU &gt;</h3></li>
                    <li class="linkOne"><a href="index.html">Inicio</a></li>
                    <li class="linkTwo"><a href="l">Idea</a></li>
                    <li class="linkThree"><a href="#">Contacto</a></li>
                    <li class="linkFour"><a href="#">¿..? Frecuentes</a></li>
                    <!-- <li class="linkFive"><a href="#">Link 5</a></li>-->
                </ul>
            </div>
        </footer>

        <script src="js/jquery-1.7.1.min.js"></script>  
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script src="js/jquery.roundabout.js"></script>
                 <script>
            $(document).ready(function() {
                $('.roundabout-holder').roundabout();
              
            });
            
             
        </script>

        <!--        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>-->
    </body>
</html>