//-----------------------------------------------------------------------

function getUpdates(url)
{
	var str = '';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">Suche nach Updates</h3></div>';
	str += '<div class="panel-body">';

	str += '<div class="progress">';
	str += '<div id="progressSuccess" class="progress-bar progress-bar-success" style="width:0%;"></div>';
	str += '<div id="progressWarning" class="progress-bar progress-bar-warning" style="width:0%;"></div>';
	str += '<div id="progressInfo" class="progress-bar progress-bar-info" style="width:0%;"></div>';
	str += '<div id="progressDanger" class="progress-bar progress-bar-danger" style="width:0%;"></div>';
	str += '<div id="progressBar" class="progress-bar progress-bar-striped active" style="width:100%;"></div>';
	str += '</div>';

	str += '</div>';
	str += '</div>';

	str += '<div id="datasettable"></div>';

	$('#build').html( str);

	$.ajax(url)
	.done(function(data){
		config.feed = new Array();
		var xml = $(data);
		xml.find('item').each(function() {
			var node = $(this);

			var elemTitle = document.createElement('textarea');
			elemTitle.innerHTML = node.find('title').text().trim();
			var elemDesc = document.createElement('textarea');
			elemDesc.innerHTML = node.find('description').text().trim();

			var item = {
				title: elemTitle.value,
				link: node.find('link').text().trim(),
				description: elemDesc.value,
				pubDate: node.find('pubDate').text().trim(),
				author: node.find('author').text().trim(),
				json: '',
				status: 'new'
			};
			if(('' == item.link) && (typeof node.find('link')[0].nextSibling.data != 'undefined')) {
				item.link = node.find('link')[0].nextSibling.data.trim();
			}
			var pubDate = new Date(Date.parse(item.pubDate));
			var feedDate = pubDate.getFullYear();
			if(pubDate.getMonth()<9) {
				feedDate += '-0' + (pubDate.getMonth()+1);
			} else {
				feedDate += '-' + (pubDate.getMonth()+1);
			}
			if(pubDate.getDate()<10) {
				feedDate += '-0' + pubDate.getDate();
			} else {
				feedDate += '-' + pubDate.getDate();
			}
			item.pubDate = feedDate;

			config.feed.push(item);
		});

		parseFeed();
	})
	.fail(function(jqXHR, textStatus){
		console.log('fail');
	});
}

//-----------------------------------------------------------------------

function parseFeed()
{
	var max = (0==config.feed.length ? 1 : config.feed.length);
	var fine = 0;
	var dirty = 0;
	var recent = 0;
	var error = 0;

	function updateBars()
	{
		var sum = 0;

		var err = (error*100/max);
		$('#progressDanger').text((parseInt(err * 10) / 10) + '%' + (err > 20 ? ' fehlerhaft' : ''));
		if((0<err) && (err<3)) {
			err = 3;
		}
		sum += err;

		var fin = (fine*100/max);
		$('#progressSuccess').text((parseInt(fin * 10) / 10) + '%' + (fin > 20 ? ' fertig' : ''));
		if((0<fin) && (fin<3)) {
			fin = 3;
		}
		sum += fin;

		var dir = (dirty*100/max);
		$('#progressWarning').text((parseInt(dir * 10) / 10) + '%' + (dir > 20 ? ' verändert' : ''));
		if((0<dir) && (dir<3)) {
			dir = 3;
		}
		sum += dir;

		var rec = (recent*100/max);
		rec = Math.min(rec,100-sum);
		$('#progressInfo').text((parseInt(rec * 10) / 10) + '%' + (rec > 20 ? ' neu' : ''));
		if((0<rec) && (rec<3)) {
			rec = 3;
		}
		sum += rec;

		$('#progressInfo').css('width', rec+'%');
		$('#progressBar').css('width', (100-Math.max(sum,100))+'%');
		$('#progressWarning').css('width', dir+'%');
		$('#progressSuccess').css('width', fin+'%');
		$('#progressDanger').css('width', err+'%');
	}

	function readCardInfos()
	{
		function colorizeCard(data,url)
		{
			data = data || {};
			data.portal = data.portal || {};
			data.portal.url = data.portal.url || '';
			data.portal.updated = data.portal.updated || '';

			for(var i = 0; i < config.feed.length; ++i) {
				if(config.feed[i].link == data.portal.url) {
					config.feed[i].json = url;

					if(config.feed[i].pubDate == data.portal.updated) {
						config.feed[i].status = 'fine';
						++fine;
					} else {
						config.feed[i].status = 'dirty';
						++dirty;
					}
					return;
				}
			}
			++recent;
		}

		if(config.loaded < config.cards.length) {
			var url = config.cards[config.loaded];
			$.ajax(url)
			.done(function(json){
				var data = jQuery.parseJSON(json);
				colorizeCard(data, url);
			})
			.fail(function(jqXHR, textStatus){
				if('parsererror'==textStatus) {
					var data = jQuery.parseJSON(jqXHR.responseText);
					if( typeof data.location != 'undefined') {
						colorizeCard(data, url);
						return;
					}
				}
				++error;
			})
			.always(function(){
				updateBars();
				++config.loaded;
				readCardInfos();
			});
		} else {
			recent = max;
			updateBars();

			showUpdateTable();
		}
	}

	updateBars();

	readCardInfos();
}

