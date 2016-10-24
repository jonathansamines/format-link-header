'use strict';

const formatter = require('../src/index');
const expect = require('chai').expect;

describe('+ link-formatter', function () {
  describe('#call', function () {
    it('should format a proper link header with rel attributes', function () {
      const linkHeader =
        '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100>; rel="next", ' +
        '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100>; rel="last"';

      const linkObject = {
        next: {
          client_id: '1',
          client_secret: '2',
          page: '2',
          per_page: '100',
          rel: 'next',
          url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
        },
        last: {
          client_id: '1',
          client_secret: '2',
          page: '3',
          per_page: '100',
          rel: 'last',
          url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100'
        }
      };

      expect(formatter(linkObject)).to.be.equal(linkHeader);
    });

    it('should return a blank string if the link object is nullable', function () {
      expect(formatter(null)).to.be.equal('');
      expect(formatter(undefined)).to.be.equal('');
    });

    it('should group together properties with related rel attribute values', function () {
      const linkHeader = '<https://imaginary.url.notreal?name=value>; rel="next page"; hreflang="es"';
      const linkObject = {
        next: {
          rel: 'next',
          name: 'value',
          hreflang: 'es',
          url: 'https://imaginary.url.notreal?name=value'
        },
        page: {
          rel: 'page',
          name: 'value',
          hreflang: 'es',
          url: 'https://imaginary.url.notreal?name=value'
        }
      };

      expect(formatter(linkObject)).to.be.equal(linkHeader);
    });
  });
});
