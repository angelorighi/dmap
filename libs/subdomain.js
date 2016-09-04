var dns = require('dns-sync');

module.exports = {
    subdomainScanner: function subdomainScanner(target) {
        var found = [];
            
        target.wordlist.forEach(function(v){
            var subdomain = v + '.' + target.domain;
            var a = dns.resolve(subdomain);
            if(a != null) {
                console.log('[+] subdomain found: ' + subdomain);
                found.push(subdomain);
            }
        });
    
        return {found:found};
    }
};
