/*
 Using http createServer in node.js, parse the requests sent from client.  Put example logic of how to add routes based on path and queryparams for GET and POST; the routes should all be called via function calls so that it is more readable as number of routes gets large.  
 Module export the server.
 */
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { getPublicRoutes } = require('./listFiles');

// Server setup
const server = http.createServer((req, res) => {
    // Parse the URL and query parameters
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const queryParams = parsedUrl.query;

    // Handle routes based on request method and path
    if (req.method === 'GET') {
        handleGetRoute(path, queryParams, res);
    } else if (req.method === 'POST') {
        let body = '';

        // Collect POST data
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string and accumulate
        });

        req.on('end', () => {
            const postData = querystring.parse(body);
            handlePostRoute(path, postData, res);
        });
    } else {
        // Handle method not allowed
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

// Example GET route handlers
function handleGetRoute(path, queryParams, res) {
    switch (path) {
        case '/hello':
            handleHelloRoute(queryParams, res);
            break;
        case '/goodbye':
            handleGoodbyeRoute(res);
            break;
        default:
            defaultRoute(res);
            break;
    }
}

function defaultRoute(res) {
    getPublicRoutes((htmlString) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlString);
    });
}

function handleHelloRoute(queryParams, res) {
    const name = queryParams.name || 'World';
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, ${name}!`);
}

function handleGoodbyeRoute(res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Goodbye!');
}

function handleNotFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}

// Example POST route handlers
function handlePostRoute(path, postData, res) {
    switch (path) {
        case '/submit':
            handleSubmitRoute(postData, res);
            break;
        default:
            handleNotFound(res);
            break;
    }
}

function handleSubmitRoute(postData, res) {
    // Process the submitted data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Data received!', data: postData }));
}

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

module.exports = {
    server
}