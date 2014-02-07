<?php

require_once('PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));
require("phpsqlajax_dbinfo.php");
//require ('menu_redir.php');

$tipo = $_GET['tipo'];
//$tipo = 'fuerte';
// Start XML file, create parent node
//$doc = domxml_new_doc("1.0");
$doc = new DOMDocument("1.0", "UTF-8");
$doc->encoding = 'utf-8';
//$node = $doc->create_element("markers");
$node = $doc->createElement("markers");
$parnode = $doc->appendChild($node);

// Opens a connection to a mySQL server
$connection = mysql_connect("localhost", $username, $password);
if (!$connection) {
    die('Not connected : ' . mysql_error());
}

// Set the active mySQL database
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
    die('Can\'t use db : ' . mysql_error());
}

// Select all the rows in the markers table
$query = "SELECT * FROM `markers`where type= '$tipo'";
//$query = "SELECT * FROM `markers` WHERE type= '$tipo'";
$result = mysql_query($query);
if (!$result) {
    die('Consulta Invalida: ' . mysql_error());
}

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
while ($row = @mysql_fetch_assoc($result)) {
    // ADD TO XML DOCUMENT NODE
    $node = $doc->createelement("marker");
    $newnode = $parnode->appendchild($node);

    $newnode->setattribute("name", utf8_encode($row['name']));
    $newnode->setattribute("address", utf8_encode($row['address']));
    $newnode->setattribute("lat", $row['lat']);
    $newnode->setattribute("lng", $row['lng']);
    $newnode->setattribute("type", utf8_encode($row['type']));
}

if ($tipo == 'fuerte') {
    header('Location:ubicacion_fuertes_espanoles_chiloe.html');
    echo $doc->saveXML();
    $doc->save('fuerteXml.xml');
} else if ($tipo == 'iglesia') {
    header('Location:ubicacion_iglesias_patrimoniales_chiloe.html');
    echo $doc->saveXML();
    $doc->save('iglesiasXml.xml');
} else if ($tipo == 'parque') {
    header('Location:ubicacion_parques_de_chiloe.html');
    echo $doc->saveXML();
    $doc->save('parquesXml.xml');
}else if ($tipo == 'mirador') {
    header('Location:ubicacion_miradores_comunas_chiloe.html');
    echo $doc->saveXML();
    $doc->save('miradorXml.xml');
}
