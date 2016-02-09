<?php
	header( 'Access-Control-Allow-Origin: *');
	echo file_get_contents( 'http://daten.berlin.de/datensaetze/rss.xml');
?>
