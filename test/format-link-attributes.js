'use strict';

const test = require('ava');
const formatLinkAttributes = require('../src/format-link-attributes');

function createLinkAttributes(attrs) {
  return {
    rel: 'last',
    hreflang: 'es',
    content: 'boom',
    ...attrs,
  };
}

test('@call => should stringify link attributes', (t) => {
  const attrs = createLinkAttributes();

  const actual = formatLinkAttributes(attrs);
  const expected = 'rel="last"; hreflang="es"; content="boom"';

  t.is(actual, expected);
});

test('@call => should ignore the url attribute', (t) => {
  const attrs = createLinkAttributes({
    url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
  });

  const actual = formatLinkAttributes(attrs);
  const expected = 'rel="last"; hreflang="es"; content="boom"';

  t.is(actual, expected);
});
