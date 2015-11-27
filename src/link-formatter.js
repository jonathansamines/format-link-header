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

    var uniqueAttributes = {};
    for (var linkProperty in linkObject) {
      var attribute = linkObject[linkProperty];
      var lastAttribute = uniqueAttributes[attribute.url];

      if (lastAttribute === undefined) {
        uniqueAttributes[attribute.url] = attribute;
      }else {
        uniqueAttributes[attribute.url].rel += ' ' + attribute.rel;
      }
    }

    return Object
      .keys(uniqueAttributes)
      .map(function filter(attribute) {
        return uniqueAttributes[attribute];
      })
      .map(function formatProperties(linkProperty, index, array) {
        var linkPropertyObject = formatLinkAttributes(linkProperty);

        return '<' + linkPropertyObject.header + '>; rel="' + linkPropertyObject.rel + '"' + (array.length === 1 ? ';' : '');
      })
      .join(', ');
  }
};
