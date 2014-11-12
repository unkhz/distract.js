/*global define*/
;(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        //Allow using this built library as an AMD module
        //in another project. That other project will only
        //see this AMD call, not the internal modules in
        //the closure below.
        define([], factory);
    } else {
        //Browser globals case. Just assign the
        //result to a property on the global.
        root.Distract = factory(root);
    }
}(this, function (root) {

/**
 * @namespace Distract
 */

var objectToString = Object.prototype.toString;

////////////////////////////////////////////////////
// Utility methods /////////////////////////////////
/**
 * Merge two or more objects together from right to left. The object given as the first argument
 * will be modified and returned.
 *
 * @function extend
 * @see {@link https://github.com/unkhz/mirin.js/blob/master/src/root.js Mirin.extend}
 * @param {Mixed} ... Any number of plain objects or scalar values to be merged from right to left
 * @return {Object} The object given as first argument with the objects of other arguments merged into it
 * @private
 */
function extend() {
    var dest = arguments[0],
        rest = Array.prototype.slice.call(arguments,1),
        i,j,len;
    for ( i=0,len=rest.length;i<len;i++ ) {
        var src = rest[i];
        if ( src ) {
            for ( j in src ) {
                if (
                    objectToString.call(dest[j]) === '[object Object]' &&
                    objectToString.call(src[j]) === '[object Object]'
                ) {
                    extend(dest[j],src[j]);
                } else {
                    dest[j] = src[j];
                }
            }
        }
    }
    return dest;
}

/**
 * Get the value of an object property or method, fallback to default value
 *
 * @function getValue
 * @param {Object} obj The object to search for a property
 * @param {String} property The property name
 * @param {Array} args Array of arguments to be passed to the property if it is a method instead of a scalar variable
 * @param {Mixed} defaultValue The fallback value which is returned if target value is undefined
 * @return {Mixed}
 * @private
 */
function getValue(obj, property, args, defaultValue) {
    var val;
    if ( typeof obj[property] === typeof Function ) {
        val = obj[property].apply(null, args);
    } else {
        val = obj[property];
    }
    return val === undefined ? defaultValue : val;
}

/**
 * Cross-browser requestAnimationFrame
 *
 * @external
 * @type {Function}
 * @private
 */
var requestAnimationFrame = root.requestAnimationFrame ||
        root.webkitRequestAnimationFrame ||
        root.mozRequestAnimationFrame ||
        function(cb) { setTimeout(cb,1); };


/**
 * Get vendor prefixed style property name
 *
 * @function getStyleProperty
 * @see {@link https://github.com/unkhz/transr.js Transr.getStyleProperty}
 * @param {String} property Property name without vendor prefixes
 * @return {String} Property name with the correct vendor prefix for the browser
 * @private
 */
var propertyCache = {};
var testEl = document.createElement('div');
function getStyleProperty(property) {
    if (propertyCache[property]) {
        return propertyCache[property];
    }
    var returnProperty;
    if (testEl.style[property] !== undefined) {
        returnProperty = property;
    } else {
        for (var i = 0, prefixes = [ "webkit", "moz", "Moz", "o", "ms" ], len = prefixes.length; i < len; i++) {
            var prefixedProperty = prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1);
            if (document.body.style[prefixedProperty] !== undefined) {
                returnProperty = prefixedProperty;
            }
        }
    }
    return propertyCache[property] = returnProperty;
}

/**
 * Build a dimension string to be given as value for a style property
 *
 * @function buildDimensionString
 * @param  {Array} valueObject First parameter should be the value, second parameter should be the CSS unit E.g. 'px'
 * @return {String} Valid string to be set as a value for a style property
 * @private
 */
function buildDimensionString(valueObject) {
    var val = valueObject[0];
    var suffix = valueObject[1];
    // undefined == 0, null == null
    if ( val === undefined ) { val = "0" + suffix; }
    return typeof val ===  typeof 1 ? val.toString() + suffix : val;
}

/**
 * Build options object by picking one of each option defined as array. If the
 * original value is an Array, a random value will be selected from that Array.
 * If the original value is a Function, the return value will be selected.
 *
 * @function pickParticleOpts
 * @param  {Number} id   Numeric id of the Particle
 * @param  {Array} opts  Array containing scalar, array or function values.
 * @return {Object}      Object containing values translated to a scalar value
 * @private
 */
function pickParticleOpts(id, opts) {
    var o={},key,val;
    for ( key in opts ) {
        val = opts[key];
        val = val.join ?
            val[Math.ceil(Math.random()*val.length)-1] :
            val;
        o[key] = typeof val === typeof Function && callbackParticleOpts.indexOf(key) < 0 ? val(id,opts) : val;
    }
    return o;
}

////////////////////////////////////////////////////
// ParticleOptions /////////////////////////////////

/**
 * @classdesc
 * The base class for Particle instance configuration
 *
 * @class ParticleOptions
 * @memberOf  Distract
 * @param {Object} opts Plain object containing the data to be extended into the ParticleOptions instance
 */
var ParticleOptions = function(opts){
    extend(this, opts);
};

/**
 * Default ParticleOptions uses this simple iteration rule to
 * modify a single style property (or property function) of the
 * DOM element representing the Particle. Each of the properties can
 * be defined as a function as well.
 *
 * @typedef SimpleIterationRule
 * @memberOf Distract
 * @property {String} property            The style property to be manipulated
 * @property {String} [propertyFunction]  The possible property function of the style property E.g a specific CSS transform function
 * @property {Number} inc                 The numeric increment to be added to the value of the style property / function
 * @property {Number} [speed=1]           The multiplier which defines the speed of the animation
 * @property {Number} [max=Infinity]      The maximum value to which the set value should be constrained to
 * @property {Number} [min=-Infinity]     The minimum value to which the set value should be constrained to
 * @property {Function} [parse]           If defined, this method will be called to parse the rule instead of the generic ParticleOptions.parseIterationRule method
 *
 */

/**
 * List of particle options that should be defined as functions
 * @property {Array}
 * @private
 */
var callbackParticleOpts = ['initState', 'iterateState', 'parseIterationRule'];

extend(ParticleOptions.prototype, {
    /**
     * Contents of the particle element
     * @property {String} text
     * @memberOf Distract.ParticleOptions#
     */
    text: 'undefined',

    /**
     * CSS class of the particle element
     * @type {String}
     * @memberOf Distract.ParticleOptions#
     */
    className: '',

    /**
     * A multiplier for the frame rate of the animation. If the value is 1 or larger,
     * the particle state will be iterated on every animation step. Values smaller than 0
     * will cause the particle state to be static.
     *
     * So, the smaller the value, the more jerky the animation will be. To affect the
     * speed of the animation without touching the frame rate, use the speed property in
     * the iteration rule.
     *
     * @type {Number}
     * @memberOf Distract.ParticleOptions#
     */
    iterationSpeed: 1,

    /**
     * If true, the Layer will create a new particle instance in each animation step and
     * start destroying oldest existing one when the particle limit has been reached.
     *
     * @type {Boolean}
     * @memberOf Distract.ParticleOptions#
     */
    respawn: false,

    /**
     * A list of the iteration rules to be used for determining the new visual state
     * of the particle. The default ParticleOptions behavior is to go through all
     * rules on every iteration. It is also expected that the iteration rules are of
     * SimpleIterationRule type.
     *
     * @type {Array}
     * @memberOf Distract.ParticleOptions#
     */
    iterationRules: [],

    /**
     * Parses a single rule in the iterationRules collection. Defaults to parsing
     * according to SimpleIterationRule definition. The rule properties can be
     * defined as a function or a scalar value.
     *
     * You can change the behavior by defining your own iteration rules and overriding
     * this method to parse them according to the desired behavior.
     *
     * @param {Distract.SimpleIterationRule} rule The rule instance to be parsed
     * @param {Distract.ParticleState}   state   The current visual state of the Particle
     * @param {Distract.ParticleOptions} opts    The ParticleOptions instance of the Particle
     * @param {Distract.Particle}        particle The Particle instance
     * @memberOf Distract.ParticleOptions#
     */
    parseIterationRule: function(rule, state, opts, particle) {
        var property = getValue(rule, 'property', arguments),
            propertyFunction = getValue(rule, 'propertyFunction', arguments),
            inc = getValue(rule, 'inc', arguments),
            speed = getValue(rule, 'speed', arguments, 1),
            max = getValue(rule, 'max', arguments, Infinity),
            min = getValue(rule, 'min', arguments, -Infinity),
            oldPropertyObject = state.style[property] = state.style[property] || [],
            oldValue = propertyFunction ? oldPropertyObject[propertyFunction][0] : oldPropertyObject[0],
            newValue = Math.min(Math.max(oldValue + (inc*speed), min), max);

        if ( propertyFunction ) {
            state.style[property][propertyFunction][0] = newValue;
        } else {
            state.style[property][0] = newValue;
        }
    },

    /**
     * The initial state of the particle. Can be either a function or a plain object. Note that if
     * you use a plain object, it will be used as the state for __all__ of the particles. This is useful
     * when you want to create trailing animations. For independent particles, the initial state should
     * be created with a function.
     *
     * @param {Number}          id          The numeric ID of the particle instance
     * @param {Distract.ParticleOptions} opts        The ParticleOptions instance
     * @memberOf Distract.ParticleOptions#
     */
    initState: function(particle, opts) {
        return {
            style:{}
        };
    },


    /**
     * This method is called by the Particle every time when a new animation step is
     * taken. It is expected to modify the visual state of the Particle and return it as a
     * plain object. Default behavior is to call the parse method of a rule or the generic
     * parseIterationRule method if a rule specific parse method does not exist.
     *
     * @param {Distract.Particle}        particle    The Particle instance
     * @param {Distract.ParticleState}   state       A model object representing the current visual state of the Particle
     * @param {Distract.ParticleOptions} opts        The ParticleOptions instance
     * @return {Object} The modified version of the model object representing the current visual state of the Particle
     * @memberOf Distract.ParticleOptions#
     */
    iterateState: function(particle, state, opts) {
        for ( var i=0, ilen=opts.iterationRules.length; i<ilen; i++ ) {
            var rule = opts.iterationRules[i];
            (rule.parse ? rule.parse : opts.parseIterationRule)(rule,state,opts,particle);
        }
        return state;
    }
});

////////////////////////////////////////////////////
// Particle ////////////////////////////////////////

/**
 * @classdesc
 * Particle represents and controls a single animation element and it's state. It
 * handles requesting animation frames for itself, parses the iteration rules that
 * define the changes for each animation frame and updates the DOM element style
 * attribute accordingly.
 *
 * @class Particle
 * @memberOf Distract
 * @param {Object}  props       Configuration properties to be extended to the particle instance
 * @param {Number}  props.id    Numeric ID of the Particle,
 * @param {Element} props.el    DOM element representing the Particle
 * @param {Distract.Layer}   props.layer The parent Layer of the Particle
 * @param {Distract.ParticleOptions} props.opts The options object that defines the configuration for the Particle
 */
var Particle = function(props) {
    extend(this, props);
    this.state = getValue(this.opts, 'initState', [this.id, this.opts], {});
    this.animate();
};

/**
 * ParticleState contains the visual state of a Particle. IterationRules should
 * modify the ParticleState instance so that the visual state is changed.
 *
 * Style can be defined as
 *
 *   * Array: [value, unit]
 *   * Object: {transformFunction:[value, unit]}
 *
 * Example:
 *
 *     style: {
 *         width:[100,'%'],
 *         color:['rgb(255,255,255)',''],
 *         opacity:[0.66,''],
 *         transform:{
 *             translateX: [0,'px'],
 *             rotateY: [180,'deg']
 *         }
 *     }
 *
 * @typedef ParticleState
 * @memberOf Distract
 * @property {Object} style      Plain object containing style rules to be added to the Particle element's style
 * @property {Object} attributes Plain object containing attributes to be added to the Particle element
 *
 */

extend(Particle.prototype, {
    /**
     * Start animating the Particle instance
     * @memberOf Distract.Particle#
     */
    animate: function() {
        var _this = this;
        var step = function(){
            if ( !_this.destruct ) {
                if ( !_this.initialized || Math.random() < _this.opts.iterationSpeed ) {
                    _this.render();
                }
            } else if ( _this.destructOpacity > 0 ) {
                var op = _this.state.style ? Number(_this.state.style.opacity||1) : Number(_this.el.style.opacity);
                _this.render();
                _this.destructOpacity -= Math.max(op/10, 0.005);
                _this.el.style.opacity = Math.max(0, op * _this.destructOpacity);
            } else {
                _this.el.parentNode.removeChild(_this.el);
                // stop, die and let gc clean up
                _this.isDestroyed = true;
                return;
            }
            requestAnimationFrame(step, _this.el);
        };
        requestAnimationFrame(step, _this.el);
    },

    /**
     * Start destroying the Particle instance
     * @memberOf Distract.Particle#
     */
    destroy: function() {
        this.destruct = true;
        this.destructOpacity = 1;
    },

    /**
     * Iterate and apply the visual state of the Particle to the related DOM element
     * @memberOf Distract.Particle#
     */
    render: function() {
        var prop;
        var opts = this.opts;
        var el = this.el;

        // Initialize content if needed
        if (  !this.initialized ) {
            el.className = 'distract-particle ' + opts.className;
            el.innerHTML = opts.text;
            for ( prop in opts.style ) {
                el.style[getStyleProperty(prop)] = getValue(opts.style, prop);
            }
            this.initialized = true;
        }

        if ( this.layer.paused ) {
            // do not animate if paused
            return;
        }

        // Iterate visual state
        var state = opts.iterateState(this, this.state, this.opts);

        // Apply CSS
        var v,f,parts;
        for ( prop in state.style || {} ) {
            v = state.style[prop];
            if ( objectToString.call(v) === '[object Object]' ) {
                parts = [];
                for ( f in v ) {
                    parts.push(f + "(" + buildDimensionString(v[f], f) + ")");
                }
                el.style[getStyleProperty(prop)] = parts.join(" ");
            } else {
                el.style[getStyleProperty(prop)] = buildDimensionString(v, prop);
            }
        }

        // Apply attributes (for SVG)
        for ( prop in state.attributes || {} ) {
            v = state.attributes[prop];
            if ( objectToString.call(v) === '[object Object]' ) {
                parts = [];
                for ( f in v ) {
                    parts.push(f + "(" + buildDimensionString(v[f], f) + ")");
                }
                el.setAttribute(prop, parts.join(" "));
            } else {
                el.setAttribute(prop, buildDimensionString(v, prop));
            }
        }
    }
});

////////////////////////////////////////////////////
// LayerOptions ////////////////////////////////////

/**
 * @classdesc
 * The base class for Layer instance configuration
 *
 * @class LayerOptions
 * @memberOf Distract
 * @param {Object} opts Object containing the data to be extended to the LayerOptions instance
 */
var LayerOptions = function(opts) {
    extend(this, opts);
};

extend(LayerOptions.prototype, {
    /**
     * Do we show the layer? If enabled is set to false during runtime, the layer will self destruct.
     * @type {Boolean}
     * @memberOf Distract.LayerOptions#
     */
    enabled: true,

    /**
     * The DOM element representing the Layer
     * @type {Element}
     * @memberOf Distract.LayerOptions#
     */
    el: document.body,

    /**
     * Should return a new element for a child Particle instance of the Layer
     * @type {Function}
     * @memberOf Distract.LayerOptions#
     */
    particleEl: function(id, opts) {
        return document.createElement('div');
    },

    /**
     * Target count of the particle elements. Total count may be bigger if particle respawning is
     * enabled.
     * @type {Number}
     * @memberOf Distract.LayerOptions#
     */
    particleCount: 8
});

////////////////////////////////////////////////////
// Layer ///////////////////////////////////////////

/**
 * @classdesc
 * Layer is a container and controller of Particles. Layer has the responsibility of creating,
 * and destroying the Particle instances. It also handles garbage cleaning of Particle instances
 * that have proactively decided to destroy themselves.
 *
 * @class Layer
 * @param {Distract.LayerOptions} layerOpts Options object that defines the configuration of the Layer
 * @param {Distract.ParticleOptions} particleOpts Options object that defines the configuration of the Particles inside this Layer
 * @memberOf Distract
 */
var Layer = function(layerOpts, particleOpts) {
    extend(this,{
        opts: new LayerOptions(),
        particleOpts: new ParticleOptions(),

        /**
         * The list of the Particle instances belonging to the Layer
         * @type {Array}
         * @memberOf Distract.Layer#
         */
        particles: [],

        particlesToBeDestroyed: [],
        lastId:-1,
        particleCheckId:-1
    });
    this.configure.apply(this, arguments);
    this.animate();
}

extend(Layer.prototype, {
    /**
     * Configure the Layer instance
     * @param {Distract.LayerOptions} layerOpts Options object that defines the configuration of the Layer
     * @param {Distract.ParticleOptions} particleOpts Options object that defines the configuration of the Particles inside this Layer
     * @memberOf Distract.Layer#
     */
    configure: function(layerOpts, particleOpts) {
        extend(this.opts, layerOpts);
        extend(this.particleOpts, particleOpts);
        this.particlesToBeDestroyed.concat(this.particles || []);
        this.particles = [];
        return this;
    },

    /**
     * Pause the operation of the Layer and Partciles without destroying them. Note that this should only
     * be used when there is an intention to continue the animation. Use destroy method instead if you
     * need to clear the resources used by the layer.
     *
     * @memberOf Distract.Layer#
     */
    pause: function() {
        this.paused = true;
        return this;
    },

    /**
     * Stop creating particles inside the Layer, order the existing particles to destroy themselves
     * and stop the layer animation loop. Essentially this method clears the memory used by particles
     * and stops the resource hogging animation loop. Only the layer object will be left behind.
     *
     * @memberOf Distract.Layer#
     */
    destroy: function() {
        this._pauseWhenEmpty = true;
        this.opts.enabled = false;
        if ( this.paused ) {
            this.animate();
        }
        return this;
    },

    /**
     * Start creating and destroying particles inside the Layer. Unpauses a paused animation, but
     * does not enable it if enabled option is set to false.
     *
     * @memberOf Distract.Layer#
     */
    animate: function() {
        this.paused = false;
        var _this=this;
        var createParticle = function(){
            if ( _this.paused ) { return; }
            var id,el,p,pId,
                opts=_this.opts,
                len = _this.particles.length;
            if ( opts.enabled && len < opts.particleCount ) {
                id = ++_this.lastId;
                el = getValue(opts, 'particleEl', [id,opts]);
                p = new Particle({
                    id:id,
                    el:el,
                    layer:_this,
                    opts: new ParticleOptions(pickParticleOpts(id, _this.particleOpts))
                });
                _this.opts.el.appendChild(el);
                _this.particles.push(p);
            } else if ( len > 0 && ( !_this.opts.enabled || !!Number(_this.opts.respawn) ) ) {
                p = _this.particles.shift();
                p.destroy();
            }

            // garbage cleaning for self destructed particles
            if ( len > 0 ) {
                pId = ++_this.particleCheckId % _this.particles.length,
                p = _this.particles[pId];
                if ( p && p.isDestroyed ) {
                    delete _this.particles[pId];
                    _this.particles.splice(pId,1);
                }
            }

            // mass destruction of particles
            if ( _this.particlesToBeDestroyed.length > 0 ) {
                p = _this.particlesToBeDestroyed.shift();
                p.destroy();
            }

            if ( _this._pauseWhenEmpty &&
                _this.particlesToBeDestroyed.length === 0 &&
                _this.particles.length === 0
            ) {
                // destroyed, stop animation
                _this._pauseWhenEmpty = false;
                _this.opts.enabled = true;
            } else {
                requestAnimationFrame(createParticle);
            }
        };
        requestAnimationFrame(createParticle);
        return this;
    }
});

return {
    Layer:Layer,
    LayerOptions:LayerOptions,
    Particle:Particle,
    ParticleOptions:ParticleOptions
};

}));