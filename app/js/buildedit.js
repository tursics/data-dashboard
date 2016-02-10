//-----------------------------------------------------------------------

function buildCards(cardObj)
{
	var front = 'Ein Text<br><span>Text</span><br>Ein Text';
	var frontTextColor = 'color:white;';
	var frontBGImage = 'img/blueprintcard.svg';
	var frontCSSClass = '';
	createNewCard({
		front:{text:front,image:frontBGImage,style:frontTextColor,css:frontCSSClass+' display'},
		data:{value:'Text',unit:'',change:1,formatter:stringValueFormatter},
	});

	var back = 'Beschreibungstext';
	var backTextColor = 'color:white;';
	var backBGImage = '';
	var backCSSClass = 'blueprint';
	createNewCard({
		front:{text:back,image:backBGImage,style:backTextColor,css:backCSSClass},
	});

	var str = '';

	str += '<br>';

	{ // template themes
		str += '<div class="panel panel-info">';
		str += '<div class="panel-heading"><h3 class="panel-title">Aussehen</h3></div>';
		str += '<div class="panel-body">';
		{ // content
			str += '<div class="row row-horizon">';

			for(var i = 0; i < config.templates.length; ++i) {
				var theme = config.templates[i];

				str += '<div class="col-xs-3 col-md-2">';
				str += '<a href="#" class="thumbnail" data-template="' + i + '"><img src="' + theme.frontBackground + '" alt=""></a>';
				str += '</div>';
			}

			str += '</div>';
		}
		str += '</div>';
		str += '</div>';
	}
	str += '<div class="row">';
	{ // left 'front card side'
		str += '<div class="col-sm-6">';
		str += '<div class="panel panel-info">';
		str += '<div class="panel-heading"><h3 class="panel-title">Vorderseite</h3></div>';
		str += '<div class="panel-body">';
		{ // top
			str += '<div class="input-group">';
			str += '<span class="input-group-addon" id="basic-addon1">Oben</span>';
			str += '<input type="text" class="form-control" id="inputFrontTop" placeholder="Ein Text" aria-describedby="basic-addon1">';
			str += '</div>';
			str += '<br>';
		}
		{ // middle (first line)
			str += '<div class="row">';

			str += '<div class="col-sm-8">';
			str += '<div class="input-group">';

			str += '<div class="input-group-btn">';
			str += '<button class="btn btn-default dropdown-toggle" type="button" id="inputFrontFormat" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
			str += 'Text <span class="caret"></span></button>';
			str += '<ul class="dropdown-menu">';
			str += '<li><a href="#" id="inputFrontFormatText">Text</a></li>';
			str += '<li><a href="#" id="inputFrontFormatInt">Ganzzahl</a></li>';
			str += '<li><a href="#" id="inputFrontFormatEuro">Euro-Betrag</a></li>';
			str += '<li><a href="#" id="inputFrontFormatDate">Datum</a></li>';
			str += '</ul>';
			str += '</div>';

			str += '<input type="text" class="form-control" id="inputFrontMiddle" placeholder="Text" aria-describedby="basic-addon1">';

			str += '</div>';
			str += '</div>';

			str += '<div class="col-sm-4">';
			str += '<div class="input-group">';
			str += '<input type="text" class="form-control" id="inputFrontUnit" placeholder="Einheit" aria-describedby="basic-addon1">';
			str += '</div>';
			str += '</div>';

			str += '</div>';
		}
		{ // middle (second line)
			str += '<div class="input-group">';
			str += '<span class="input-group-addon" id="basic-addon1">Änderung pro Tag</span>';
			str += '<input type="text" class="form-control" id="inputFrontChange" placeholder="Eine Zahl" aria-describedby="basic-addon1">';
			str += '</div>';
			str += '<br>';
		}
		{ // bottom
			str += '<div class="input-group">';
			str += '<span class="input-group-addon" id="basic-addon1">Unten</span>';
			str += '<input type="text" class="form-control" id="inputFrontBottom" placeholder="Ein Text" aria-describedby="basic-addon1">';
			str += '</div>';
		}
		str += '</div>';
		str += '</div>';
		str += '</div>';
	}
	{ // right 'back card side'
		str += '<div class="col-sm-6">';
		str += '<div class="panel panel-info">';
		str += '<div class="panel-heading"><h3 class="panel-title">Datenquelle</h3></div>';
		str += '<div class="panel-body" style="text-align:center;">';
		{ // content
			str += '<div class="input-group">';
			str += '<span class="input-group-addon" id="basic-addon1">Link</span>';
			str += '<input type="text" class="form-control" id="inputMetaLink" placeholder="Link zur Datenportal-Seite" aria-describedby="basic-addon1">';
			str += '<span class="input-group-btn">';
			str += '<a href="#" class="btn btn-primary" type="button" id="buttonOpen" target="_blank">Öffnen</a>';
			str += '</span>';
			str += '</div>';
  		}
		str += '</div>';
		str += '</div>';
		str += '<div class="panel panel-info">';
		str += '<div class="panel-heading"><h3 class="panel-title">Rückseite</h3></div>';
		str += '<div class="panel-body">';
		{ // content
			str += '<div class="input-group">';
			str += '<span class="input-group-addon" id="basic-addon1">Text</span>';
			str += '<input type="text" class="form-control" id="inputBackTop" placeholder="Beschreibungstext" aria-describedby="basic-addon1">';
			str += '</div>';
		}
		str += '</div>';
		str += '</div>';
		str += '</div>';
	}
	str += '</div>';
	{ // metadata
		str += '<div class="panel panel-info">';
		str += '<div class="panel-heading"><h3 class="panel-title">Metadaten</h3></div>';
		str += '<div class="panel-body">';
		{ // content
			str += '<div class="row">';
			{ // left side
				str += '<div class="col-sm-6">';

				str += '<div class="input-group">';
				str += '<span class="input-group-addon" id="basic-addon1">Titel</span>';
				str += '<input type="text" class="form-control" id="inputMetaTitle" placeholder="Titel des Datensatzes" aria-describedby="basic-addon1">';
				str += '</div>';
				str += '<br>';

				str += '<div class="input-group">';
				str += '<span class="input-group-addon" id="basic-addon1">Text</span>';
				str += '<input type="text" class="form-control" id="inputMetaDescription" placeholder="Beschreibung zum Datensatz" aria-describedby="basic-addon1">';
				str += '</div>';
				str += '<br>';

				str += '<div class="row">';
				str += '<div class="col-sm-7">';

				str += '<div class="input-group">';
				str += '<span class="input-group-addon" id="basic-addon1">Urheber</span>';
				str += '<input type="text" class="form-control" id="inputMetaAttribution" placeholder="Name" aria-describedby="basic-addon1">';
				str += '</div>';

				str += '</div>';
				str += '<div class="col-sm-5">';

				str += '<input type="text" class="form-control" id="inputMetaMail" placeholder="E-Mail-Adresse" aria-describedby="basic-addon1">';

				str += '</div>';
				str += '</div>';

				str += '</div>';
			}
			{ // right side
				str += '<div class="col-sm-6">';

				str += '<div class="input-group">';
				str += '<span class="input-group-addon" id="basic-addon1">Lizenz</span>';
				str += '<div class="input-group-btn">';
				str += '<button class="btn btn-default dropdown-toggle" type="button" id="inputMetaLicense" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
				str += 'Andere Lizenz <span class="caret"></span></button>';
				str += '<ul class="dropdown-menu">';
				str += '<li><a href="#" id="inputMetaLicenseCCBY">CC BY, Creative Commons Namensnennung</a></li>';
				str += '<li><a href="#" id="inputMetaLicenseCCBYSA">CC BY-SA, Creative Commons Namensnennung unter gleichen Bedingungen</a></li>';
				str += '<li><a href="#" id="inputMetaLicenseOther">Andere Lizenz</a></li>';
				str += '</ul>';
				str += '</div>';
				str += '</div>';
				str += '<br>';

				str += '<div class="input-group">';
				str += '<span class="input-group-addon" id="basic-addon1">Erzeugt</span>';
				str += '<input type="text" class="form-control" id="inputMetaCreated" placeholder="Datum der Erzeugung des Datensatzes" aria-describedby="basic-addon1">';
				str += '</div>';
				str += '<br>';

				str += '<div class="input-group">';
				str += '<span class="input-group-addon" id="basic-addon1">Geändert</span>';
				str += '<input type="text" class="form-control" id="inputMetaUpdated" placeholder="Datum der letzten Änderung des Datensatzes" aria-describedby="basic-addon1">';
				str += '</div>';

				str += '</div>';
			}
			str += '</div>';
		}
		str += '</div>';
		str += '</div>';
	}
	{ // action buttons
		str += '<div class="panel panel-info">';
		str += '<div class="panel-body" style="text-align:center;">';
		{ // content
			str += '<button class="btn btn-primary" type="button" id="inputButtonOK">Speichern</button>';
			str += '&nbsp;&nbsp;&nbsp;';
			str += '<button class="btn btn-default" type="button" id="inputButtonCancel">Abbrechen</button>';
		}
		str += '</div>';
		str += '</div>';
	}

	$('#build').html( str);

	function setFormat(buttonText, placeholder, formatter)
	{
		$('#inputFrontFormat').html(buttonText+' <span class="caret"></span>');
		$('#inputFrontMiddle').attr('placeholder',placeholder);
		config.updates[0].formatter = formatter;
	}

	$('#inputFrontMiddle').change(function() {
		config.updates[0].value = $(this).val();
	});
	$('#inputFrontUnit').change(function() {
		config.updates[0].unit = $(this).val();
	});
	$('#inputFrontChange').change(function() {
		config.updates[0].change = $(this).val();
	});
	$('#inputFrontFormatText').click(function() {
		setFormat('Text', 'Text', stringValueFormatter);
	});
	$('#inputFrontFormatInt').click(function() {
		setFormat('Ganzzahl', 'Zahl', intValueFormatter);
	});
	$('#inputFrontFormatEuro').click(function() {
		setFormat('Euro-Betrag', 'Zahl', euroValueFormatter);
	});
	$('#inputFrontFormatDate').click(function() {
		setFormat('Datum', 'JJJJ-MM-TT', dateValueFormatter);
	});
	$('#inputFrontTop').change(function() {
		var elem = config.updates[0].dom.parent();
		var arr = elem.html().split('<span>');
		elem.html( $(this).val()+'<br><span>'+arr[1]);
		config.updates[0].dom = $('span',elem);
	});
	$('#inputFrontBottom').change(function() {
		var elem = config.updates[0].dom.parent();
		var arr = elem.html().split('</span>');
		elem.html( arr[0]+'</span><br>'+$(this).val());
		config.updates[0].dom = $('span',elem);
	});
	$('#inputBackTop').change(function() {
		var elem = $('div figure.front div', config.elements[1]);
		elem.html( $(this).val());
	});
	$('a.thumbnail').click(function() {
		var template = config.templates[$(this).data('template')];
		var elem = config.updates[0].dom.parent();
		elem.attr('style', '' == template.frontColor ? '' : 'color:' + template.frontColor);
		elem = elem.parent();
		$('img', elem).attr('src', template.frontBackground);

		elem = $('div figure.front div', config.elements[1]);
		elem.attr('style', '' == template.backColor ? '' : 'color:' + template.backColor);
		elem = elem.parent();
		elem.removeClass().addClass('front').addClass(template.backClass);

		return false;
	});
	$('#inputMetaLicenseCCBY').click(function() {
		$('#inputMetaLicense').html('CC BY <span class="caret"></span>');
	});
	$('#inputMetaLicenseCCBYSA').click(function() {
		$('#inputMetaLicense').html('CC BY-SA <span class="caret"></span>');
	});
	$('#inputMetaLicenseOther').click(function() {
		$('#inputMetaLicense').html('Andere Lizenz <span class="caret"></span>');
	});
	$('#inputButtonOK').click(function() {
		saveBuildCardToCSV();
	});
	$('#inputButtonCancel').click(function() {
		resetCards();
		getUpdates(config.data.feed);
	});

	fillBuildCard(cardObj);
}

