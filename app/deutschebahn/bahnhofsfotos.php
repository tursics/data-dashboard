<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "https://developer.deutschebahn.com/store/apis/info?name=Bahnhofsfotos&version=v1&provider=DBOpenData&",
		"title": "Bahnhofsfotos - v1",
		"description": " Backend Service for the https://play.google.com/store/apps/details?id=de.bahnhoefe.deutschlands.bahnhofsfotos App of the Bahnhofsfotos opendata Project http://www.railway-stations.org/.",
		"license": "Eigentümer",
		"licenseURL": "Eigentümer",
		"attribution": "DBOpenData",
		"author": "",
		"created": "2017-07-24",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "Freiwillige sammeln",
		"textBottom": "Fotos von Bahnhöfen",
<?php
	$url = 'https://api.deutschebahn.com/bahnhofsfotos/v1/de/stats';

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);

	echo '"value": "'.$data['withPhoto'].'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "int",
		"background": "img/family.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Die Freiwilligen sammeln Bahnhofsfotos in freien CC-0 und CC-BY Lizenzen.",
		"color": "#000000",
		"cssClass": ""
	}
}