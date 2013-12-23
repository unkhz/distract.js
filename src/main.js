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


// object helper method, copied from Mirin.js
function extend() {
    var dest = arguments[0],
        rest = arraySlice.call(arguments,1),
        i,j,len;
    for ( i=0,len=rest.length;i<len;i++ ) {
        var src = rest[i];
        if ( src ) {
            for ( j in src ) {
                if (
                    Object.prototype.toString.call(dest[j]) === '[object Object]' &&
                    Object.prototype.toString.call(src[j]) === '[object Object]'
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

function getValue(obj, property, args, defaultValue) {
    var val;
    if ( typeof obj[property] === typeof Function ) {
        val = obj[property].apply(null, args);
    } else {
        val = obj[property];
    }
    return val === undefined ? defaultValue : val;
}

var
    // minification optimization
    arraySlice = Array.prototype.slice,

    callbackParticleOpts =['initState', 'iterateState', 'parseIterationRule'],

    defaultLayerOpts = {

        // Do we show the layer? If enabled is set to false, the layer will self destruct.
        enabled:true,

        // Layer element
        el: document.body,

        // Creates a particle element
        particleEl: function(id, opts) {
            return document.createElement('div');
        },

        // Target count of the particle elements, total count will be bigger depending on other options
        particleCount: '8'
    },

    defaultParticleOpts = {

        // Contents of the particle element
        text: 'undefined',

        // CSS class of the particle element
        className: '',

        // A multiplier defining the speed of the iteration
        iterationSpeed:1,

        // Do we create a new particle in each iteration and delete oldest existing one
        respawn:0,

        // Maximum opacity of the particle
        minOpacity:0.66,

        // Maximum opacity of the particle
        maxOpacity:1,

        // Defines the iteration rules
        iterationRules: [],

        // Parses a single rule in the iterationRules collection
        parseIterationRule: function(rule,state,opts) {
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

        // Defines the initial state of the particle
        initState: function(particle, opts) {
            return {
                style:{}
            };
        },

        // Defines the state of the particle for the next animation frame
        iterateState: function(particle, state, opts) {
            for ( var i=0, ilen=opts.iterationRules.length; i<ilen; i++ ) {
                var rule = opts.iterationRules[i];
                (rule.parse ? rule.parse : opts.parseIterationRule)(rule,state,opts,particle);
            }
            return state;
        }
    },

    testEl = document.createElement('div'),
    propertyCache = {},

    requestAnimationFrame = root.requestAnimationFrame ||
        root.webkitRequestAnimationFrame ||
        root.mozRequestAnimationFrame ||
        function(cb) { setTimeout(cb,1); };


// get vendor prefixed style property (Transr.js)
function getStyleProperty(property) {
    if (propertyCache[property]) {
        return propertyCache[property];
    }
    var returnProperty;
    if (testEl.style[property] !== undefined) {
        returnProperty = property;
    }
    for (var i = 0, prefixes = [ "webkit", "moz", "o", "ms" ], len = prefixes.length; i < len; i++) {
        var prefixedProperty = prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1);
        if (document.body.style[prefixedProperty] !== undefined) {
            returnProperty = prefixedProperty;
        }
    }
    return propertyCache[property] = returnProperty;
}

function buildDimensionString(valueObject, aMethod) {
    var val = valueObject[0],
        suffix = valueObject[1];
    // undefined == 0, null == null
    if ( val === undefined ) { val = "0" + suffix; }
    return typeof val ===  typeof 1 ? val.toString() + suffix : val;
}

// build options object by picking one of each option defined as array
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


// Particle //////////////

var Particle = function(props) {
    extend(this, props);
    this.state = getValue(this.opts, 'initState', [this.id, this.opts], {});
    this.animate();
};

Particle.prototype.animate = function() {
    var _this = this,
        step = function(){
            if ( !_this.destruct ) {
                if ( !_this.initialized || Math.random() < _this.opts.iterationSpeed ) {
                    _this.render();
                }
            } else if ( _this.destructOpacity > 0 ) {
                _this.render();
                _this.destructOpacity -= Math.max(_this.state.style.opacity/10, 0.005);
                _this.el.style.opacity = Math.max(0,Number(_this.state.style.opacity) * _this.destructOpacity);
            } else {
                _this.el.parentNode.removeChild(_this.el);
                // stop, die and let gc clean up
                _this.isDestroyed = true;
                return;
            }
            requestAnimationFrame(step, _this.el);
        };
    requestAnimationFrame(step, _this.el);
};

Particle.prototype.destroy = function() {
    this.destruct = true;
    this.destructOpacity = 1;
};

Particle.prototype.render = function() {
    var prop,opts = this.opts;

    // initialize content if needed
    if (  !this.initialized ) {
        this.el.className = 'distract-particle ' + opts.className;
        this.el.innerHTML = opts.text;
        for ( prop in opts.style ) {
            this.el.style[getStyleProperty(prop)] = getValue(opts.style, prop);
        }
        this.initialized = true;
    }

    // update css
    var state = this.opts.iterateState(this, this.state, this.opts);
    for ( prop in state.style ) {
        if ( Object.prototype.toString.call(state.style[prop]) === '[object Object]' ) {
            var f, parts = [];
            for ( f in state.style[prop] ) {
                parts.push(f + "(" + buildDimensionString(state.style[prop][f], f) + ")");
            }
            this.el.style[getStyleProperty(prop)] = parts.join(" ");
        } else {
            this.el.style[getStyleProperty(prop)] = buildDimensionString(state.style[prop], prop);
        }
    }
};


// Layer /////////////////

function Layer() {
    this.opts = extend({}, defaultLayerOpts);
    this.particleOpts = extend({}, defaultParticleOpts);
    this.particles = [];
    this.particlesToBeDestroyed = [];
    this.lastId=-1;
    this.particleCheckId=-1;
    this.configure.apply(this, arguments);
    this.animate();
}

Layer.prototype.configure = function(layerOpts, particleOpts) {
    extend(this.opts, layerOpts);
    extend(this.particleOpts, particleOpts);
    this.particlesToBeDestroyed.concat(this.particles || []);
    this.particles = [];
};

Layer.prototype.pause = function() {
    this.paused = true;
};

Layer.prototype.animate = function() {
    this.paused = false;
    var _this=this,
        createParticle = function(){
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
                    opts:pickParticleOpts(id, _this.particleOpts)
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

            requestAnimationFrame(createParticle);
        };
    requestAnimationFrame(createParticle);
};


// Public API /////////////

return {
    Layer:Layer,
    Particle:Particle
};

}));