//-----------------------------------------------------------------------

function fillBuildCard(obj)
{
	if('new' == obj.status) {
		$('#inputFrontTop').val(obj.title).change();
		$('#inputBackTop').val(obj.description).change();
		$('#buttonOpen').attr('href', obj.link);
		$('#inputMetaLink').val(obj.link).change();

		fillBuildCardWithMetadata();
	} else {
		fillBuildCardByOldValues(obj.json)
	}
}

//-----------------------------------------------------------------------

function fillBuildCardByOldValues(url)
{
	function fillData(data)
	{
		data = data || {};
		data.front = data.front || {};
		data.front.textTop = data.front.textTop || '';
		data.front.textButton = data.front.textButton || '';
		data.front.value = data.front.value || '';
		data.front.unit = data.front.unit || '';
		data.front.changePerDay = data.front.changePerDay || '';
		data.front.format = data.front.format || '';
		data.front.background = data.front.background || '';
		data.front.color = data.front.color || '';
		data.front.cssClass = data.front.cssClass || '';
		data.back = data.back || {};
		data.back.text = data.back.text || '';
		data.back.color = data.back.color || '';
		data.back.background = data.back.background || '';
		data.back.cssClass = data.back.cssClass || '';

		if('date'==data.front.format) {
			$('#inputFrontFormatDate').click();
		} else if('euro'==data.front.format) {
			$('#inputFrontFormatEuro').click();
		} else if('int'==data.front.format) {
			$('#inputFrontFormatInt').click();
		} else {
			$('#inputFrontFormatText').click();
		}
		$('#inputFrontMiddle').val(data.front.value).change();
		$('#inputFrontUnit').val(data.front.unit).change();
		$('#inputFrontChange').val(data.front.changePerDay).change();
		$('#inputFrontTop').val(data.front.textTop).change();
		$('#inputFrontBottom').val(data.front.textButton).change();
		$('#inputBackTop').val(data.back.text).change();
		$('#buttonOpen').attr('href', data.portal.url);
		$('#inputMetaLink').val(data.portal.url).change();

		var template = config.templates[$(this).data('template')];
		var elem = config.updates[0].dom.parent();
		elem.attr('style', '' == data.front.color ? '' : 'color:' + data.front.color);
		elem = elem.parent();
		$('img', elem).attr('src', data.front.background);

		elem = $('div figure.front div', config.elements[1]);
		elem.attr('style', '' == data.back.color ? '' : 'color:' + data.back.color);
		elem = elem.parent();
		elem.removeClass().addClass('front').addClass(data.back.cssClass);
	}

	$.ajax(url)
	.done(function(json){
		var data = jQuery.parseJSON(json);
		fillData(data);
	})
	.fail(function(jqXHR, textStatus){
		if('parsererror'==textStatus) {
			var data = jQuery.parseJSON(jqXHR.responseText);
			if( typeof data.location != 'undefined') {
				fillData(data);
				return;
			}
		}

		$('#inputFrontTop').val('Es ist ein').change();
		$('#inputFrontFormatText').click();
		$('#inputFrontMiddle').val('Fehler').change();
		$('#inputFrontBottom').val('aufgetreten').change();
		$('#inputBackTop').val('Error in reading ' + url).change();
	})
	.always(function(){
		fillBuildCardWithMetadata();
	});
}

