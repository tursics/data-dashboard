<?php header( 'Access-Control-Allow-Origin: *'); ?>
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
	$authKey = 'DBhackFrankfurt0316';
//	$url = 'https://open-api.bahn.de/bin/rest.exe/location.name?authKey=' . $authKey . '&format=json&input=Berlin';
	$url = 'https://open-api.bahn.de/bin/rest.exe/departureBoard?authKey=' . $authKey . '&format=json&id=008011160'; // Berlin Hbf (tief)

	$json = file_get_contents( $url );
/*	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );*/

	$data = json_decode($json, TRUE);
	$train = '';
	$datetime = 0;
	$city = '';

	foreach( $data['DepartureBoard']['Departure'] as $departure ) {
		$train = $departure['name'];
		$datetime = $departure['date'] . ' ' . $departure['time'];
		$city = $departure['direction'];

		break;
	}
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