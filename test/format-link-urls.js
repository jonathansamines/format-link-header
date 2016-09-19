var formatLinkUrls = require('../src/format-link-urls');
var expect = require('chai').expect;

var linkObject = {
    'linkAttributes1': {
          rel: 'last',
          hreflang: 'es',
          content: 'boom',
          url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
    },
    'linkAttributes2': {
          rel: 'last',
          hreflang: 'es',
          content: 'boom',
          url: {
            'protocol': 'https:',
            'slashes': true,
            'auth': null,
            'host': 'api.github.com',
            'port': null,
            'hostname': 'api.github.com',
            'hash': null,
            'search': '?client_id=1&client_secret=2&page=2&per_page=100',
            'query': 'client_id=1&client_secret=2&page=2&per_page=100',
            'pathname': '/user/9287/repos',
            'path': '/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100',
            'href': 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
          }
    }
};

describe('+ format-link-urls', function() {
  describe('#call', function() {
    var links = formatLinkUrls(linkObject);

    it('it should not modify URLs that are specified as strings', function() {
        expect(links.linkAttributes1.url).to.be.equals('https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100');
    });

    it('it should format urls that are specified as objects', function() {
        expect(links.linkAttributes2.url).to.be.equals('https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100');
    });

  });
});
