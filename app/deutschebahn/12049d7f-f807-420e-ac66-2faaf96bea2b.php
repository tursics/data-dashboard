<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "http://data.deutschebahn.com/dataset/12049d7f-f807-420e-ac66-2faaf96bea2b",
		"title": "Fahrplan API",
		"description": "Diese API stellt Fahrplandaten, im ersten Schritt den SOLL-Fahrplan des Fernverkehrs, zur Verfügung. ",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Michael Binzen",
		"author": "DBOpenData@deutschebahn.com",
		"created": "2016-06-13",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
<?php
	$now = str_replace(' ', 'T', date("Y-m-d H:i:s"));
	$url = 'https://api.deutschebahn.com/fahrplan-plus/v1/departureBoard/008011160?date='.$now; // Berlin Hbf (tief)

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);
	$train = '';
	$datetime = 0;
	$city = '';

	$departure = $data[0];
	$train = $departure['name'];
	$datetime = $departure['dateTime'];
	$detailsId = $departure['detailsId'];

	$url = 'https://api.deutschebahn.com/fahrplan-plus/v1/journeyDetails/'.urlencode($detailsId);

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);

	$journey = $data[sizeof($data) - 1];
	$city = $journey['stopName'];

	echo '"textTop": "Berlin Hbf: nächster Zug in",';
	echo '"textBottom": "nach '.$city.'",';
	echo '"value": "'.$datetime.'",';
?>
		"unit": "min",
		"changePerDay": "",
		"format": "datetime",
		"background": "img/train.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Der Soll-Fahrplan der Deutschen Bahn wird über eine API zur Verfügung gestellt.",
		"color": "#000000",
		"cssClass": ""
	}
}