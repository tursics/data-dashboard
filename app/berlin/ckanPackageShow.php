<?php
	header( 'Access-Control-Allow-Origin: *');
	header( 'Content-Type: application/json');

	if(!isset($_GET['id'])) {
		echo 'Parameter "id" missing.';
	} else {
		// https://github.com/GovDataOfficial/GovDataPortal/blob/54b9f56d07138f32066fa12d58a4e1d94c8bd694/opendataregistry-client/src/test/resources/de/fhg/fokus/odp/registry/common/package_search_response.json
		$opts = array(
			'http'=>array(
				'method'=>"GET",
				'header'=>"Authorization: 4428f81a-c91d-4c45-bd87-037832efbb54\r\n"
			)
		);
		$context = stream_context_create($opts);
		echo file_get_contents( 'http://datenregister.berlin.de/api/3/action/package_show?id='.$_GET['id'], false, $context);
	}
?>
