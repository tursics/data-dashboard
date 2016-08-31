<?php header( 'Access-Control-Allow-Origin: *'); ?>
{
	"location": {
		"country": "Netherlands",
		"city": "Amsterdam"
	},
	"portal": {
		"url": "http://data.amsterdam.nl/dataset/a96b7a70-e44e-4dca-8664-a67b357ad499",
		"title": "Rijksmuseum API",
		"description": "Ontwikkelaars krijgen automatisch toegang tot de basiscollectie van het Rijksmuseum, ruim 100.000 objecten. Waaronder de Nachtwacht! Van alle objecten is digitaal beeldmateriaal beschikbaar. De datasets in de API komen uit het collectieregistratiesysteem van het Rijksmuseum. Alle informatie wordt dagelijks bijgewerkt en geüpdate. Als er nieuw of beter beeldmateriaal van objecten beschikbaar komt, dan wordt deze ook gelijk via de API beschikbaar gemaakt.",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Was developed using the Rijksmuseum API",
		"author": "api@rijksmuseum.nl",
		"created": "2013-05-15",
		"updated": "2013-05-15"
	},
	"front": {
		"textTop": "Alles Online:",
		"textBottom": "Werke des Rijksmuseums",
<?php
	$key = 'YG4iOCus';

	$url = 'https://www.rijksmuseum.nl/api/en/collection?key=' . $key . '&format=json&ps=1';
	$json = file_get_contents($url);
	$data = json_decode($json, TRUE);
	$count = $data['count'];

	echo '"value": "'.$count.'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "int",
		"background": "img/museum.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Dazu gibt es noch viele Infos und jede Menge Bilder. Das alles wird über eine API zur Verfügung gestellt.",
		"color": "#000000",
		"cssClass": ""
	},
	"en-US": {
		"front": {
			"textTop": "Everything is online:",
			"textBottom": "works from Rijksmuseum"
		},
		"back": {
			"text": "Plus, there's lots of information and lots of pictures. All this is provided via an API."
		}
	}
}