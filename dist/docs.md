<a name="Distract"></a>
#Distract
**Members**

* [Distract](#Distract)
  * [type: Distract.SimpleIterationRule](#Distract.SimpleIterationRule)
  * [type: Distract.ParticleState](#Distract.ParticleState)
  * [class: Distract.ParticleOptions](#Distract.ParticleOptions)
    * [new Distract.ParticleOptions(opts)](#new_Distract.ParticleOptions)
    * [particleOptions.text](#Distract.ParticleOptions#text)
    * [particleOptions.className](#Distract.ParticleOptions#className)
    * [particleOptions.iterationSpeed](#Distract.ParticleOptions#iterationSpeed)
    * [particleOptions.respawn](#Distract.ParticleOptions#respawn)
    * [particleOptions.iterationRules](#Distract.ParticleOptions#iterationRules)
    * [particleOptions.parseIterationRule(rule, state, opts, particle)](#Distract.ParticleOptions#parseIterationRule)
    * [particleOptions.initState(id, opts)](#Distract.ParticleOptions#initState)
    * [particleOptions.iterateState(particle, state, opts)](#Distract.ParticleOptions#iterateState)
  * [class: Distract.Particle](#Distract.Particle)
    * [new Distract.Particle(props)](#new_Distract.Particle)
    * [particle.animate()](#Distract.Particle#animate)
    * [particle.destroy()](#Distract.Particle#destroy)
    * [particle.render()](#Distract.Particle#render)
  * [class: Distract.LayerOptions](#Distract.LayerOptions)
    * [new Distract.LayerOptions(opts)](#new_Distract.LayerOptions)
    * [layerOptions.enabled](#Distract.LayerOptions#enabled)
    * [layerOptions.el](#Distract.LayerOptions#el)
    * [layerOptions.particleCount](#Distract.LayerOptions#particleCount)
    * [layerOptions.particleEl()](#Distract.LayerOptions#particleEl)
  * [class: Distract.Layer](#Distract.Layer)
    * [new Distract.Layer(layerOpts, particleOpts)](#new_Distract.Layer)
    * [layer.particles](#Distract.Layer#particles)
    * [layer.configure(layerOpts, particleOpts)](#Distract.Layer#configure)
    * [layer.pause()](#Distract.Layer#pause)
    * [layer.destroy()](#Distract.Layer#destroy)
    * [layer.animate()](#Distract.Layer#animate)

<a name="Distract.SimpleIterationRule"></a>
##type: Distract.SimpleIterationRule
Default ParticleOptions uses this simple iteration rule to
modify a single style property (or property function) of the
DOM element representing the Particle. Each of the properties can
be defined as a function as well.

**Properties**

- property `String` - The style property to be manipulated  
- propertyFunction `String` - The possible property function of the style property E.g a specific CSS transform function  
- inc `Number` - The numeric increment to be added to the value of the style property / function  
- speed `Number` - The multiplier which defines the speed of the animation  
- max `Number` - The maximum value to which the set value should be constrained to  
- min `Number` - The minimum value to which the set value should be constrained to  
- parse `function` - If defined, this method will be called to parse the rule instead of the generic ParticleOptions.parseIterationRule method  

<a name="Distract.ParticleState"></a>
##type: Distract.ParticleState
ParticleState contains the visual state of a Particle. IterationRules should
modify the ParticleState instance so that the visual state is changed.

Style can be defined as

  * Array: [value, unit]
  * Object: {transformFunction:[value, unit]}

Example:

    style: {
        width:[100,'%'],
        color:['rgb(255,255,255)',''],
        opacity:[0.66,''],
        transform:{
            translateX: [0,'px'],
            rotateY: [180,'deg']
        }
    }

**Properties**

- style `Object` - Plain object containing style rules to be added to the Particle element's style  
- attributes `Object` - Plain object containing attributes to be added to the Particle element  

<a name="Distract.ParticleOptions"></a>
##class: Distract.ParticleOptions
The base class for Particle instance configuration

**Members**

* [class: Distract.ParticleOptions](#Distract.ParticleOptions)
  * [new Distract.ParticleOptions(opts)](#new_Distract.ParticleOptions)
  * [particleOptions.text](#Distract.ParticleOptions#text)
  * [particleOptions.className](#Distract.ParticleOptions#className)
  * [particleOptions.iterationSpeed](#Distract.ParticleOptions#iterationSpeed)
  * [particleOptions.respawn](#Distract.ParticleOptions#respawn)
  * [particleOptions.iterationRules](#Distract.ParticleOptions#iterationRules)
  * [particleOptions.parseIterationRule(rule, state, opts, particle)](#Distract.ParticleOptions#parseIterationRule)
  * [particleOptions.initState(id, opts)](#Distract.ParticleOptions#initState)
  * [particleOptions.iterateState(particle, state, opts)](#Distract.ParticleOptions#iterateState)

<a name="new_Distract.ParticleOptions"></a>
###new Distract.ParticleOptions(opts)
**Params**

- opts `Object` - Plain object containing the data to be extended into the ParticleOptions instance  

<a name="Distract.ParticleOptions#text"></a>
###particleOptions.text
Contents of the particle element

**Properties**

- text `String`  

<a name="Distract.ParticleOptions#className"></a>
###particleOptions.className
CSS class of the particle element

**Type**: `String`  
<a name="Distract.ParticleOptions#iterationSpeed"></a>
###particleOptions.iterationSpeed
A multiplier for the frame rate of the animation. If the value is 1 or larger,
the particle state will be iterated on every animation step. Values smaller than 0
will cause the particle state to be static.

So, the smaller the value, the more jerky the animation will be. To affect the
speed of the animation without touching the frame rate, use the speed property in
the iteration rule.

**Type**: `Number`  
<a name="Distract.ParticleOptions#respawn"></a>
###particleOptions.respawn
If true, the Layer will create a new particle instance in each animation step and
start destroying oldest existing one when the particle limit has been reached.

**Type**: `Boolean`  
<a name="Distract.ParticleOptions#iterationRules"></a>
###particleOptions.iterationRules
A list of the iteration rules to be used for determining the new visual state
of the particle. The default ParticleOptions behavior is to go through all
rules on every iteration. It is also expected that the iteration rules are of
SimpleIterationRule type.

**Type**: `Array`  
<a name="Distract.ParticleOptions#parseIterationRule"></a>
###particleOptions.parseIterationRule(rule, state, opts, particle)
Parses a single rule in the iterationRules collection. Defaults to parsing
according to SimpleIterationRule definition. The rule properties can be
defined as a function or a scalar value.

You can change the behavior by defining your own iteration rules and overriding
this method to parse them according to the desired behavior.

**Params**

- rule <code>[SimpleIterationRule](#Distract.SimpleIterationRule)</code> - The rule instance to be parsed  
- state <code>[ParticleState](#Distract.ParticleState)</code> - The current visual state of the Particle  
- opts <code>[ParticleOptions](#Distract.ParticleOptions)</code> - The ParticleOptions instance of the Particle  
- particle <code>[Particle](#Distract.Particle)</code> - The Particle instance  

<a name="Distract.ParticleOptions#initState"></a>
###particleOptions.initState(id, opts)
The initial state of the particle. Can be either a function or a plain object. Note that if
you use a plain object, it will be used as the state for __all__ of the particles. This is useful
when you want to create trailing animations. For independent particles, the initial state should
be created with a function.

**Params**

- id `Number` - The numeric ID of the particle instance  
- opts <code>[ParticleOptions](#Distract.ParticleOptions)</code> - The ParticleOptions instance  

<a name="Distract.ParticleOptions#iterateState"></a>
###particleOptions.iterateState(particle, state, opts)
This method is called by the Particle every time when a new animation step is
taken. It is expected to modify the visual state of the Particle and return it as a
plain object. Default behavior is to call the parse method of a rule or the generic
parseIterationRule method if a rule specific parse method does not exist.

**Params**

- particle <code>[Particle](#Distract.Particle)</code> - The Particle instance  
- state <code>[ParticleState](#Distract.ParticleState)</code> - A model object representing the current visual state of the Particle  
- opts <code>[ParticleOptions](#Distract.ParticleOptions)</code> - The ParticleOptions instance  

**Returns**: `Object` - The modified version of the model object representing the current visual state of the Particle  
<a name="Distract.Particle"></a>
##class: Distract.Particle
Particle represents and controls a single animation element and it's state. It
handles requesting animation frames for itself, parses the iteration rules that
define the changes for each animation frame and updates the DOM element style
attribute accordingly.

**Members**

* [class: Distract.Particle](#Distract.Particle)
  * [new Distract.Particle(props)](#new_Distract.Particle)
  * [particle.animate()](#Distract.Particle#animate)
  * [particle.destroy()](#Distract.Particle#destroy)
  * [particle.render()](#Distract.Particle#render)

<a name="new_Distract.Particle"></a>
###new Distract.Particle(props)
**Params**

- props `Object` - Configuration properties to be extended to the particle instance  
  - id `Number` - Numeric ID of the Particle,  
  - el `Element` - DOM element representing the Particle  
  - layer <code>[Layer](#Distract.Layer)</code> - The parent Layer of the Particle  
  - opts <code>[ParticleOptions](#Distract.ParticleOptions)</code> - The options object that defines the configuration for the Particle  

<a name="Distract.Particle#animate"></a>
###particle.animate()
Start animating the Particle instance

<a name="Distract.Particle#destroy"></a>
###particle.destroy()
Start destroying the Particle instance

<a name="Distract.Particle#render"></a>
###particle.render()
Iterate and apply the visual state of the Particle to the related DOM element

<a name="Distract.LayerOptions"></a>
##class: Distract.LayerOptions
The base class for Layer instance configuration

**Members**

* [class: Distract.LayerOptions](#Distract.LayerOptions)
  * [new Distract.LayerOptions(opts)](#new_Distract.LayerOptions)
  * [layerOptions.enabled](#Distract.LayerOptions#enabled)
  * [layerOptions.el](#Distract.LayerOptions#el)
  * [layerOptions.particleCount](#Distract.LayerOptions#particleCount)
  * [layerOptions.particleEl()](#Distract.LayerOptions#particleEl)

<a name="new_Distract.LayerOptions"></a>
###new Distract.LayerOptions(opts)
**Params**

- opts `Object` - Object containing the data to be extended to the LayerOptions instance  

<a name="Distract.LayerOptions#enabled"></a>
###layerOptions.enabled
Do we show the layer? If enabled is set to false during runtime, the layer will self destruct.

**Type**: `Boolean`  
<a name="Distract.LayerOptions#el"></a>
###layerOptions.el
The DOM element representing the Layer

**Type**: `Element`  
<a name="Distract.LayerOptions#particleCount"></a>
###layerOptions.particleCount
Target count of the particle elements. Total count may be bigger if particle respawning is
enabled.

**Type**: `Number`  
<a name="Distract.LayerOptions#particleEl"></a>
###layerOptions.particleEl()
Should return a new element for a child Particle instance of the Layer

**Type**: `function`  
<a name="Distract.Layer"></a>
##class: Distract.Layer
Layer is a container and controller of Particles. Layer has the responsibility of creating,
and destroying the Particle instances. It also handles garbage cleaning of Particle instances
that have proactively decided to destroy themselves.

**Members**

* [class: Distract.Layer](#Distract.Layer)
  * [new Distract.Layer(layerOpts, particleOpts)](#new_Distract.Layer)
  * [layer.particles](#Distract.Layer#particles)
  * [layer.configure(layerOpts, particleOpts)](#Distract.Layer#configure)
  * [layer.pause()](#Distract.Layer#pause)
  * [layer.destroy()](#Distract.Layer#destroy)
  * [layer.animate()](#Distract.Layer#animate)

<a name="new_Distract.Layer"></a>
###new Distract.Layer(layerOpts, particleOpts)
**Params**

- layerOpts <code>[LayerOptions](#Distract.LayerOptions)</code> - Options object that defines the configuration of the Layer  
- particleOpts <code>[ParticleOptions](#Distract.ParticleOptions)</code> - Options object that defines the configuration of the Particles inside this Layer  

<a name="Distract.Layer#particles"></a>
###layer.particles
The list of the Particle instances belonging to the Layer

**Type**: `Array`  
<a name="Distract.Layer#configure"></a>
###layer.configure(layerOpts, particleOpts)
Configure the Layer instance

**Params**

- layerOpts <code>[LayerOptions](#Distract.LayerOptions)</code> - Options object that defines the configuration of the Layer  
- particleOpts <code>[ParticleOptions](#Distract.ParticleOptions)</code> - Options object that defines the configuration of the Particles inside this Layer  

**Returns**: `Layer` - returns the layer instace for chaining  
<a name="Distract.Layer#pause"></a>
###layer.pause()
Pause the operation of the Layer and Partciles without destroying them. Note that this should only
be used when there is an intention to continue the animation. Use destroy method instead if you
need to clear the resources used by the layer.

**Returns**: `Layer` - returns the layer instace for chaining  
<a name="Distract.Layer#destroy"></a>
###layer.destroy()
Stop creating particles inside the Layer, order the existing particles to destroy themselves
and stop the layer animation loop. Essentially this method clears the memory used by particles
and stops the resource hogging animation loop. Only the layer object will be left behind.

Note that the destruction will happen asynchronously one by one, so depending on the amount of
particles and iteration speed it might take seconds before all the particles have been destroyed.

**Returns**: `Layer` - returns the layer instace for chaining  
<a name="Distract.Layer#animate"></a>
###layer.animate()
Start creating and destroying particles inside the Layer one by one. Unpauses a
paused animation, but does not enable it if enabled option is set to false.

**Returns**: `Layer` - returns the layer instace for chaining  
