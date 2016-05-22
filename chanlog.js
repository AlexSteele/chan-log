(function(global) {
    
    'use strict';

    function createChannel(name) {
        let _prefix = name + ': ';
        let _silence = false;
        
        const channel = {
            name: name
        };

        channel.prefixBy = function(prefix) {
            _prefix = prefix;
            return channel;
        };

        channel.silence = function() {
            _silence = true;
            return channel;
        };

        channel.log = function(message) {
            if (!_silence) {
                console.log(_prefix + message); 
            }
        };

        return channel; 
    }

    function isAChannel(arg) {
        return arg &&
            arg.name !== undefined &&
            arg.prefixBy !== undefined &&
            arg.silence !== undefined; 
    }

    function createLog(channels) {
        const log = {
            channels: channels
        };

        log.silence = function(channel) {
            log.channels[channel].silence();
            return log;
        };
        
        log.silenceAll = function() {
            log.channels.forEach(c => c.silence());
            return log;
        };
        
        log.silenceExcept = function(channel) {
            log.channels.filter(c => c.name !== channel).forEach(c => c.silence());
            return log;
        };

        log.prefixAllBy = function(prefix) {
            log.channels.forEach(c => c.prefixBy(prefix));
            return log; 
        };

        log.chan = function(name) {
            return log.channels.filter(c => c.name === name)[0]; 
        };

        return log; 
    }
    
    function create() {
        const argsArr = Array.from(arguments),
              channels = [];
        
        let prev;
        
        for (let arg of argsArr) {
            if (typeof arg === 'string') {
                const chan = createChannel(arg); 
                channels.push(chan); 
                prev = chan; 
            } else if (typeof arg === 'object') {
                if (!isAChannel(prev)) { 
                    throw new Error('chanlog: Unrecognized argument: ' + arg); 
                }
                if (typeof arg.prefixBy === 'string') {
                    prev.prefixBy(arg.prefixBy); 
                }
                if (typeof arg.silence === 'boolean' && arg.silence) {
                    prev.silence(); 
                }
                prev = arg; 
            } else {
                throw new Error('chanlog: Unrecognized argument: ' + arg);
            }
        }

        return createLog(channels);     
    };

    const chanlog = {
        create: create
    };

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return chanlog;
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = chanlog;
    } else {
        global.chanlog = chanlog; 
    }
    
}(this));
