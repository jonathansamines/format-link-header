var groupRelAttributes = require('./group-rels');
var transformLinkProperty = require('./transform-property');

module.exports = {

  /**
   * Format a link properties Object, to the format described in RFC 5988
   * @param  {Object} linkObject Link header object
   * @return {String}            Link header formatted string
   */
  format: function formatLinkHeader(linkObject) {
    if (linkObject === null || linkObject === undefined) return '';

    return groupRelAttributes(linkObject)
      .map(function formatProperties(linkProperty, index, array) {
        var linkPropertyObject = transformLinkProperty(linkProperty);

        return '<' + linkPropertyObject.url + '>; rel="' + linkPropertyObject.rel + '"' + (array.length === 1 ? ';' : '');
      })
      .join(', ');
  }
};
