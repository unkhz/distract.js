#Index

**Modules**

* [Distract](#module_Distract)
  * [class: Distract~ParticleOptions](#module_Distract..ParticleOptions)
    * [new Distract~ParticleOptions(opts)](#new_module_Distract..ParticleOptions)
    * [particleOptions.text](#module_Distract..ParticleOptions#text)
    * [particleOptions.className](#module_Distract..ParticleOptions#className)
    * [particleOptions.iterationSpeed](#module_Distract..ParticleOptions#iterationSpeed)
    * [particleOptions.respawn](#module_Distract..ParticleOptions#respawn)
    * [particleOptions.iterationRules](#module_Distract..ParticleOptions#iterationRules)
    * [particleOptions.parseIterationRule(rule, state, opts, particle)](#module_Distract..ParticleOptions#parseIterationRule)
    * [particleOptions.initState(id, opts)](#module_Distract..ParticleOptions#initState)
    * [particleOptions.iterateState(particle, state, opts)](#module_Distract..ParticleOptions#iterateState)
  * [class: Distract~Particle](#module_Distract..Particle)
    * [new Distract~Particle(props)](#new_module_Distract..Particle)
    * [particle.animate()](#module_Distract..Particle#animate)
    * [particle.destroy()](#module_Distract..Particle#destroy)
    * [particle.render()](#module_Distract..Particle#render)
  * [class: Distract~LayerOptions](#module_Distract..LayerOptions)
    * [new Distract~LayerOptions(opts)](#new_module_Distract..LayerOptions)
    * [layerOptions.enabled](#module_Distract..LayerOptions#enabled)
    * [layerOptions.el](#module_Distract..LayerOptions#el)
    * [layerOptions.particleCount](#module_Distract..LayerOptions#particleCount)
    * [layerOptions.particleEl()](#module_Distract..LayerOptions#particleEl)
  * [class: Distract~Layer](#module_Distract..Layer)
    * [new Distract~Layer(layerOpts, particleOpts)](#new_module_Distract..Layer)
    * [layer.configure(layerOpts, particleOpts)](#module_Distract..Layer#configure)
    * [layer.pause()](#module_Distract..Layer#pause)
    * [layer.animate()](#module_Distract..Layer#animate)

**Typedefs**

* [type: SimpleIterationRule](#SimpleIterationRule)
 
<a name="module_Distract"></a>
#Distract
**Members**

* [Distract](#module_Distract)
  * [class: Distract~ParticleOptions](#module_Distract..ParticleOptions)
    * [new Distract~ParticleOptions(opts)](#new_module_Distract..ParticleOptions)
    * [particleOptions.text](#module_Distract..ParticleOptions#text)
    * [particleOptions.className](#module_Distract..ParticleOptions#className)
    * [particleOptions.iterationSpeed](#module_Distract..ParticleOptions#iterationSpeed)
    * [particleOptions.respawn](#module_Distract..ParticleOptions#respawn)
    * [particleOptions.iterationRules](#module_Distract..ParticleOptions#iterationRules)
    * [particleOptions.parseIterationRule(rule, state, opts, particle)](#module_Distract..ParticleOptions#parseIterationRule)
    * [particleOptions.initState(id, opts)](#module_Distract..ParticleOptions#initState)
    * [particleOptions.iterateState(particle, state, opts)](#module_Distract..ParticleOptions#iterateState)
  * [class: Distract~Particle](#module_Distract..Particle)
    * [new Distract~Particle(props)](#new_module_Distract..Particle)
    * [particle.animate()](#module_Distract..Particle#animate)
    * [particle.destroy()](#module_Distract..Particle#destroy)
    * [particle.render()](#module_Distract..Particle#render)
  * [class: Distract~LayerOptions](#module_Distract..LayerOptions)
    * [new Distract~LayerOptions(opts)](#new_module_Distract..LayerOptions)
    * [layerOptions.enabled](#module_Distract..LayerOptions#enabled)
    * [layerOptions.el](#module_Distract..LayerOptions#el)
    * [layerOptions.particleCount](#module_Distract..LayerOptions#particleCount)
    * [layerOptions.particleEl()](#module_Distract..LayerOptions#particleEl)
  * [class: Distract~Layer](#module_Distract..Layer)
    * [new Distract~Layer(layerOpts, particleOpts)](#new_module_Distract..Layer)
    * [layer.configure(layerOpts, particleOpts)](#module_Distract..Layer#configure)
    * [layer.pause()](#module_Distract..Layer#pause)
    * [layer.animate()](#module_Distract..Layer#animate)

<a name="module_Distract..ParticleOptions"></a>
##class: Distract~ParticleOptions
Particle options (Strategy) defines the behavior of a Particle instance

**Members**

* [class: Distract~ParticleOptions](#module_Distract..ParticleOptions)
  * [new Distract~ParticleOptions(opts)](#new_module_Distract..ParticleOptions)
  * [particleOptions.text](#module_Distract..ParticleOptions#text)
  * [particleOptions.className](#module_Distract..ParticleOptions#className)
  * [particleOptions.iterationSpeed](#module_Distract..ParticleOptions#iterationSpeed)
  * [particleOptions.respawn](#module_Distract..ParticleOptions#respawn)
  * [particleOptions.iterationRules](#module_Distract..ParticleOptions#iterationRules)
  * [particleOptions.parseIterationRule(rule, state, opts, particle)](#module_Distract..ParticleOptions#parseIterationRule)
  * [particleOptions.initState(id, opts)](#module_Distract..ParticleOptions#initState)
  * [particleOptions.iterateState(particle, state, opts)](#module_Distract..ParticleOptions#iterateState)

<a name="new_module_Distract..ParticleOptions"></a>
###new Distract~ParticleOptions(opts)
**Params**

- opts `Object` - Plain object containing the data to be extended into the ParticleOptions instance  

**Scope**: inner class of [Distract](#module_Distract)  
<a name="module_Distract..ParticleOptions#text"></a>
###particleOptions.text
Contents of the particle element

**Type**: `String`  
<a name="module_Distract..ParticleOptions#className"></a>
###particleOptions.className
CSS class of the particle element

**Type**: `String`  
<a name="module_Distract..ParticleOptions#iterationSpeed"></a>
###particleOptions.iterationSpeed
A multiplier defining the speed of the iteration. If the value is 1 or larger,
the particle state will be iterated on every animation step. Values smaller than 0
will cause the particle state to be static.

**Type**: `Number`  
<a name="module_Distract..ParticleOptions#respawn"></a>
###particleOptions.respawn
If true, the Layer will create a new particle instance in each animation step and
start destroying oldest existing one when the particle limit has been reached.

**Type**: `Boolean`  
<a name="module_Distract..ParticleOptions#iterationRules"></a>
###particleOptions.iterationRules
A list of the iteration rules to be used for determining the new visual state
of the particle. The default ParticleOptions behavior is to go through all
rules on every iteration. I is also expected that the iteration rules are of
SimpleIterationRule type.

**Type**: `Array`  
<a name="module_Distract..ParticleOptions#parseIterationRule"></a>
###particleOptions.parseIterationRule(rule, state, opts, particle)
Parses a single rule in the iterationRules collection. Defaults to parsing
according to SimpleIterationRule definition. The rule properties can be
defined as a function or a scalar value.

You can change the behavior by defining your own iteration rules and overriding
this method to parse them according to the desired behavior.

**Params**

- rule <code>[SimpleIterationRule](#SimpleIterationRule)</code> - The rule instance to be parsed  
- state `Object` - The current visual state of the Particle  
- opts `ParticleOptions` - The ParticleOptions instance of the Particle  
- particle `Particle` - The Particle instance  

<a name="module_Distract..ParticleOptions#initState"></a>
###particleOptions.initState(id, opts)
The initial state of the particle. Can be either a function or a plain object.

**Params**

- id `Number` - The numeric ID of the particle instance  
- opts `ParticleOptions` - The ParticleOptions instance  

<a name="module_Distract..ParticleOptions#iterateState"></a>
###particleOptions.iterateState(particle, state, opts)
This method is called by the Particle every time when a new animation step is
taken. It is expected to modify the visual state of the Particle and return it as a
plain object. Default behavior is to call the parse method of a rule or the generic
parseIterationRule method if a rule specific parse method does not exist.

**Params**

- particle `Particle` - The Particle instance  
- state `Object` - A model object representing the current visual state of the Particle  
- opts `ParticleOptions` - The ParticleOptions instance  

**Returns**: `Object` - The modified version of the model object representing the current visual state of the Particle  
<a name="module_Distract..Particle"></a>
##class: Distract~Particle
**Members**

* [class: Distract~Particle](#module_Distract..Particle)
  * [new Distract~Particle(props)](#new_module_Distract..Particle)
  * [particle.animate()](#module_Distract..Particle#animate)
  * [particle.destroy()](#module_Distract..Particle#destroy)
  * [particle.render()](#module_Distract..Particle#render)

<a name="new_module_Distract..Particle"></a>
###new Distract~Particle(props)
Particle (Presenter) controls a single DOM element (View) and it's state (Model)

**Params**

- props `Object` - Configuration properties to be extended to the particle instance  
  - id `Number` - Numeric ID of the Particle,  
  - el `Element` - DOM element representing the Particle  
  - layer `Layer` - The parent Layer of the Particle  
  - opts `ParticleOptions` - The options object that defines the configuration for the Particle  

**Scope**: inner class of [Distract](#module_Distract)  
<a name="module_Distract..Particle#animate"></a>
###particle.animate()
Start animating the Particle instance

<a name="module_Distract..Particle#destroy"></a>
###particle.destroy()
Start destroying the Particle instance

<a name="module_Distract..Particle#render"></a>
###particle.render()
Iterate and apply the visual state of the Particle to the related DOM element

<a name="module_Distract..LayerOptions"></a>
##class: Distract~LayerOptions
**Members**

* [class: Distract~LayerOptions](#module_Distract..LayerOptions)
  * [new Distract~LayerOptions(opts)](#new_module_Distract..LayerOptions)
  * [layerOptions.enabled](#module_Distract..LayerOptions#enabled)
  * [layerOptions.el](#module_Distract..LayerOptions#el)
  * [layerOptions.particleCount](#module_Distract..LayerOptions#particleCount)
  * [layerOptions.particleEl()](#module_Distract..LayerOptions#particleEl)

<a name="new_module_Distract..LayerOptions"></a>
###new Distract~LayerOptions(opts)
Layer options define the configuration of a Layer instance

**Params**

- opts `Object` - Object containing the data to be extended to the LayerOptions instance  

**Scope**: inner class of [Distract](#module_Distract)  
<a name="module_Distract..LayerOptions#enabled"></a>
###layerOptions.enabled
Do we show the layer? If enabled is set to false during runtime, the layer will self destruct.

**Type**: `Boolean`  
<a name="module_Distract..LayerOptions#el"></a>
###layerOptions.el
The DOM element representing the Layer

**Type**: `Element`  
<a name="module_Distract..LayerOptions#particleCount"></a>
###layerOptions.particleCount
Target count of the particle elements. Total count may be bigger if particle respawning is
enabled.

**Type**: `Number`  
<a name="module_Distract..LayerOptions#particleEl"></a>
###layerOptions.particleEl()
Should return a new element for a child Particle instance of the Layer

**Type**: `function`  
<a name="module_Distract..Layer"></a>
##class: Distract~Layer
**Members**

* [class: Distract~Layer](#module_Distract..Layer)
  * [new Distract~Layer(layerOpts, particleOpts)](#new_module_Distract..Layer)
  * [layer.configure(layerOpts, particleOpts)](#module_Distract..Layer#configure)
  * [layer.pause()](#module_Distract..Layer#pause)
  * [layer.animate()](#module_Distract..Layer#animate)

<a name="new_module_Distract..Layer"></a>
###new Distract~Layer(layerOpts, particleOpts)
Layer is a container and controller of [Particles](Particle).

**Params**

- layerOpts `LayerOptions` - Options object that defines the configuration of the Layer  
- particleOpts `ParticleOptions` - Options object that defines the configuration of the Particles inside this Layer  

**Scope**: inner class of [Distract](#module_Distract)  
<a name="module_Distract..Layer#configure"></a>
###layer.configure(layerOpts, particleOpts)
Configure the Layer instance

**Params**

- layerOpts `LayerOptions` - Options object that defines the configuration of the Layer  
- particleOpts `ParticleOptions` - Options object that defines the configuration of the Particles inside this Layer  

<a name="module_Distract..Layer#pause"></a>
###layer.pause()
Stop animating the Layer without destroying its state

<a name="module_Distract..Layer#animate"></a>
###layer.animate()
Start animating the Layer

<a name="SimpleIterationRule"></a>
#type: SimpleIterationRule
Default ParticleOptions iteration uses this simple iteration rule to
modify a single style property (or property function) of the
DOM element representing the Particle.

**Properties**

- property `function` - The style property to be manipulated  
- propertyFunction `function` - The possible property function of the style property E.g a specific CSS transform function  
- inc `Number` - The numeric increment to be added to the value of the style property / function  
- speed `function` - The multiplier which defines the speed of the animation  
- max `function` - The maximum value to which the set value should be constrained to  
- min `function` - The minimum value to which the set value should be constrained to  
- parse `function` - If defined, this method will be called to parse the rule instead of the generic ParticleOptions.parseIterationRule method  

