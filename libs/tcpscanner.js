var net = require('net');

module.exports = {
    tcpScanner: function tcpScanner(target) {
        var showOpen = true;
        var showClosed = false;
        var showUnknown = false;
        
        target.ports.forEach(function(port){
            var s = new net.Socket();
        
            s.setTimeout(target.timeout, function() { s.destroy(); });
            s.connect(port, target.host, function() {
                if(showOpen) {
                    console.log('[+] ' + target.host + ':' + port + ' open');
                }
                s.destroy();
            });
                    
            s.on('error', function(e) {
                if(showClosed) {
                    console.log('[-] ' + target.host + ':' + port + ' closed');
                }
                s.destroy();
            });
    
            s.on('timeout', function(e) {
                if(showUnknown) {
                    console.log('[?] ' + target.host + ':' + port + ' unknown');
                }
                s.destroy();
            });
        })
    }
};
