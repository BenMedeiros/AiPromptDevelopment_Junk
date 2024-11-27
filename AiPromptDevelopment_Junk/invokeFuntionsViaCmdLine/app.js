const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Load the functions from FileA.js
const filePath = path.join(__dirname, 'FileA.js');
const exportedFunctions = require(filePath);

// Set up readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>>> '
});

// Prompt the user to enter a function call
rl.prompt();

rl.on('line', (line) => {
    const trimmedLine = line.trim();

    if (trimmedLine === 'exit') {
        rl.close();
        return;
    }

    const [funcName, ...args] = trimmedLine.split(/\s+/);

    // Check if the function exists in the exported functions
    if (exportedFunctions[funcName]) {
        try {
            // Invoke the function with the parsed arguments
            const result = exportedFunctions[funcName](...args);
            console.log('Result:', result);
        } catch (error) {
            console.error('Error:', error.message);
        }
    } else {
        console.log(`Function "${funcName}" not found.`);
    }

    rl.prompt();
}).on('close', () => {
    console.log('Exiting...');
    process.exit(0);
});