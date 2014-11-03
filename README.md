# distract.js

The post-flash JavaScript library for creating useless, resource hungry, migraine inducing animations.

[github.com/unkhz/distract.js/](https://github.com/unkhz/distract.js/)

## Features

  * Simplifies creation of generative animations
  * Works with HTML or SVG
  * Detects vendor specific CSS properties and uses only one
  * Pure JavaScript, no library dependencies
  * Uses requestAnimationFrame for maximum performance

## Demo

**WARNING!** The demo __will__ cause older iPhones to become unresponsive, so please be careful.

[un.khz.fi/screensaver](http://un.khz.fi/screensaver)

## Installation

Using npm

    npm install --save distractjs

Using bower

    bower install --save distractjs

## Documentation

  * [API documentation](http://distractjs.khz.fi/jsdoc)

## Quick example

All functionality is exposed via the Distract global object, unless you're using anonymous modules in which case no global variables will be used.

The following example will create an animation with five individual 'Hello World!' texts rotating randomly around their X and Y axis.

[You can also fiddle with it in Plunker](http://plnkr.co/edit/edpxVL?p=preview)


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
              perspective:[300,'px'],
              rotateX:[0,'deg'],
              rotateY:[0,'deg']
            }
          }
        };
      }
    });

`Distract.Layer` is the main controller and container of the animation. Upon instantiation it will automatically start creating new instances of `Distract.Particle` which represent the individual moving elements.

The first argument of the `new Distract.Layer()` constructor is the configuration object for the Layer. Specified values will override ones from the base configuration `Distract.LayerOptions`.

The second argument is the configuration object for the `Distract.Particle` instances that animated according to the rules that you define in the configuration. The above example defines three simple rules that manipulate the rotateX and rotateY transform functions. Partile configuration is also extended into the defaults defined in `Distract.ParticleOptions`.

## Changelog

    0.1.0  2014-11-02   Documentation and examples
    0.0.1  2013-12-23   Initial release
