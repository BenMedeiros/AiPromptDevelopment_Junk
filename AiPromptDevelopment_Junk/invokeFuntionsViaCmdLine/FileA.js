// FileA.js
function greet(name) {
    return `Hello, ${name}!`;
}

function add(a, b) {
    return Number(a) + Number(b); // Convert to number for addition
}

function multiply(a, b) {
    return Number(a) * Number(b); // Convert to number for multiplication
}   

function ls() {
    return [greet, add, multiply];
}

module.exports = {
    greet,
    add,
    multiply,
    ls
};