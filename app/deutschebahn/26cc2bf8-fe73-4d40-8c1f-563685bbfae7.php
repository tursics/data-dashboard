<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "http://data.deutschebahn.com/dataset/26cc2bf8-fe73-4d40-8c1f-563685bbfae7",
		"title": "StaDa - Stationsdaten",
		"description": "Die API ermöglicht die Abfrage von Stationsdaten der DB Station & Service AG.Mit dem Anklicken von dem Button Mehr und dann Herunterladen werden Sie an das Developer Portal der Deutschen Bahn weiter geleitet.",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Michael Binzen",
		"author": "DBOpenData@deutschebahn.com",
		"created": "2017-02-10",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "Kostenloses WLAN bieten",
		"textBottom": "Bahnhöfe an",
<?php
	$url = 'https://api.deutschebahn.com/stada/v2/stations';

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);
	$count = 0;

	foreach( $data['result'] as $station ) {
		if( $station['hasWiFi']) {
			++$count;
		}
	}

	echo '"value": "'.$count.'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "string",
		"background": "img/train.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Noch mehr Informationen von DB Station & Service zu den Bahnhöfen bietet diese API an.",
		"color": "#000000",
		"cssClass": ""
	}
}