var url = require('url');

/**
 * Transform the current link header object, to an object easy to transform to the link format
 * @param  {Object} linkProperty Property object, which contains all information about a given link
 */
module.exports = function transformLinkProperty(linkProperty) {
  var queryParams = url.parse(linkProperty.url, true).query;
  var linkObject = {};

  Object
    .keys(linkProperty)
    .forEach(function mapReferenceProperties(navProperty) {
      var navPropertyValue = linkProperty[navProperty];

      // if it´s not a querystring param, then generate an attribute for it
      if (queryParams[navProperty] === undefined) {
        linkObject[navProperty] = navPropertyValue;
      }
    });

  return linkObject;
};
