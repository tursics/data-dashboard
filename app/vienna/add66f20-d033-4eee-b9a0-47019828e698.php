<?php header( 'Access-Control-Allow-Origin: *'); ?>
{
	"location": {
		"country": "Austria",
		"city": "Wien"
	},
	"portal": {
		"url": "https://www.data.gv.at/katalog/dataset/add66f20-d033-4eee-b9a0-47019828e698",
		"title": "Wiener Linien - Echtzeitdaten",
		"description": "Echtzeitdaten der Wiener Linien. Der Developer-API-Key, kann über folgendes Formular beantragt werden: https://www.wien.gv.at/formularserver2/user/formular.aspx?pid=3b49a23de1ff43efbc45ae85faee31db&pn=B0718725a79fb40f4bb4b7e0d2d49f1d1 ",
		"license": "Creative Commons Namensnennung Lizenz",
		"licenseURL": "http://creativecommons.org/licenses/by/3.0/de/",
		"attribution": "Wiener Linien GmbH & Co KG",
		"author": "post@wienerlinien.at",
		"created": "2013-08-28",
		"updated": "2016-02-29"
	},
	"front": {
	"textTop": "Treppen laufen!",
<?php
	$keyDebug = 'Ow2xzSXEjv';
	$keyRelease = 'f8qseeIyK7';

	$url = 'http://www.wienerlinien.at/ogd_realtime/trafficInfoList?sender='.$keyDebug.'&name=aufzugsinfo';
	$json = file_get_contents($url);
	$data = json_decode($json, TRUE);
	$count = 0;

	if(1 == count($data)) {
		$data = $data['data']['trafficInfos'];
		$count = count($data);
	}

	echo '"value": "'.$count.'",';
	if(1 == $count) {
		echo '"textBottom": "Aufzug ist außer Betrieb",';
	} else {
		echo '"textBottom": "Aufzüge sind außer Betrieb",';
	}
?>
		"unit": "",
		"changePerDay": "",
		"format": "int",
		"background": "img/busstop.svg",
		"color": "#008033"
	},
	"back": {
		"text": "Die Echtzeitdaten der Wiener Linien enthalten nicht nur die aktuellen Daten zu den Aufzügen.",
		"color": "#000000",
		"cssClass": ""
	}
}