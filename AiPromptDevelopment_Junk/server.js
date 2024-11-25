'use strict';
const { readFileSync } = require('fs');
var http = require('http');
var port = process.env.PORT || 1337;

try {
    var htmlFile = readFileSync("/Users/benme/source/repos/AiPromptDevelopment/AiPromptDevelopment/Page1.html");
    console.log(htmlFile);
} catch (e) {
    console.error(e);
}


http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
}).listen(port);
