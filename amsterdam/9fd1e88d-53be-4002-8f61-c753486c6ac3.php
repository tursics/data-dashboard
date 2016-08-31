<?php header( 'Access-Control-Allow-Origin: *'); ?>
{
	"location": {
		"country": "Netherlands",
		"city": "Amsterdam"
	},
	"portal": {
		"url": "http://data.amsterdam.nl/dataset/9fd1e88d-53be-4002-8f61-c753486c6ac3",
		"title": "Actuele beschikbaarheid Parkeergarages",
		"description": "<p>Deze feed geeft real-time de actuele beschikbaarheid van parkeergarages en P R-terreinen in Amsterdam.</p>",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Gemeente Amsterdam, afdeling Verkeer en Openbare Ruimte",
		"author": "info.vor@amsterdam.nl",
		"created": "2014-02-14",
		"updated": "2016-02-11"
	},
	"front": {
		"textTop": "Am Museumplein sind",
		"textBottom": "der Parkplätze frei",
<?php
	$url = 'http://opd.it-t.nl/data/amsterdam/ParkingLocation.json';
	$json = file_get_contents($url);
	$data = json_decode($json, TRUE);

	$min = 0;
	$max = 0;

	foreach( $data['features'] as $item) {
		if( '900000006_parkinglocation' == $item['Id']) {
//		if( 'CE-P07 Museumplein' == $item['properties']['Name']) {
			$min = intval($item['properties']['FreeSpaceShort']) + intval($item['properties']['FreeSpaceLong']);
			$max = intval($item['properties']['ShortCapacity']) + intval($item['properties']['LongCapacity']);
		}
	}

	$perc = 0;
	if( $max > 0) {
		$perc = intval($min * 100 / $max);
	}

	echo '"value": "'.$perc.'",';
?>
		"unit": "%",
		"changePerDay": "",
		"format": "string",
		"background": "img/museum.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Die Echtzeit-Auslastungen der anderen Parkplätze, Parkhäuser und PR-Stellen gibt es hier:",
		"color": "#000000",
		"cssClass": ""
	},
	"en-US": {
		"front": {
			"textTop": "At Museumplein",
			"textBottom": "of parking lots are free"
		},
		"back": {
			"text": "The live loads of other parking lots, parking garages and PR sites can be found here:"
		}
	}
}