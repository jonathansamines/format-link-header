'use strict';

const groupRelAttributes = require('../src/group-link-rels');
const expect = require('chai').expect;

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

describe('+ group-link-rels', function () {
  describe('#call', function () {
    const uniqueProperties = groupRelAttributes(linkObject);

    it('should return an array of unique properties', function () {
      expect(uniqueProperties).to.be.an.array;
    });

    it('should group related rel attributes toguether by dropping duplicated entries on the link object', function () {
      expect(uniqueProperties).to.be.deep.equals(expectedProperties);
    });
  });
});
