//-----------------------------------------------------------------------

function getUpdates(feedUrl, ckanUrl)
{
	var str = '';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">'+dict['updateFetch']+'</h3></div>';
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

	if(config.feed.length > 0) {
		parseFeed();
		return;
	}

	var ckan = false;
	var url = feedUrl;
	if( typeof ckanUrl != 'undefined') {
		ckan = true;
		url = ckanUrl + '&limit=400';
	}
	$.ajax(url)
	.done(function(data){
		config.feed = new Array();
		if(ckan) {
			var objList = new Array();
			for(var i = 0; i < data.result.length; ++i) {
				var node = data.result[i];
				var datasetUrl = url.split('/api/')[0] + '/dataset/' + node.object_id.trim();

				var found = 0;
				for(; found < objList.length; ++found) {
					if(objList[found] == node.object_id) {
						break;
					}
				}

				if(found >= objList.length) {
					objList.push(node.object_id);
					var item = {
						title: node.data.package.title.trim(),
						link: datasetUrl,
						description: node.data.package.notes.trim(),
						pubDate: node.timestamp.trim().split('T')[0],
						author: node.data.package.maintainer.trim(),
						json: '',
						background: '',
						front: '',
						status: 'new'
					};

					config.feed.push(item);
				}
			}
//			console.log(objList.length);
		} else {
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
					background: '',
					front: '',
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
		}

		parseFeed();
	})
	.fail(function(jqXHR, textStatus){
		var now = new Date(Date.now());
		var date = now.getFullYear()+'-';
		if(now.getMonth()<9) {
			date += '0'+(now.getMonth()+1)+'-';
		} else {
			date += (now.getMonth()+1)+'-';
		}
		if(now.getDate()<10) {
			date += '0'+now.getDate();
		} else {
			date += now.getDate();
		}

		var item = {
			title: dict['errorReadingCard'],
			link: url,
			description: url,
			pubDate: date,
			author: '',
			json: '',
			background: '',
			front: '',
			status: 'error'
		};
		config.feed.push(item);

		parseFeed();
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
		$('#progressDanger').text((parseInt(err * 10) / 10) + '%' + (err > 20 ? ' '+dict['progressCorrupt'] : ''));
		if((0<err) && (err<3)) {
			err = 3;
		}
		sum += err;

		var fin = (fine*100/max);
		$('#progressSuccess').text((parseInt(fin * 10) / 10) + '%' + (fin > 20 ? ' '+dict['progressDone'] : ''));
		if((0<fin) && (fin<3)) {
			fin = 3;
		}
		sum += fin;

		var dir = (dirty*100/max);
		$('#progressWarning').text((parseInt(dir * 10) / 10) + '%' + (dir > 20 ? ' '+dict['progressDirty'] : ''));
		if((0<dir) && (dir<3)) {
			dir = 3;
		}
		sum += dir;

		var rec = (recent*100/max);
		rec = Math.min(rec,100-sum);
		$('#progressInfo').text((parseInt(rec * 10) / 10) + '%' + (rec > 20 ? ' '+dict['progressNew'] : ''));
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
			data.front = data.front || {};
			data.front.textTop = data.front.textTop || '';
			data.front.value = data.front.value || '';
			data.front.unit = data.front.unit || '';
			data.front.textBottom = data.front.textBottom || '';
			data.front.background = data.front.background || '';

			for(var i = 0; i < config.feed.length; ++i) {
				if(config.feed[i].link == data.portal.url) {
					config.feed[i].json = url;
					config.feed[i].front = data.front.textTop + ' '+ data.front.value + ' ' + data.front.unit + ' ' + data.front.textBottom;
					config.feed[i].background = data.front.background;

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

		if(config.loaded < cityConfig.cards.length) {
			var url = cityConfig.cards[config.loaded];
			$.ajax(url)
			.done(function(json){
				var data = jQuery.parseJSON(json);
				colorizeCard(data, url);
			})
			.fail(function(jqXHR, textStatus){
				if('parsererror'==textStatus) {
					try {
						var data = jQuery.parseJSON(jqXHR.responseText);
						if( typeof data.location != 'undefined') {
							colorizeCard(data, url);
							return;
						}
					} catch(e) {
					}
				}
				++error;
			})
			.always(function(){
				if(config.loadBuildList) {
					updateBars();
					++config.loaded;
					readCardInfos();
				}
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
	str += '<div class="panel-heading"><h3 class="panel-title">'+dict['updateCollected']+'</h3></div>';

	str += '<table class="table table-striped">';
	str += '<thead><tr>';
	str += '<th></th>';
	str += '<th>'+dict['updateHeadTitle']+'</th>';
	str += '<th>'+dict['updateHeadDescription']+'</th>';
	str += '<th>'+dict['updateHeadDate']+'</th>';
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

		if(config.feed[i].front != '') {
			str += '<td style="padding:0;text-align:center;"><img src="' + config.feed[i].background + '" style="height:3em;"></td><td>' + config.feed[i].front + '</td>';
		} else {
			str += '<td>' + config.feed[i].title + '</td>';

			var elemDesc = document.createElement('div');
			elemDesc.innerHTML = config.feed[i].description.trim();
			var desc = elemDesc.textContent || elemDesc.innerText || '';
			if(desc.length>200) {
				str += '<td>' + desc.substr(0, 200) + '...</td>';
			} else {
				str += '<td>' + desc + '</td>';
			}
		}

		var days = parseInt((Date.now() - new Date(config.feed[i].pubDate)) / 1000 / 60 / 60 / 24);
		if(0 == days) {
			str += '<td>'+dict['formatToday']+'</td>';
		} else if(1 == days) {
			str += '<td>'+dict['formatYesterday']+'</td>';
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
			str += '<td><button type="button" class="btn btn-primary" data-feedidx="' + i + '">'+dict['updateButtonAdd']+'</button></td>';
		} else if('dirty' == config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-primary" data-feedidx="' + i + '">'+dict['updateButtonUpdate']+'</button></td>';
		} else if('fine' == config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-default" data-feedidx="' + i + '">'+dict['updateButtonEdit']+'</button></td>';
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

		resetCards(false);
		buildCards(obj);
	});
}

//-----------------------------------------------------------------------
