var url = require('url');
var querystring = require('querystring');

/**
 * Format link header attributes to an http raw header
 * @param  {Object} linkReference Attribute object, which contains all information about this segment
 */
function formatLinkAttributes(linkReference) {
  var linkObject = {
    header: '',
    rel: '',
    query: {}
  };

  Object
    .keys(linkReference)
    .forEach(function mapReferenceProperties(navProperty) {
      var navPropertyValue = linkReference[navProperty];

      // format the url
      if (navProperty === 'url') {
        linkObject.header = navPropertyValue;

        // format the standar "rel" attribute
      }else if( navProperty === 'rel'){
        linkObject.rel = navPropertyValue;

      // its a querystring param
      }else {
        linkObject.query[navProperty] = navPropertyValue;
      }
    });

  // ensure url is correctly written
  var linkUrl = url.parse(linkObject.header);
  linkUrl.search = decodeURIComponent(querystring.stringify(linkObject.query));
  linkObject.header = url.format(linkUrl);

  delete linkObject.query;

  return linkObject;
}

module.exports = {

  /**
   * Format a given links ref object, to the format as described in RFC 5988
   * @param  {Object} linkObject Link header object
   * @return {String}            Link header formatted string
   */
  format: function formatLinkHeader(linkObject) {
    if(linkObject === null || linkObject === undefined) return '';

    var uniqueAttributes = [];

    return Object
      .keys(linkObject)
      .filter(function filterGroupedProperties(linkProperty, index, array) {
        var attribute = linkObject[linkProperty];
        var isGroupedProperty = uniqueAttributes.filter(function(attr) {
          return attr.url === attribute.url;
        }).length > 0;

        uniqueAttributes.push(linkObject[linkProperty]);

        return isGroupedProperty;
      })
      .map(function formatProperties(linkProperty, index, array) {
        var linkPropertyObject = formatLinkAttributes(linkObject[linkProperty]);

        return '<' + linkPropertyObject.header + '>; rel="' + linkPropertyObject.rel + '"';
      })
      .filter(function dropRepeatedvalues(linkAttribute) {
        return linkAttribute != undefined;
      })
      .join(', ');
  }
};
