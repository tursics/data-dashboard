<?php
	header('Access-Control-Allow-Origin: *');

	// -----------------------------------------------------------------------------------

	function getInfoPageMetadata($link)
	{
		$contents = file_get_contents($link);
		$ret = array();
		$ret['link'] = $link;

		$posContent = strpos($contents, 'id="content"');
		$posSidebar = strpos($contents, 'id="sidebar_right"');
		$strContent = substr($contents, $posContent, $posSidebar - $posContent);

		$posName = strpos($strContent, '>', strpos($strContent, '<h1')) + 1;
		if(false === $posName) {
			return $ret;
		}
		$strName = substr($strContent, $posName, strpos($strContent, '</h1>', $posName) - $posName);
		$ret['name'] = trim(strip_tags( $strName));

		$posDescription = strpos($strContent, 'field-name-field-notes');
		$posDescription = strpos($strContent, '>', strpos($strContent, '<p', $posDescription)) + 1;
		$strDescription = trim(substr($strContent, $posDescription, strpos($strContent, '</p>', $posDescription) - $posDescription));
		$ret['description'] = trim(strip_tags( $strDescription));

		$posLicUrl = strpos($strContent, 'href=', strpos($strContent, 'Lizenz:')) + strlen('href=');
		$strLicUrl = substr($strContent, $posLicUrl + 1, strpos($strContent, substr($strContent, $posLicUrl, 1), $posLicUrl + 1) - $posLicUrl - 1);
		$ret['licenseUrl'] = trim(strip_tags( $strLicUrl));

		$posLicName = strpos($strContent, '>', $posLicUrl) + strlen('>');
		$strLicName = trim(substr($strContent, $posLicName, strpos($strContent, '</a', $posLicName) - $posLicName));
		$ret['licenseName'] = trim(strip_tags( $strLicName));

		$posCreated = strpos($strContent, 'ffentlicht:');
		$posCreated = strpos($strContent, '>', strpos($strContent, '<span', $posCreated)) + 1;
		$strCreated = substr($strContent, $posCreated, strpos($strContent, '</span>', $posCreated) - $posCreated);
		$date = DateTime::createFromFormat('d.m.Y', $strCreated);
		if( false !== $date) {
			$ret['created'] = $date->format('Y-m-d');
		}

		$posModified = strpos($strContent, 'Aktualisiert:');
		$posModified = strpos($strContent, '>', strpos($strContent, '<span', $posModified)) + 1;
		$strModified = substr($strContent, $posModified, strpos($strContent, '</span>', $posModified) - $posModified);
		$date = DateTime::createFromFormat('d.m.Y', $strModified);
		if( false !== $date) {
			$ret['modified'] = $date->format('Y-m-d');
		}

		$posAttribution = strpos($strContent, 'href=', strpos($strContent, 'ffentlichende Stelle:')) + strlen('href=');
		$posAttribution = strpos($strContent, '>', $posAttribution) + strlen('>');
		$strAttribution = trim(substr($strContent, $posAttribution, strpos($strContent, '</a', $posAttribution) - $posAttribution));
		$ret['attribution'] = $strAttribution;

		$posMail = strpos($strContent, 'Mail Kontakt:');
		$posMail = strpos($strContent, '>', strpos($strContent, '<div', $posMail)) + 1;
		$posMail = strpos($strContent, '>', strpos($strContent, '<div', $posMail)) + 1;
		$strMail = trim(substr($strContent, $posMail, strpos($strContent, '</div>', $posMail) - $posMail));
		$strMail = str_replace(' AT ', '@', $strMail);
		$ret['mail'] = trim($strMail);

		return $ret;
	}
	// -----------------------------------------------------------------------------------

	if(!isset($_GET['url'])) {
		echo 'Parameter "url" missing.';
	} else {
		$url = $_GET['url'];

		echo(json_encode(getInfoPageMetadata($url)));
	}
?>
