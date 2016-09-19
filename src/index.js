var formatLinkUrls = require('./format-link-urls');
var groupRelAttributes = require('./group-link-rels');
var transformLinkProperty = require('./transform-link-property');
var formatLinkAttributes = require('./format-link-attributes');

/**
 * Format a link properties Object, to the format described in RFC 5988
 * @param  {Object} linkObject Link header object
 * @return {String}            Link header formatted string
 */
module.exports = function formatLinkHeader(linkObject) {
  if (linkObject === null || linkObject === undefined) return '';

  formatLinkUrls(linkObject);

  return groupRelAttributes(linkObject)
    .map(function formatProperties(linkProperty) {
      var linkTransformation = transformLinkProperty(linkProperty);
      var linkAttributes = formatLinkAttributes(linkTransformation);

      return '<' + linkTransformation.url + '>; ' + linkAttributes;
    })
    .join(', ');
};
