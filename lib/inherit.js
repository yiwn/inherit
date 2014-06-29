/**
 * Dependencies.
 */

var extend = require('yiwn-extend');

/**
 * Expose
 */

module.exports = inherit;


/**
 * Setup prototype chain from subclasses.
 *
 * @param  {Class} Parent
 * @param  {Object} extension
 * @param  {Function} constructor [optional]
 * @return {Class}
 */

function inherit (Parent, extension, constructor) {
    if (!constructor && typeof extension == 'function')
        constructor = extension, extension = {};

    var next = constructor || function () {
            Parent.apply(this, arguments);
        };

    next.prototype = Object.create(Parent.prototype);
    next.prototype.constructor = next;

    // static `.extend` to child class
    next.extend = inherit.bind(null, next);

    extend(next.prototype, extension);

    next.__super__ = Parent.prototype;

    return next;
}
