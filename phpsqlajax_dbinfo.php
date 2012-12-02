<?php
require_once('PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));
//$localhost="localhost";
$username="root";
$password="";
$database="bd_mapas";

//// Opens a connection to a mySQL server
//$connection=mysql_connect ("localhost", $username, $password);
//if (!$connection) {
//  die('Not connected : ' . mysql_error());
//}
//
//// Set the active mySQL database
//$db_selected = mysql_select_db($database, $connection);
//if (!$db_selected) {
//  die ('Can\'t use db : ' . mysql_error());
//}
//
//// Select all the rows in the markers table
//$query = "SELECT * FROM `markers`where type= '$tipo'";
////$query = "SELECT * FROM `markers` WHERE type= '$tipo'";
//$result = mysql_query($query);
//if (!$result) {
//  die('Consulta Invalida: ' . mysql_error());
//}
?>
