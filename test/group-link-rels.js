'use strict';

const test = require('ava');
const groupRelAttributes = require('../src/group-link-rels');

const expectedProperties = [
  {
    client_id: '1',
    client_secret: '2',
    page: '1',
    per_page: '100',
    rel: 'current',
    url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=1&per_page=100'
  },
  {
    client_id: '1',
    client_secret: '2',
    page: '2',
    per_page: '100',
    rel: 'next last',
    url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
  }
];

const linkObject = {
  current: {
    client_id: '1',
    client_secret: '2',
    page: '1',
    per_page: '100',
    rel: 'current',
    url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=1&per_page=100'
  },
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
    url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
  }
};

test('@call => should return an array of unique properties', (t) => {
  const uniqueProperties = groupRelAttributes(linkObject);

  t.true(Array.isArray(uniqueProperties));
});

test('@call => should group related rel attributes together by deduplicating entries', (t) => {
  const uniqueProperties = groupRelAttributes(linkObject);

  t.deepEqual(uniqueProperties, expectedProperties);
});
