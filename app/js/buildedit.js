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
		str += '<div class="panel panel-info">';
		str += '<div class="panel-heading"><h3 class="panel-title">Datenquelle</h3></div>';
		str += '<div class="panel-body">';
		{ // content
			str += '<a href="#" class="btn btn-primary" type="button" id="buttonOpen" target="_blank">Webseite öffnen</a>';
  		}
		str += '</div>';
		str += '</div>';
		str += '</div>';
	}
	str += '</div>';

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

	fillBuildCard(cardObj);
}

//-----------------------------------------------------------------------

function fillBuildCard(obj)
{
	if('new' == obj.status) {
		$('#inputFrontTop').val(obj.title).change();
		$('#inputBackTop').val(obj.description).change();
		$('#buttonOpen').attr('href', obj.link);
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
	});
}

//-----------------------------------------------------------------------
