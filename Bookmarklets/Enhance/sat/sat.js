(function() {
	var sat = {
		last_id: false,
		failed: [],
		cache: [],
		log: function(url, res, id) {
			var l;
			l = document.createElement('div');
			l.innerHTML = (res ? 'OK ' : '!!') + ' - ' + url;
			var s = l.style;
			s.textAlign = 'left';
			s.color = (res) ? 'black' : 'red';
			s.background = 'white';
			s.padding = '5px;';
			s.fontSize = '12px';
			document.body.appendChild(l);
			scrollTo(0, document.body.offsetHeight);
		},
		callback: function(url, res, id) {
			sat.log(url, res, id);
			if (!res) sat.failed[url] = 1;
			if (id === sat.last_id) {
				alert('Done! Pull the plug, turn off the modem, disable wireless and go read offline');
				sat.mark();
			}
		},
		mark: function() {
			for (var i = 0, max = links.length; i < max; i++) {
				if (sat.failed[links[i].href]) {
					links[i].style.textDecoration = 'line-through';
				}
			}
		}
	};

	try {
		var factory;
		if (typeof GearsFactory != 'undefined') {
			factory = new GearsFactory();
		} else {
			factory = new ActiveXObject('Gears.Factory');
		}

		var srv = factory.create('beta.localserver', '1.0');

	} catch (e) {
		alert('You need to install/enable Google Gears if you want this to work');
		return;
	}

	var store_name = document.location.href.toString().replace(/\W/g, '');
	srv.removeStore(store_name);
	srv.openStore(store_name);

	var store = srv.createStore(store_name);
	var links = document.getElementsByTagName('a');
	for (var i = 0, max = links.length; i < max; i++) {
		if (sat.cache[links[i].href]) continue;
		sat.cache[links[i].href] = 1;
		try {
			sat.last_id = store.capture(links[i].href, sat.callback);
		} catch (e) {
			sat.failed[links[i].href] = 1;
			sat.log(links[i].href, false);
		}
	}
})();
