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
	var backBGImage = 'img/blueprintcard.svg';
	var backCSSClass = '';
	createNewCard({
		front:{text:back,image:backBGImage,style:backTextColor,css:backCSSClass},
	});

	var str = '';

	str += '<br>';

	str += '<div class="row">';
	str += '<div class="col-sm-6">';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">Vorderseite</h3></div>';
	str += '<div class="panel-body">';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">Oben</span>';
	str += '<input type="text" class="form-control" id="inputFrontTop" placeholder="Ein Text" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '<br>';

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

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">Änderung pro Tag</span>';
	str += '<input type="text" class="form-control" id="inputFrontChange" placeholder="Eine Zahl" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '<br>';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">Unten</span>';
	str += '<input type="text" class="form-control" id="inputFrontBottom" placeholder="Ein Text" aria-describedby="basic-addon1">';
	str += '</div>';

	str += '</div>';
	str += '</div>';
	str += '</div>';
//	"background":"img/template.svg",
//	"color":"#ffffff",
//	"cssClass":""

	str += '<div class="col-sm-6">';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">Rückseite</h3></div>';
	str += '<div class="panel-body">';
	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">Text</span>';
	str += '<input type="text" class="form-control" id="inputBackTop" placeholder="Beschreibungstext" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	str += '</div>';
//	"background":"",
//	"color":"#000000",
//	"cssClass":""

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
//	$('#inputBackTop').change(function() {
//		var elem = config.updates[1].dom.parent();
//		elem.html( $(this).val());
//		config.updates[1].dom = $('span',elem);
//	});

	buildCardFill(cardObj);
}

//-----------------------------------------------------------------------

function buildCardFill(obj)
{
	if('new' == obj.status) {
		$('#inputFrontTop').val(obj.title).change();
		$('#inputBackTop').val(obj.description).change();
	} else {
		
	}

	console.log(obj);
}

//-----------------------------------------------------------------------
