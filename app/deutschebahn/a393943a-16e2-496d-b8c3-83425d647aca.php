<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "http://data.deutschebahn.com/dataset/a393943a-16e2-496d-b8c3-83425d647aca",
		"title": "Betriebsstellen-API",
		"description": "Das Betriebsstellenverzeichnis (DS 100) ist eine Liste aller “Betriebsstellen” der Deutschen Bahn.Die Datengrundlage ist Äquivalent zum Datensatz [Betriebsstellen](http://data.deutschebahn.com/dataset/data-betriebsstellen)",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Michael Binzen",
		"author": "dbopendata@deutschebahn.com",
		"created": "2017-04-21",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "Berlin-Ostkreuz besteht aus",
		"textBottom": "Betriebsstellen",
<?php
	$url = 'https://api.deutschebahn.com/betriebsstellen/v1/betriebsstellen?name=ostkreuz';

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);

	echo '"value": "'.sizeof($data).'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "int",
		"background": "img/museum.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Eine API für Informationen zu jeder Betriebsstelle findet man hier: <button type='button' class='btn btn-default btn-xs btn-data' data-url='http://data.deutschebahn.com/dataset/a393943a-16e2-496d-b8c3-83425d647aca'><i class='dashboardicon'>&#xe809;</i></button>",
		"color": "#000000",
		"cssClass": ""
	}
}