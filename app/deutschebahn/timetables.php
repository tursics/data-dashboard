<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "https://developer.deutschebahn.com/store/apis/info?name=Timetables&version=v1&provider=DBOpenData&",
		"title": "Timetables - v1",
		"description": "BETA-TEST: A RESTful web service for timetable information for train stations operated by DB Station&Service AG.",
		"license": "others",
		"licenseURL": "http://www.bahnhof.de/bahnhof-de/nutzungsbedingungen_wbt.html",
		"attribution": "DB Station&Service AG",
		"author": "DB Station&Service AG",
		"created": "2017-07-24",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
<?php
	$url = 'https://api.deutschebahn.com/timetables/v1/plan/8011160/'.date('ymd').'/'.date('H');

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$data = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$xml = simplexml_load_string($data);
	$xml = @json_decode(@json_encode($xml),1);

	$station = $xml['@attributes']['station'];
	$platform = $xml['s'][0]['dp']['@attributes']['pp'];
	$path = $xml['s'][0]['dp']['@attributes']['ppth'];
	$category = $xml['s'][0]['tl']['@attributes']['c'];
	$number = $xml['s'][0]['tl']['@attributes']['n'];

	echo '"textTop": "'.$station.'",';
	echo '"value": "'.$category.' '.$number.'",';
	echo '"textBottom": "heute von Gleis '.$platform.'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "string",
		"background": "img/train.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Wer Live-Daten haben möchte, der kann die Informationen der Bahnhofstafeln abfragen.",
		"color": "#000000",
		"cssClass": ""
	}
}