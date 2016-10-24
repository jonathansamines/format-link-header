'use strict';

const groupRelAttributes = require('./group-link-rels');
const transformLinkProperty = require('./transform-link-property');
const formatLinkAttributes = require('./format-link-attributes');

/**
 * Format a link properties Object, to the format described in RFC 5988
 * @param  {Object} linkObject Link header object
 * @return {String}            Link header formatted string
 */
module.exports = function formatLinkHeader(linkObject) {
  if (linkObject === null || linkObject === undefined) return '';

  return groupRelAttributes(linkObject)
    .map(function formatProperties(linkProperty) {
      const linkTransformation = transformLinkProperty(linkProperty);
      const linkAttributes = formatLinkAttributes(linkTransformation);

      return `<${linkTransformation.url}>; ${linkAttributes}`;
    })
    .join(', ');
};
