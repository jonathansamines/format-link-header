'use strict';

const test = require('ava');
const formatter = require('../src/index');

test('@call => should format a proper link header with rel attributes', (t) => {
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

  const actual = formatter(linkObject);
  const expected =
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100>; rel="next", ' +
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100>; rel="last"';

  t.is(actual, expected);
});

test('@call => should return an empty string if the link object is nullable', (t) => {
  t.is(formatter(null), '');
  t.is(formatter(undefined), '');
});

test('@call => should group together properties with related rel attribute values', (t) => {
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

  const actual = formatter(linkObject);
  const expected = '<https://imaginary.url.notreal?name=value>; rel="next page"; hreflang="es"';

  t.is(actual, expected);
});
