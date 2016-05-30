<?php header( 'Access-Control-Allow-Origin: *'); ?>
{
	"location": {
		"country": "Netherlands",
		"city": "Amsterdam"
	},
	"portal": {
		"url": "http://data.amsterdam.nl/dataset/f0672be5-5416-46e1-b4a4-e71add4a920b",
		"title": "Actuele verkeersgegevens (Nationaal)",
		"description": "<p>De NDW-databank biedt inzicht in de actuele verkeerssituatie op snelwegen, provinciale wegen en doorgaande stedelijke wegen van de deelnemende overheden.De data over actuele verkeersgegevens (intensiteit, snelheid, reistijden, voertuigcategorie&euml;n) en statusgegevens (files, wergwerkzaamheden, etc.) zijn beschikbaar in DATEXII (XML)</p>",
		"license": "",
		"licenseURL": "",
		"attribution": "Nationale Databank Wegverkeergegevens",
		"author": "info@ndw.nu",
		"created": "2014-08-28",
		"updated": "2016-02-25"
	},
	"front": {
		"textTop": "Aktuell sind",
		"textBottom": "Brücken geöffnet",
<?php
	$url = 'http://opendata.ndw.nu/brugopeningen.xml.gz';
	$zlibUrl = 'compress.zlib://'.$url;
	$xml = new XMLReader();
	$xml->open ($zlibUrl);
	$count = 0;

	while ($xml->read() && $xml->name !== 'situation');
	while ($xml->name === 'situation') {
		++$count;
		$xml->next('situation');
	}

	echo '"value": "'.$count.'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "string",
		"background": "img/water.svg",
		"color": "#ffffff"
	},
	"back": {
		"text": "Die NDW bietet Live-Daten für Brücken, Fahrstreifen, Baustellen, Unfälle und vieles mehr an.",
		"color": "#000000",
		"cssClass": ""
	},
	"en-US": {
		"front": {
			"textTop": "Currently",
			"textBottom": "bridges are open"
		},
		"back": {
			"text": "The NDW offers live data for bridges, lanes, road works, accidents and more."
		}
	}
}