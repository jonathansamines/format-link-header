var url = require('url');

/**
 * Loops through specified link objects, automatically formatting 'url' values that have been defined
 * as objects via url.format().
 * @param  {Object} linkProperty Unique properties link object
 * @return {Object}
 */
module.exports = function formatLinkUrls(linkObject) {

    for (linkPropertyName in linkObject) {

        var linkProperty = linkObject[linkPropertyName];

        if (typeof linkProperty.url === 'object') {
            linkProperty.url = url.format(linkProperty.url);
        }

    }

    return linkObject;

}
