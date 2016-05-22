# chanlog
Simple channeled logging for javascript

##API Demo


Creation: 


```javascript
const log = chanlog.create('channelForFileA', 'channelForFileB');
const log = chanlog.create('chanA', 'chanB', { prefixBy: 'chanB says: ' }, 'c', 'd' { silence: true }); 
const log = chanlog.create('red', 'green', 'blue').prefixAllBy('some prefix: '); 
const log = chanlog.create('a', 'b', 'c').silence('a'); 
const log = chanlog.create('a', 'b', 'c').silenceExcept('a'); 
const log = chanlog.create('a', 'b', 'c').silenceAll(); 
```

Working with individual channels:


```javascript
const log = chanlog.create('chanA');
const chanA = log.chan('chanA');
chanA.log('hello!'); // Prints: 'chanA: hello!' 
chanA.prefixBy('some prefix: ');
chanA.log('goodbye!'); // Prints: 'some prefix: goodbye!'
chanA.silence(); 
chanA.log('This won\'t be printed!'); 
```



See example.js for annotated examples.
