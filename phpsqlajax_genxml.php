<?php
require("phpsqlajax_dbinfo.php");

// Start XML file, create parent node
//$doc = domxml_new_doc("1.0");
$doc = new DOMDocument("1.0","UTF-8");
$doc->encoding ='utf-8';
//$node = $doc->create_element("markers");
$node = $doc->createElement("markers");
$parnode = $doc->appendChild($node);

// Opens a connection to a mySQL server
$connection=mysql_connect ("localhost", $username, $password);
if (!$connection) {
  die('Not connected : ' . mysql_error());
}

// Set the active mySQL database
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}

// Select all the rows in the markers table
$query = "SELECT * FROM markers WHERE 1";
$result = mysql_query($query);
if (!$result) {
  die('Invalid query: ' . mysql_error());
}

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
while ($row = @mysql_fetch_assoc($result)){
  // ADD TO XML DOCUMENT NODE
  $node = $doc->createelement("marker");
  $newnode = $parnode->appendchild($node);

  $newnode->setattribute("name", utf8_encode($row['name']));
  $newnode->setattribute("address", utf8_encode($row['address']));
  $newnode->setattribute("lat", $row['lat']);
  $newnode->setattribute("lng", $row['lng']);
  $newnode->setattribute("type", utf8_encode($row['type']));
}

//$xmlfile = $doc->dump_mem();
//echo $xmlfile;
//$doc_utf8= utf8_encode($doc);

echo $doc->saveXML();

?>
