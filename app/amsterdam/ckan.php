<?php
	header( 'Access-Control-Allow-Origin: *');
	echo file_get_contents( 'http://data.amsterdam.nl/api/3/action/package_list');
?>