//-----------------------------------------------------------------------

function showUpdateTable()
{
	var str = '';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">Gefundene Datensätze</h3></div>';

	str += '<table class="table table-striped">';
	str += '<thead><tr>';
	str += '<th></th>';
	str += '<th>Name</th>';
	str += '<th>Beschreibung</th>';
	str += '<th>Datum</th>';
	str += '<th></th>';
	str += '</tr></thead><tbody>';

	for(var i = 0; i < config.feed.length; ++i) {
		str += '<tr>';
		if('new' == config.feed[i].status) {
			str += '<td class="label-info"></td>';
		} else if('dirty' == config.feed[i].status) {
			str += '<td class="label-warning"></td>';
		} else if('fine' == config.feed[i].status) {
			str += '<td class="label-success"></td>';
		} else if('error' == config.feed[i].status) {
			str += '<td class="label-danger"></td>';
		} else {
			str += '<td></td>';
		}

		str += '<td>' + config.feed[i].title + '</td>';

		if(config.feed[i].description.length>200) {
			str += '<td>' + config.feed[i].description.substr(0, 200) + '...</td>';
		} else {
			str += '<td>' + config.feed[i].description + '</td>';
		}

		var days = parseInt((Date.now() - new Date(config.feed[i].pubDate)) / 1000 / 60 / 60 / 24);
		if(0 == days) {
			str += '<td>Heute</td>';
		} else if(1 == days) {
			str += '<td>Gestern</td>';
		} else {
			var pubDate = new Date(config.feed[i].pubDate);
			var feedDate = '';
			if(pubDate.getDate()<10) {
				feedDate += '0' + pubDate.getDate();
			} else {
				feedDate += pubDate.getDate();
			}
			if(pubDate.getMonth()<9) {
				feedDate += '.0' + (pubDate.getMonth()+1);
			} else {
				feedDate += '.' + (pubDate.getMonth()+1);
			}
			feedDate += '.' + pubDate.getFullYear();
			str += '<td>' + feedDate + '</td>';
		}

		if('new' == config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-primary" data-feedidx="' + i + '">Hinzufügen</button></td>';
		} else if('dirty' == config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-primary" data-feedidx="' + i + '">Updaten</button></td>';
		} else if('fine' == config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-default" data-feedidx="' + i + '">Bearbeiten</button></td>';
		} else {
			str += '<td></td>';
		}
		str += '</tr>';
	}

	str += '</tbody></table>';

	str += '</div>';

	$('#datasettable').html( str);

	$('#datasettable').on('click', 'button', function() {
		var obj = config.feed[$(this).data('feedidx')];

		resetCards();
		buildCards(obj);
	});
}

//-----------------------------------------------------------------------
