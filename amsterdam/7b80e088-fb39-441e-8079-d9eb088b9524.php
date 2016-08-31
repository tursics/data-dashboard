<?php header( 'Access-Control-Allow-Origin: *'); ?>
{
	"location": {
		"country": "Netherlands",
		"city": "Amsterdam"
	},
	"portal": {
		"url": "http://data.amsterdam.nl/dataset/7b80e088-fb39-441e-8079-d9eb088b9524",
		"title": "Kleine werkzaamheden openbare ruimte",
		"description": "<p>In MOOR, het Meldpunt Opbrekingen Openbare Ruimte, worden kleine werkzaamheden (kleiner dan 10 m² in beslag nemen, korter dan 10 meter of korter duren dan 3 dagen) van telecombedrijven en van werkzaamheden die onder de Jaarvergunning WIOR vallen opgeslagen.De data uit MOOR is beschikbaar als GeoJSON-bestand, waarin o.a. locatie en geplande start- en einddatum in zijn opgenomen.Hierin zijn de werkzaamheden opgenomen waarvan zowel de start- als einddatum ligt tussen de eerste van de huidige maand en en de huidige datum   90 dagen. Deze data wordt dagelijks vernieuwd.</p>",
		"license": "",
		"licenseURL": "",
		"attribution": "MOOR   stadsdelen",
		"author": "info@amsterdamopendata.nl",
		"created": "2014-03-24",
		"updated": "2016-05-27"
	},
	"front": {
		"textTop": "Die Fußwege werden an",
		"textBottom": "Stellen repariert",
<?php
	$url = 'http://open.datapunt.amsterdam.nl/MoorRoadworks.geojson';
	$json = file_get_contents($url);
	$data = json_decode($json, TRUE);

	$roadTypeCount = array(0, 0, 0, 0, 0, 0, 0);
	$now = strtotime('now');

	foreach($data['features'] as $item) {
		if(0 < count($item['properties']['RoadTypes'])) {
			$roadTypes = reset($item['properties']['RoadTypes']);
			$startTime = strtotime($item['properties']['StartDate']);
			$endTime = strtotime($item['properties']['CompletedDate']);

			if(($startTime <= $now) && ($now <= $endTime)) {
				if( is_array($roadTypes)) {
					foreach( $roadTypes as $type) {
						++$roadTypeCount[$type];
					}
				} else {
					++$roadTypeCount[$roadTypes];
				}
			}
		}
	}

	$count = $roadTypeCount[5];

	echo '"value": "'.$count.'",';
?>
		"unit": "",
		"changePerDay": "",
		"format": "int",
		"background": "img/map.svg",
		"color": "#c83737"
	},
	"back": {
		"text": "Die aktuellen und geplanten Baustellen für Fußwege, Straßen, Brücken, Radwegen und so weiter...",
		"color": "#000000",
		"cssClass": ""
	},
	"en-US": {
		"front": {
			"textTop": "Sidewalks are repaired at",
			"textBottom": "locations"
		},
		"back": {
			"text": "The current and planned construction of sidewalks, roads, bridges, bike paths, and so on ..."
		}
	}
}