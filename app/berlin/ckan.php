<?php
	header( 'Access-Control-Allow-Origin: *');
	header( 'Content-Type: application/json');

	// https://github.com/GovDataOfficial/GovDataPortal/blob/54b9f56d07138f32066fa12d58a4e1d94c8bd694/opendataregistry-client/src/test/resources/de/fhg/fokus/odp/registry/common/package_search_response.json
	$opts = array(
		'http'=>array(
			'method'=>"GET",
			'header'=>"Authorization: 4428f81a-c91d-4c45-bd87-037832efbb54\r\n"
		)
	);
	$context = stream_context_create($opts);
//	echo file_get_contents( 'http://datenregister.berlin.de/api/3/action/current_package_list_with_resources?offset=400', false, $context);
	echo file_get_contents( 'http://datenregister.berlin.de/api/3/action/current_package_list_with_resources?limit=500', false, $context);
?>
