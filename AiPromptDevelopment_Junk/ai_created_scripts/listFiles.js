/*
 * Write node.js code to read files from a folder, and generate a string of HTML code that will list all of the files with links to the file path relative to the folder path.
 * 
 * */

const fs = require('fs');
const path = require('path');

// Function to generate HTML string from files in the specified directory
function generateFileListHtml(folderPath, cb) {
    console.log('folderPath', folderPath);

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Start building the HTML string
        let htmlString = '<!DOCTYPE html><html><head><title>File List</title></head><body>';
        htmlString += '<h1>File List</h1><ul>';

        // Loop through the files and create list items with links
        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            htmlString += `<li><a href="${filePath}" target="_blank">${file}</a></li>`;
        });

        htmlString += '</ul></body></html>';

        // Output the HTML string (you can save it to a file or send it as a response in a web server)
        console.log(htmlString);
        cb(htmlString);

    });
}


function getPublicRoutes(cb) {
    const folderPath = path.join(__dirname, '../public/routes'); // Change 'your-folder-name' accordingly
    generateFileListHtml(folderPath, cb);
}

module.exports = {
    getPublicRoutes
}