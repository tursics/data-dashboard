<?php
	header( 'Access-Control-Allow-Origin: *');
	echo file_get_contents( 'http://offenedaten-koeln.de/api/3/action/current_package_list_with_resources');
?>
