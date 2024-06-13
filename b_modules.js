// ---------------------------------  CHAPTER - 2 : Types of Node JS Modules --------------------------------------
/*
var fs = require('fs'); // File System 
var os = require('os'); // Operating System 
var http = require('http'); // Http Module
var server = require('server'); // Server Module

// * To Display User Details from Operating system
var myUser = os.userInfo();
console.log(myUser);

// * To CREATE a new file on every render
fs.appendFile('Hello.txt','I am Ishit from Thapar' + '\n', () => {
    console.log('File is Created'); 
})
*/

// ===================================================================================================================
// 1. Convert JSON String ---------> JSON Object
/*
const jsonstring = '{"name": "Ishit", "class" : "3NC1", "profile" : "linkedin"}';
const jsonobject = JSON.parse(jsonstring); 

console.log(jsonobject.name);
*/

// 2. Convert JSON Object into -----> JSON string 
const objectToConvert = {
    name : 'ISHIT',
    age : 22,
    class : '3NC1'
}
const jsonstring = JSON.stringify(objectToConvert);

console.log(jsonstring);