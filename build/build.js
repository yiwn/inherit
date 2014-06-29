/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("inherit", function (exports, module) {
module.exports = require("inherit/lib/inherit.js");

});

require.register("inherit/lib/inherit.js", function (exports, module) {
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

    // static `.inherit` to child class
    next.extend = inherit.bind(null, next);

    for (var i in extension)
        next.prototype[i] = extension[i];

    next.__super__ = Parent.prototype;

    return next;
}

});

require("inherit")
