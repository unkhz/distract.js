# distract.js

The post-flash JavaScript library for creating useless, resource hungry, migraine inducing animations.

[github.com/unkhz/distract.js/](https://github.com/unkhz/distract.js/)

## Demo

**WARNING!** The demo __will__ cause older iPhones to become unresponsive, so please be careful.

[un.khz.fi/screensaver](http://un.khz.fi/screensaver)

## Installation

Using npm

    npm install --save distract.js

Using bower

    bower install --save distract.js

## Quick example

All functionality is exposed via the Distract global object, unless you're using anonymous modules in which case there will be no global variables used.

Distract.Layer is the main controller of your animation. The following example will create an animation with five individual 'Hello World!' texts rotating randomly around their X and Y axis.

[You can also fiddle with it in plunkr](http://plnkr.co/edit/aZzdCDsCtb0X48XPuZnb?p=preview)


    var helloLayer = new Distract.Layer({
      el:document.body,
      particleCount:5
    },{
      text: 'Hello World!',
      className:'hello-particle',
      iterationSpeed: 1,
      iterationRules: [[
        // The first rule modifies the delta for the second and third rule
        {
          parse: function(rule, state, opts, particle) {
            // Use quite small modifications for smooth animation
            state.delta += (Math.random()-0.5)/10;
          }
        },

        // The second rule modifies the X rotation
        {
          property:'transform',
          propertyFunction:'rotateX',
          inc:function(rule, state, opts, particle){
            return state.delta * Math.random();
          }
        },

        // The third rule modifies the Y rotation
        {
          property:'transform',
          propertyFunction:'rotateY',
          inc:function(rule, state, opts, particle){
            return state.delta * Math.random();
          }
        }
      ]],
      initState: function(){
        return {
          delta: 0,
          style: {
            transform: {
              perspective:[200,''],
              rotateX:[0,'deg'],
              rotateY:[0,'deg']
            }
          }
        };
      }
    });

The first argument is the configuration object for the Layer. Distract.LayerOptions
will be used as the base configuration and the specified values will be overridden.

The second argument is the configuration object for the Particles that will be generated
inside the Layer's DOM element and animated according to the rules that you define in the
configuration. The above example defines only one rule

## Documentation

  * [API documentation](http://distractjs.khz.fi/jsdoc)

## Changelog

    0.0.2  2014-11-02   Documentation and examples
    0.0.1  2013-12-23   Initial release
