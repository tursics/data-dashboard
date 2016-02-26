<?php
	$baseUrl = "http" . (!empty($_SERVER['HTTPS']) ? "s" : "") . "://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	$baseUrl = substr($baseUrl, 0, strrpos($baseUrl, '/'));
	$baseUrl = substr($baseUrl, 0, strrpos($baseUrl, '/'));
	$ret = [];

	$city = '';
	$mail = '';
	if(isset($_GET['city'])) {
		$city = trim(htmlspecialchars($_GET[ 'city']));
		$path = '../' . $city . '/cityConfig.json';
		if(file_exists($path)) {
			$cityConfig = json_decode(file_get_contents($path), true);
			$mail = $cityConfig['meta']['mail'];
			$ret['city'] = $city;
		}
	}

	$filename = '';
	if(isset($_GET['filename'])) {
		$filename = trim(htmlspecialchars($_GET[ 'filename']));
		$ret['filename'] = $filename;
	}

	$file = '';
	if(isset($_GET['file'])) {
		$file = trim($_GET[ 'file']) . "\r\n";
		$ret['file'] = $file;
	}

	if(($city != '') && ($mail != '') && ($filename != '') && ($file != '')) {
		$data = json_decode($file, true);
		$mime_boundary = "-----=" . md5(uniqid(mt_rand(), 1));
		$subject = 'Dashboard ' . $data['location']['city'] . ': ' . $data['portal']['title'];
		$from = $mail;

		$header  = "From:" . strip_tags($from) . "\r\n";
		$header .= "Reply-To:" . strip_tags($from) . "\r\n";
		$header .= "MIME-Version: 1.0\r\n";
		$header .= "Content-Type: multipart/mixed;\r\n";
		$header .= " boundary=\"" . $mime_boundary . "\"\r\n";

		$css = "@font-face {font-family: 'judsonmedium';src: url('$baseUrl/fonts/judson-regular-webfont.eot');src: url('$baseUrl/fonts/judson-regular-webfont.eot?#iefix') format('embedded-opentype'),url('$baseUrl/fonts/judson-regular-webfont.woff2') format('woff2'),url('$baseUrl/fonts/judson-regular-webfont.woff') format('woff'),url('$baseUrl/fonts/judson-regular-webfont.ttf') format('truetype'),url('$baseUrl/fonts/judson-regular-webfont.svg#judsonmedium') format('svg');font-weight: normal;font-style: normal;}";
		$css .= "@font-face {font-family: 'judsonitalic';src: url('$baseUrl/fonts/judson-italic-webfont.eot');src: url('$baseUrl/fonts/judson-italic-webfont.eot?#iefix') format('embedded-opentype'),url('$baseUrl/fonts/judson-italic-webfont.woff2') format('woff2'),url('$baseUrl/fonts/judson-italic-webfont.woff') format('woff'),url('$baseUrl/fonts/judson-italic-webfont.ttf') format('truetype'),url('$baseUrl/fonts/judson-italic-webfont.svg#judsonitalic') format('svg');font-weight: normal;font-style: normal;}";

		$cid = md5($data['front']['background']);
		$message  = '<html><head><title>' . $subject . '</title><style type="text/css">' . $css . '</style></head><body style="padding:0;margin:0;">';
		$message .= '<section style="height:7.4em;margin:4.1em 1em 4.1em 1em;position:relative;width:12.6em;font-family:\'judsonitalic\',Arial,sans-serif;font-size:12pt;">';
		$message .=   '<div style="height:100%;position:absolute;width:100%;">';
		$message .=     '<figure style="background:transparent;display:block;height:100%;margin:0;position:absolute;width:100%;">';
//		$message .=       '<img src="cid:' . $cid . '" style="border:0;vertical-align:middle;position:absolute;left:0;top:-3.6em;width:100%;z-index:-1;">';
		$message .=       '<img src="' . $baseUrl . '/' . $data['front']['background'] . '" style="border:0;vertical-align:middle;position:absolute;left:0;top:-3.6em;width:100%;z-index:-1;">';
		$message .=       '<div style="color:' . $data['front']['color'] . ';line-height:1.2em;padding-top:1.1em;white-space:nowrap;height:100%;overflow:hidden;margin:0 .2em 0 .2em;text-align:center;">';
		$message .=         $data['front']['textTop'] . '<br><span style="font-family:\'judsonmedium\',Arial,sans-serif;font-size:2.8em;line-height:1em;">' . $data['front']['value'] . ' ' . $data['front']['unit'] . '</span><br>' . $data['front']['textBottom'];
		$message .=       '</div>';
		$message .=     '</figure>';
		$message .=   '</div>';
		$message .= '</section>';
		$message .= '<div style="padding:1em;">Dieses Hexagon wurde gerade an dich übermittelt. Bitte füge die angehängte JSON-Datei dem Repository hinzu.</div>';
		$message .= '</div></body></html>';

		$content  = "This is a multi-part message in MIME format.\r\n\r\n";

		$content .= "--" . $mime_boundary . "\r\n";
		$content .= "Content-Type: text/html charset=\"utf-8\"\r\n";
		$content .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
		$content .= $message . "\r\n";

		$content .= "--" . $mime_boundary . "\r\n";
		$content .= "Content-Disposition: attachment;\r\n";
		$content .= "\tfilename=\"" . $filename . "\";\r\n";
		$content .= "Content-Length: ." . strlen($file) . ";\r\n";
		$content .= "Content-Type: text/json; name=\"" . $filename . "\"\r\n";
		$content .= "Content-Transfer-Encoding: base64\r\n\r\n";
		$content .= chunk_split(base64_encode($file)) . "\r\n";

/*		$img = '../' . $data['front']['background'];
		if(file_exists($img)) {
			$file = file_get_contents($img);
			$img = explode('/',$img);
			$img = $img[count($img) - 1];

			$content .= "--" . $mime_boundary . "\r\n";
			$content .= "Content-Type: image/svg+xml; name=\"" . $img . "\"\r\n";
			$content .= "Content-ID: <" . $cid . ">\r\n";
			$content .= "Content-Transfer-Encoding: base64\r\n";
			$content .= "Content-Disposition: inline;\r\n";
			$content .= "\tfilename=\"" . $img . "\";\r\n\r\n";
			$content .= chunk_split(base64_encode($file)) . "\r\n";
		}*/

		mail( $mail, $subject, $content, $header);

		$ret['status'] = 'success';
	} else {
		$ret['status'] = 'error';
	}

	echo json_encode($ret);
?>
