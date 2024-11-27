/*
 nodejs: while http server is running, if user types 'quit' into command line, close the server and nodejs process
 */

const http = require('http');
const readline = require('readline');
const { server } = require('./createServer');

// Create an interface for reading from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Listen for user input
rl.on('line', (input) => {
    if (input.trim() === 'quit') {
        console.log('Shutting down the server...');

        server.close(() => {
            console.log('Server closed. Exiting process.');
            rl.close(); // Close the readline interface
            process.exit(0); // Exit the process
        });
    }
});