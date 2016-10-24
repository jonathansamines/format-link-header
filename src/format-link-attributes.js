'use strict';

/**
 * Stringify every linkProperty attribute in the format specified in the weblinks specs
 * Since the "url" attribute is shown in a special field, it is ignored
 * @param  {Object} linkProperty Unique properties link object
 * @return {String}              String which contains all attributes=values separated by semicolons
 */
module.exports = function formatLinkAttributes(linkProperty) {
  return Object
    .keys(linkProperty)
    .filter(function ignoreUrlAttribute(linkAttributeName) {
      return linkAttributeName !== 'url';
    })
    .map(function stringifyAttribute(linkAttributeName, index, array) {
      const linkAttribute = linkProperty[linkAttributeName];
      const isLastElement = index === array.length - 1;

      return `${linkAttributeName}="${linkAttribute}${isLastElement ? '"' : '";'}`;
    })
    .join(' ');
};
