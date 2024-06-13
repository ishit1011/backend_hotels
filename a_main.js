// ---------------------------------  CHAPTER - 1 : Basics (function call & callback functions) --------------------------------------

// 1. WAYS for Function declaration
/*      CASE - 1
var add = function(a,b){
    return a+b;
}
*/

/*      CASE - 2 
    var add = (a,b) => {return a+b;}
*/
 
/*      CASE - 3
var add = (a,b) => a+b
var result = add(3,100) 

console.log(result);
*/

// 2. CALLBACK Functions

const readFile = (a,b,func) => {
    console.log('API: '+ a +'\nUTF: ' + b);
    func();
}

/*  METHOD - I 
function callback(){
    console.log('I am Ishit and I am calling back');
}
console.log(readFile('myAPI.com','utf-8',callback));
*/

// METHOD - II 
readFile('myAPI.com','utf-8',()=>{
    console.log('I am Ishit and I am calling back');
})
