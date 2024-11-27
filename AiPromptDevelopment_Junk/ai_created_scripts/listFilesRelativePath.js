/*
Write node.js code to read files from a folder, and generate a string of HTML code that will list
 * all of the files with links to the file path relative to the folder path.  Return the html from the function call.
 * 
 * */

const fs = require('fs');
const path = require('path');

/**
 * Generates an HTML string that lists all files in a given folder.
 * @param {string} folderPath - The path to the folder.
 * @returns {string} - The generated HTML string.
 */
function generateFileList(folderPath) {
    // Ensure the folderPath is absolute
    const absoluteFolderPath = path.resolve(folderPath);

    // Read the files from the directory
    const files = fs.readdirSync(absoluteFolderPath);

    // Start building the HTML string
    let htmlString = '<!DOCTYPE html>\n<html>\n<head>\n<title>File List</title>\n</head>\n<body>\n<h1>File List</h1>\n<ul>\n';

    // Loop through each file and create links
    files.forEach(file => {
        const filePath = path.relative(folderPath, path.join(absoluteFolderPath, file));
        htmlString += `<li><a href="${filePath}">${file}</a></li>\n`;
    });

    // Close the HTML tags
    htmlString += '</ul>\n</body>\n</html>';

    return htmlString;
}

// Example usage
const folderPath = '../public/routes'; // Replace this with your target directory
const htmlOutput = generateFileList(folderPath);
console.log(htmlOutput);