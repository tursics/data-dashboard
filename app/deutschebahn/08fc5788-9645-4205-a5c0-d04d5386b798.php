<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "http://data.deutschebahn.com/dataset/08fc5788-9645-4205-a5c0-d04d5386b798",
		"title": "Reisezentren-API",
		"description": "Die Reisezentren API enthält Daten der Verkaufsstellen inkl. Adressen, Koordinaten und Öffnungszeiten.Die Datengrundlage ist Äquivalent zum Datensatz [Reisezentren](http://data.deutschebahn.com/dataset/data-reisezentren)",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Michael Binzen",
		"author": "dbopendata@deutschebahn.com",
		"created": "2017-04-21",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "In Berlin Hbf hat heue ab",
		"textBottom": "das Reisezentrum offen",
<?php
	$url = 'https://api.deutschebahn.com/reisezentren/v1/reisezentren/509273'; // Reisezentrum Berlin Hbf

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);
	$day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][intval(date('N')) - 1];
	$value = 'geschlossen';

	foreach( $data['openingTimes'] as $key => $openings ) {
		if($key == $day) {
			$value = $openings[0];
		}
	}

	echo '"value": "'.explode('-', $value)[0].'",';
?>
		"unit": "Uhr",
		"changePerDay": "",
		"format": "string",
		"background": "img/museum.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "In den veröffentlichten Daten sind zu jeder Verkaufsstelle die Öffnungszeiten veröffentlicht.",
		"color": "#000000",
		"cssClass": ""
	}
}