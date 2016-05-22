
// Basic - create a log with two channels.
const myLog = chanlog.create('channelForFileA', 'channelForFileB');

const chanForFileA = myLog.chan('channelForFileA'); 

// Channels have a prefix: text which is printed at the start of each log statement. 
// By default this is the name of the channel followed by a colon and a space.

chanForFileA.log('hello world!'); // Prints: 'channelForFileA: hello world!'

// You can also set the prefix for a specific channel...
chanForFileA.prefixBy('Straight from channel A: ');

chanForFileA.log('Another message!'); // Prints: 'Straight from channel A: Another message!'

const myLog2 = chanlog.create('a', { prefixBy: 'Straight from channel A: '}); 

myLog2.chan('a').log('A third message!'); // Prints: 'Straight from channel A: A third message!'

// ...Or for all channels. 
const myLog3 = chanlog.create('a', 'b', 'c').prefixAllBy('prefix: '); 

myLog3.chan('b').log('hi there!'); // Prints: 'prefix: hi there!'


// And you can silence channels... 

// ...individually at time of creation.  
const myLog4 = chanlog.create('a', { prefixBy: 'hello: ', silence: true}, 'b');
const myLog5 = chanlog.create('a', 'b').silence('a'); 

myLog4.chan('a').log('I will not be printed'); // Prints nothing...

// ...Or after. 

myLog.chan('b').silence(); 

myLog.chan('b').log('I will not be printed'); 

// ...Or all of them.

const myLog5 = chanlog.create('red', 'blue', 'green').silenceAll(); 

// ... Or all but one. 
const myLog6 = chanlog.create('red', 'blue', 'green').silenceExcept('red');
