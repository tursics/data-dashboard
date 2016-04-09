/*jslint browser: true*/
/*global $,config,dict,cityConfig*/

//-----------------------------------------------------------------------

function showUpdateTable() {
	'use strict';

	var str = '',
		i = 0,
		elemDesc = null,
		desc = null,
		days = 0,
		pubDate = null,
		feedDate = '';

	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.updateCollected + '</h3></div>';

	str += '<table class="table table-striped">';
	str += '<thead><tr>';
	str += '<th></th>';
	str += '<th>' + dict.updateHeadTitle + '</th>';
	str += '<th>' + dict.updateHeadDescription + '</th>';
	str += '<th>' + dict.updateHeadDate + '</th>';
	str += '<th></th>';
	str += '</tr></thead><tbody>';

	for (i = 0; i < config.feed.length; ++i) {
		str += '<tr>';
		if ('new' === config.feed[i].status) {
			str += '<td class="label-info"></td>';
		} else if ('dirty' === config.feed[i].status) {
			str += '<td class="label-warning"></td>';
		} else if ('fine' === config.feed[i].status) {
			str += '<td class="label-success"></td>';
		} else if ('error' === config.feed[i].status) {
			str += '<td class="label-danger"></td>';
		} else {
			str += '<td></td>';
		}

		if (config.feed[i].front !== '') {
			str += '<td style="padding:0;text-align:center;"><img src="' + config.feed[i].background + '" style="height:3em;"></td><td>' + config.feed[i].front + '</td>';
		} else {
			str += '<td>' + config.feed[i].title + '</td>';

			elemDesc = document.createElement('div');
			elemDesc.innerHTML = config.feed[i].description.trim();
			desc = elemDesc.textContent || elemDesc.innerText || '';
			if (desc.length > 200) {
				str += '<td>' + desc.substr(0, 200) + '...</td>';
			} else {
				str += '<td>' + desc + '</td>';
			}
		}

		days = parseInt((Date.now() - new Date(config.feed[i].pubDate)) / 1000 / 60 / 60 / 24, 10);
		if (0 === days) {
			str += '<td>' + dict.formatToday + '</td>';
		} else if (1 === days) {
			str += '<td>' + dict.formatYesterday + '</td>';
		} else {
			pubDate = new Date(config.feed[i].pubDate);
			feedDate = '';
			if (pubDate.getDate() < 10) {
				feedDate += '0' + pubDate.getDate();
			} else {
				feedDate += pubDate.getDate();
			}
			if (pubDate.getMonth() < 9) {
				feedDate += '.0' + (pubDate.getMonth() + 1);
			} else {
				feedDate += '.' + (pubDate.getMonth() + 1);
			}
			feedDate += '.' + pubDate.getFullYear();
			str += '<td>' + feedDate + '</td>';
		}

		if ('new' === config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-primary" data-feedidx="' + i + '">' + dict.updateButtonAdd + '</button></td>';
		} else if ('dirty' === config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-primary" data-feedidx="' + i + '">' + dict.updateButtonUpdate + '</button></td>';
		} else if ('fine' === config.feed[i].status) {
			str += '<td><button type="button" class="btn btn-default" data-feedidx="' + i + '">' + dict.updateButtonEdit + '</button></td>';
		} else {
			str += '<td></td>';
		}
		str += '</tr>';
	}

	str += '</tbody></table>';

	str += '</div>';

	$('#datasettable').html(str);

	$('#datasettable').on('click', 'button', function () {
		var obj = config.feed[$(this).data('feedidx')];

		resetCards(false);
		buildCards(obj);
	});
}

//-----------------------------------------------------------------------

