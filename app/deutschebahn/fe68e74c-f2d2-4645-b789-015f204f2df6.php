<?php header( 'Access-Control-Allow-Origin: *'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "http://data.deutschebahn.com/dataset/fe68e74c-f2d2-4645-b789-015f204f2df6",
		"title": "ADAM",
		"description": "Betriebszustand von Aufzügen.",
		"license": "Creative Commons Namensnennung Lizenz - unter gleichen Bedingungen",
		"licenseURL": "http://creativecommons.org/licenses/by-sa/3.0/de/",
		"attribution": "Michael Binzen",
		"author": "DBOpenData​@deutschebahn.com",
		"created": "2016-06-13",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "Treppen laufen!",
		"textBottom": "Aufzüge sind außer Betrieb",
<?php
	$url = 'http://adam.noncd.db.de/api/v1.0/facilities';

//	$json = file_get_contents( $url );
	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);
	$count = 0;

	foreach( $data as $elevator ) {
		// ACTIVE, INACTIVE, UNKNOWN
		if( "INACTIVE" == trim($elevator['state'])) {
			++$count;
		}
	}

	echo '"value": "'.$count.'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "int",
		"background": "img/busstop.svg",
		"color": "#008033"
	},
	"back": {
		"text": "Die Echtzeitdaten der Deutschen Bahn zeigen den aktuellen Zustand von Aufzügen und Rolltreppen",
		"color": "#000000",
		"cssClass": ""
	}
}