//-----------------------------------------------------------------------

function fillBuildCardWithMetadata()
{
	function fillData(data)
	{
		data = data || {};
		data.link = data.link || '';
		data.name = data.name || '';
		data.description = data.description || '';
		data.licenseUrl = data.licenseUrl || '';
		data.licenseName = data.licenseName || '';
		data.created = data.created || '';
		data.modified = data.modified || '';
		data.attribution = data.attribution || '';
		data.mail = data.mail || '';

		if('http://creativecommons.org/licenses/by/3.0/de/'==data.licenseUrl) {
			$('#inputMetaLicenseCCBY').click();
		} else if('http://creativecommons.org/licenses/by-sa/3.0/de/'==data.licenseUrl) {
			$('#inputMetaLicenseCCBYSA').click();
		} else {
			$('#inputMetaLicenseOther').click();
		}
		$('#inputMetaLink').val(data.link).change();
		$('#buttonOpen').attr('href', data.link);
		$('#inputMetaTitle').val(data.name).change();
		$('#inputMetaDescription').val(data.description).change();
		$('#inputMetaAttribution').val(data.attribution).change();
		$('#inputMetaMail').val(data.mail).change();
		$('#inputMetaCreated').val(data.created).change();
		$('#inputMetaUpdated').val(data.modified).change();
	}

	var url = $('#inputMetaLink').val();
	url = 'berlin/metadata.php?url=' + encodeURI(url);
	if('' == url) {
		return;
	}

	$.ajax(url)
	.done(function(json){
		var data = jQuery.parseJSON(json);
		fillData(data);
	})
	.fail(function(jqXHR, textStatus){
		if('parsererror'==textStatus) {
			var data = jQuery.parseJSON(jqXHR.responseText);
			if( typeof data.location != 'undefined') {
				fillData(data);
				return;
			}
		}

		$('#inputFrontTop').val('Es ist ein').change();
		$('#inputFrontFormatText').click();
		$('#inputFrontMiddle').val('Fehler').change();
		$('#inputFrontBottom').val('aufgetreten').change();
		$('#inputBackTop').val('Error in reading ' + url).change();
	})
	.always(function(){
	});
}

