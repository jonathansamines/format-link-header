'use strict';

const url = require('url');

/**
 * Transform the current link header object, to an object easy to transform to the link format
 * @param  {Object} linkProperty Property object, which contains all information about a given link
 */
module.exports = function transformLinkProperty(linkProperty) {
  const queryParams = url.parse(linkProperty.url, true).query;
  const transformation = {};

  Object
    .keys(linkProperty)
    .forEach(function mapReferenceProperties(navProperty) {
      const navPropertyValue = linkProperty[navProperty];

      // if it´s not a querystring param, then generate an attribute for it
      if (queryParams[navProperty] === undefined) {
        transformation[navProperty] = navPropertyValue;
      }
    });

  return transformation;
};
