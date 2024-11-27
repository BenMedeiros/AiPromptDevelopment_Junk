'use strict';
const { readFileSync } = require('fs');
const { getPublicRoutes } = require('./ai_created_scripts/listFiles');

var http = require('http');
var port = process.env.PORT || 1337;


http.createServer(function(req, res) {
    console.log(req);
    console.log(res);

    getPublicRoutes((htmlString) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlString);
    });
}).listen(port);
