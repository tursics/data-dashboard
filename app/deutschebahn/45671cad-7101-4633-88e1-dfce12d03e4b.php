<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "http://data.deutschebahn.com/dataset/45671cad-7101-4633-88e1-dfce12d03e4b",
		"title": "FaSta - Station Facilities Status",
		"description": "Die API ermöglicht die Abfrage des Betriebszustandes von Aufzügen und Rolltreppen in Bahnhöfen der DB Station & Service AG.Mit dem Anklicken von dem Button Mehr und dann Herunterladen werden Sie an das [Developer Portal](https://developer.deutschebahn.com/store/apis/list) der Deutschen Bahn weiter geleitet.",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Michael Binzen",
		"author": "DBOpenData@deutschebahn.com",
		"created": "2016-11-15",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "Treppen laufen!",
		"textBottom": "Aufzüge sind außer Betrieb",
<?php
	$url = 'https://api.deutschebahn.com/fasta/v1/facilities?state=INACTIVE';

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);
	$count = sizeof($data);

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