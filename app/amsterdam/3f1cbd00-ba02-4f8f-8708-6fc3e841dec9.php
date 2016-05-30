<?php header( 'Access-Control-Allow-Origin: *'); ?>
{
	"location": {
		"country": "Netherlands",
		"city": "Amsterdam"
	},
	"portal": {
		"url": "http://data.amsterdam.nl/dataset/3f1cbd00-ba02-4f8f-8708-6fc3e841dec9",
		"title": "Eten en Drinken",
		"description": "<p>Alle restaurants en cafes in Amsterdam en omgeving zoals deze door het Amsterdam Marketing worden beheerd. Dit bestand wordt dagelijks vernieuwd, titels en toelichtingen in Nederlands en Engels.</p>",
		"license": "",
		"licenseURL": "",
		"attribution": "Amsterdam Marketing",
		"author": "info@iamsterdam.com",
		"created": "2013-05-16",
		"updated": "2016-05-27"
	},
	"front": {
		"textTop": "Lecker Essen und Trinken:",
		"textBottom": "in und um Amsterdam",
<?php
	$url = 'http://open.datapunt.amsterdam.nl/EtenDrinken.json';
	$json = file_get_contents($url);
	$data = json_decode($json, TRUE);

	$count = count($data);

	echo '"value": "'.$count.'",';
?>
		"unit": "x",
		"changePerDay": "",
		"format": "int",
		"background": "img/sausage.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Alle Restaurants und Cafés in Amsterdam und Umgebung, mit Name, Ort, Öffnungszeiten, ...",
		"color": "#000000",
		"cssClass": ""
	},
	"en-US": {
		"front": {
			"textTop": "Find delicious food",
			"textBottom": "in and around Amsterdam"
		},
		"back": {
			"text": "All restaurants and cafes in Amsterdam and the surrounding area, including opening hours."
		}
	}
}