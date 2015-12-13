/**
 * Get an array with unique link object rel attributes
 * since this attributes were created from the multiple "rel" values format
 * @param  {Object} linkObject Original object which contains the parsed link header
 * @return {Array}             Array which contains grouped rel attributes.
 */
module.exports = function groupRelAttributes(linkObject) {
  var linkPropertyName;
  var linkProperty;
  var uniqueProperties = {};

  for (linkPropertyName in linkObject) {
    if (!linkObject.hasOwnProperty(linkPropertyName)) continue;

    linkProperty = linkObject[linkPropertyName];

    if (uniqueProperties[linkProperty.url] === undefined) {
      uniqueProperties[linkProperty.url] = linkProperty;
    } else {
      uniqueProperties[linkProperty.url].rel += ' ' + linkProperty.rel;
    }
  }

  return Object
    .keys(uniqueProperties)
    .map(function getPropertyValue(propertyName) {
      return uniqueProperties[propertyName];
    });
};
