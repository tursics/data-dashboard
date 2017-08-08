<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "http://data.deutschebahn.com/dataset/b07f4050-2150-4f39-959c-16d0c12edf85",
		"title": "Flinkster API",
		"description": "**Allgemein**Die Flinkster API NG stellt eine Beauskunftungsschnittstelle von Mobilitätsdienstleistungen der Flinkster Plattform zur Verfügung. Sie ermöglichtdie Suche nach Mietstandorten und verfügbaren Mietobjekten bspw. für Angebote aus dem Car- und Bikesharing.Eine detailierte Beschreibung finden sie **[hier](\thttps://s3.eu-central-1.amazonaws.com/download-data.deutschebahn.com/static/apis/flinkster/Schnittstellenspezifikation_FlinksterApiNG.pdf)**.",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Vertriebspartnermanagement DB Rent GmbH ",
		"author": "partner@flinkster.de",
		"created": "2016-12-16",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "Am Frankfurter Hbf stehen",
		"textBottom": "Flinkster Autos bereit",
<?php
	$url = 'https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=50.107432&lon=8.664387&radius=1&providernetwork=1';

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);

	echo '"value": "'.$data['size'].'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "int",
		"background": "img/market.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Die Flinkster-API basiert auf REST und verwendet für die Aufrufe die HTTP Standard-Verben.",
		"color": "#000000",
		"cssClass": ""
	}
}