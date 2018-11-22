//const emitter = new EventEmitter();
const Logger = require('./logger');
const logger = new Logger();

const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');

console.log(logger);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log('total memory: ' + totalMemory + ', free memory: ' + freeMemory);

// Template string
//ES6 / ES2015:ECMAScript 6
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
debugger;

const files = fs.readdirSync('.\\');
console.log(files);

// asyn readdir passed in with the wrong dir name so to test the callback here.
fs.readdir('.,', function(err, files) {
	if(err) {
		console.log('Error', err);
	} else {
		console.log('Result', files);
	}
});


// register a listener
logger.on('messageLogged', (arg) => {
	console.log("message caught within callback ....", arg);
});

logger.log('message');

console.log(logger);
