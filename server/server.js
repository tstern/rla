(function () {
	'use strict';

	var VERSION = '0.1',
		express = require('express'),
		sqlite3 = require('sqlite3').verbose(),
		app = express(),
		db = new sqlite3.Database('rla.s3db');

	db.serialize(init);

	function init() {
		/**
		 * Provide static directory.
		 */
		app.use(express.static(__dirname + '/public'));

		/**
		 * Handle REST requests.
		 */
		app.all('/rest/*', dispatchREST);

		app.listen(8080);

		console.log('Server is running.');
	}

	function dispatchREST(request, response) {
		var answer, id;

		if (request.url.match(/^\/rest\/version$/)) {
			handleVersionRequest(request, response);

		} else if (request.url.match(/^\/rest\/laureates$/)) {
			handleLaureatesRequest(request, response);

		} else {
			handleUnknownRequest(request, response);
		}
	}

	function handleVersionRequest(request, response) {
		if (request.method !== 'GET') {
			response.send(405, 'Only GET method is allowed.');
			return;
		}

		response.json(VERSION);
	}

	function handleLaureatesRequest(request, response) {
		if (request.method !== 'GET') {
			response.send(405, 'Only GET method is allowed.');
			return;
		}

		db.all('SELECT * FROM laureates', function (err, rows) {
			response.json(rows);
		});
	}

	function handleUnknownRequest(request, response) {
		response.send(404, 'REST URI is unknown.');
	}

}());