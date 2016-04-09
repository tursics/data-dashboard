<?php
	header( 'Access-Control-Allow-Origin: *');
	echo file_get_contents( 'https://www.offenesdatenportal.de/api/3/action/organization_activity_list?id=moers&limit=400');
?>