function parseFeed() {
	'use strict';

	var max = (0 === config.feed.length ? 1 : config.feed.length),
		fine = 0,
		dirty = 0,
		recent = 0,
		error = 0;

	function updateBars() {
		var sum = 0,
			err = (error * 100 / max),
			fin = (fine * 100 / max),
			dir = (dirty * 100 / max),
			rec = (recent * 100 / max);

		$('#progressDanger').text((parseInt(err * 10, 10) / 10) + '%' + (err > 20 ? ' ' + dict.progressCorrupt : ''));
		if ((0 < err) && (err < 3)) {
			err = 3;
		}
		sum += err;

		$('#progressSuccess').text((parseInt(fin * 10, 10) / 10) + '%' + (fin > 20 ? ' ' + dict.progressDone : ''));
		if ((0 < fin) && (fin < 3)) {
			fin = 3;
		}
		sum += fin;

		$('#progressWarning').text((parseInt(dir * 10, 10) / 10) + '%' + (dir > 20 ? ' ' + dict.progressDirty : ''));
		if ((0 < dir) && (dir < 3)) {
			dir = 3;
		}
		sum += dir;

		rec = Math.min(rec, 100 - sum);
		$('#progressInfo').text((parseInt(rec * 10, 10) / 10) + '%' + (rec > 20 ? ' ' + dict.progressNew : ''));
		if ((0 < rec) && (rec < 3)) {
			rec = 3;
		}
		sum += rec;

		$('#progressInfo').css('width', rec + '%');
		$('#progressBar').css('width', (100 - Math.max(sum, 100)) + '%');
		$('#progressWarning').css('width', dir + '%');
		$('#progressSuccess').css('width', fin + '%');
		$('#progressDanger').css('width', err + '%');
	}

	function readCardInfos() {
		function colorizeCard(data, url) {
			var i = 0;

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

			for (i = 0; i < config.feed.length; ++i) {
				if (config.feed[i].link === data.portal.url) {
					config.feed[i].json = url;
					config.feed[i].front = data.front.textTop + ' ' + data.front.value + ' ' + data.front.unit + ' ' + data.front.textBottom;
					config.feed[i].background = data.front.background;

					if (config.feed[i].pubDate === data.portal.updated) {
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

		if (config.loaded < cityConfig.cards.length) {
			var url = cityConfig.cards[config.loaded];
			$.ajax(url)
				.done(function (json) {
					var data = $.parseJSON(json);
					colorizeCard(data, url);
				})
				.fail(function (jqXHR, textStatus) {
					if ('parsererror' === textStatus) {
						try {
							var data = $.parseJSON(jqXHR.responseText);
							if (typeof data.location !== 'undefined') {
								colorizeCard(data, url);
								return;
							}
						} catch (e) {
						}
					}
					++error;
				})
				.always(function () {
					if (config.loadBuildList) {
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

function getUpdates(feedUrl, ckanUrl) {
	'use strict';

	var str = '',
		ckan = false,
		url = feedUrl;

	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.updateFetch + '</h3></div>';
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

	$('#build').html(str);

	if (config.feed.length > 0) {
		parseFeed();
		return;
	}

	if (typeof ckanUrl !== 'undefined') {
		ckan = true;
		if( 0 < ckanUrl.lastIndexOf('.php')) {
			// it's a hack
			url = ckanUrl;
		} else {
			url = ckanUrl + '&limit=400';
		}
	}
	$.ajax(url)
		.done(function (data) {
			var i = 0,
				objList = [],
				xml = null,
				node = null,
				datasetUrl = '',
				found = 0,
				item = {};

			config.feed = [];
			if (ckan) {
				if (typeof data === 'string') {
					data = $.parseJSON(data);
				}
				for (i = 0; i < data.result.length; ++i) {
					node = data.result[i];
					var objectId = node.object_id;
					if (typeof objectId === 'undefined') {
						objectId = node.id;
					}
					datasetUrl = url.split('/api/')[0] + '/dataset/' + objectId.trim();

					for (found = 0; found < objList.length; ++found) {
						if (objList[found] === objectId) {
							break;
						}
					}

					if (found >= objList.length) {
						objList.push(objectId);
						if (typeof node.object_id !== 'undefined') {
							item = {
								title: node.data['package'].title.trim(),
								link: datasetUrl,
								description: node.data['package'].notes.trim(),
								pubDate: node.timestamp.trim().split('T')[0],
								author: node.data['package'].maintainer.trim(),
								json: '',
								background: '',
								front: '',
								status: 'new'
							};
						} else {
							item = {
								title: node.title.trim(),
								link: datasetUrl,
								description: node.description.trim(),
								pubDate: node.metadata_modified.trim().split('T')[0],
								author: node.author.trim(),
								json: '',
								background: '',
								front: '',
								status: 'new'
							};
						}

						config.feed.push(item);
					}
				}
//				console.log(objList.length);
			} else {
				xml = $(data);
				xml.find('item').each(function () {
					node = $(this);

					var elemTitle = document.createElement('textarea'),
						elemDesc = document.createElement('textarea'),
						pubDate = null,
						feedDate = null;

					elemTitle.innerHTML = node.find('title').text().trim();
					elemDesc.innerHTML = node.find('description').text().trim();

					item = {
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
					if (('' === item.link) && (typeof node.find('link')[0].nextSibling.data !== 'undefined')) {
						item.link = node.find('link')[0].nextSibling.data.trim();
					}
					pubDate = new Date(Date.parse(item.pubDate));
					feedDate = pubDate.getFullYear();
					if (pubDate.getMonth() < 9) {
						feedDate += '-0' + (pubDate.getMonth() + 1);
					} else {
						feedDate += '-' + (pubDate.getMonth() + 1);
					}
					if (pubDate.getDate() < 10) {
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
		.fail(function (jqXHR, textStatus) {
			var now = new Date(Date.now()),
				date = now.getFullYear() + '-',
				item = {},
				path = '',
				i = 0,
				card = '';

			if (now.getMonth() < 9) {
				date += '0' + (now.getMonth() + 1) + '-';
			} else {
				date += (now.getMonth() + 1) + '-';
			}
			if (now.getDate() < 10) {
				date += '0' + now.getDate();
			} else {
				date += now.getDate();
			}

			item = {
				title: dict.errorReadingCard,
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

			if (typeof cityConfig.data.ckan !== 'undefined') {
				path = cityConfig.data.ckan.split('/api/')[0] + '/dataset/';
			}

			for (i = 0; i < cityConfig.cards.length; ++i) {
				card = path + cityConfig.cards[i].split('/')[1].split('.')[0];
				item = {
					title: dict.errorReadingCard,
					link: card,
					description: card,
					pubDate: date,
					author: '',
					json: '',
					background: '',
					front: '',
					status: 'error'
				};
				config.feed.push(item);
			}

			parseFeed();
		});
}

//-----------------------------------------------------------------------