//-----------------------------------------------------------------------

function saveBuildCardToCSV()
{
	var data = {
'location':{
	'country':'Germany',
	'city':'Berlin',
	'districts':{
		'Berlin':false,
		'Mitte':false,
		'FriedrichshainKreuzberg':false,
		'Pankow':false,
		'CharlottenburgWilmersdorf':false,
		'Spandau':false,
		'SteglitzZehlendorf':false,
		'TempelhofSchoeneberg':false,
		'Neukoelln':false,
		'TreptowKoepenick':false,
		'MarzahnHellersdorf':false,
		'Lichtenberg':false,
		'Reinickendorf':false
	}
},
		'portal':{
			'url':$('#inputMetaLink').val(),
			'title':$('#inputMetaTitle').val(),
			'description':$('#inputMetaDescription').val(),
			'license':'',
			'licenseURL':'',
			'attribution':$('#inputMetaAttribution').val(),
			'author':$('#inputMetaMail').val(),
			'created':$('#inputMetaCreated').val(),
			'updated':$('#inputMetaUpdated').val()
		},
		'front':{
			'textTop':$('#inputFrontTop').val(),
			'textButton':$('#inputFrontBottom').val(),
			'value':$('#inputFrontMiddle').val(),
			'unit':$('#inputFrontUnit').val(),
			'changePerDay':$('#inputFrontChange').val(),
'format':"date",
'background':"img/template.svg",
'color':"#ffffff"
		},
		'back':{
			'text':$('#inputBackTop').val(),
'color':"#000000",
'cssClass':""
		}
	};

	var license = $('#inputMetaLicense').html().split('<span')[0].trim();
	if('CC BY' == license) {
		data.portal.license = 'Creative Commons Namensnennung';
		data.portal.licenseURL = 'http://creativecommons.org/licenses/by/3.0/de/';
	} else if('CC BY-SA' == license) {
		data.portal.license = 'Creative Commons Namensnennung unter gleichen Bedingungen';
		data.portal.licenseURL = 'http://creativecommons.org/licenses/by-sa/3.0/de/';
	}

	var str = JSON.stringify(data);
	console.log(str);
	console.log(data);
	alert('Geht noch nicht');
}

//-----------------------------------------------------------------------
