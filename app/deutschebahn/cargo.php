<?php header( 'Access-Control-Allow-Origin: *'); header('Content-Type: application/json'); ?>
{
	"location": {
		"country": "Germany",
		"city": "Deutsche Bahn"
	},
	"portal": {
		"url": "https://developer.deutschebahn.com/store/apis/info?name=Cargo-Delay-Statistics&version=v1&provider=DBOpenData&",
		"title": "Cargo-Delay-Statistics - v1",
		"description": " This API gives you statistical data for delays of trains. ",
		"license": "Eigentümer",
		"licenseURL": "Eigentümer",
		"attribution": "DBOpenData",
		"author": "",
		"created": "2017-07-24",
		"updated": "<?php echo date("Y-m-d"); ?>"
	},
	"front": {
		"textTop": "In Berlin-Karow gab es vor",
		"textBottom": "die meisten Verspätungen",
<?php
	$url = 'https://api.deutschebahn.com/cargo/v1/delays/80031443';

	$curl_handle = curl_init();
	curl_setopt( $curl_handle, CURLOPT_URL, $url );
	curl_setopt( $curl_handle, CURLOPT_CONNECTTIMEOUT, 2 );
	curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $curl_handle, CURLOPT_USERAGENT, 'Datenwaben - datenwaben.de' );
	curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array('Authorization: Bearer 2b344cb863ad6086779ba76dd628f9fd'));
	$json = curl_exec( $curl_handle );
	curl_close( $curl_handle );

	$data = json_decode($json, TRUE);
	$theDate = '';
	$theDelay = 0;

	foreach( $data['delays'] as $date => $item ) {
		if($theDelay < $item['delay']) {
			$theDelay = $item['delay'];
			$theDate = $date;
		}
	}

	echo '"value": "'.$theDate.'",';
?>
		"unit": "Tagen",
		"changePerDay": "",
		"format": "date",
		"background": "img/train.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Die DB Cargo hat eine API ihrer Verspätungen pro Station erstellt.",
		"color": "#000000",
		"cssClass": ""
	}
}