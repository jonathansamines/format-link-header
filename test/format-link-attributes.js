var formatLinkAttributes = require('../src/format-link-attributes');
var expect = require('chai').expect;

var linkAttributes = {
  rel: 'last',
  hreflang: 'es',
  content: 'boom',
  url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
};

describe('+ format-link-attributes', function() {
  describe('#call', function() {
    var attributes = formatLinkAttributes(linkAttributes);

    it('it should stringify the link attributes as a list of key="value" separated by semicolons, excluding the url attribute', function() {
      expect(attributes).to.be.equals('rel="last"; hreflang="es"; content="boom"');
    });
  });
});
