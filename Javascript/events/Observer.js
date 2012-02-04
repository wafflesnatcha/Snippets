/**
 * Easier management for DOM events. The main purpose is to centralize the event
 * process by controlling all of its aspects through a single object.
 * @class Observer
 * @requires prototype.js
 */

var Observer = Class.create({

	/**
	 * @constructor
	 * @param {object} element
	 * @param {Event object} event
	 * @param {function} handler
	 * @param {boolean} useCapture
	 * @param {boolean} deferStart
	 * @returns void
	 */

	initialize: function(element, event, handler, useCapture, deferStart) {
		this.element = element;
		this.event = event;
		this.handler = handler();
		this.useCapture = useCapture || false;
		this.deferStart = deferStart || false;
		this.observing = false;

		if (!this.deferStart) this.resume();
	},

	/**
	 * Removes the event listener entirely
	 * @returns void
	 */
	
	stop: function() {
		if (!this.observing) return false;
		this.observing = false;
		this.element.stopObserving(this.event, this.handler, this.useCapture);
	},
	
	/**
	 * Adds or re-adds the event listener to the element
	 * @returns void
	 */
	
	resume: function() {
		this.observing = true;
		this.element.observe(this.event, this.handler, this.useCapture);
	}
});


/************
 Section: Prototype Element Addons	
 Adds methods to be accessed alongside Prototype's Element.Methods
 (<http://www.prototypejs.org/api/element/methods>)
 
 Namespace: Element
 
 Notes:
 
 The first parameter of every function is the explicitly the element itself
 
 It is passed automatically by referencing the element through Prototype's
 utility method *$()* hence the first passed parameter will actually be
 the defined as the 2nd parameter in the function definition.
 ************/

Element.addMethods({

	/************
	 Function: listen	
	 Creates a new observer object or objects for an element based on the 
	 provided parameters.
	 
	 Parameters:		
	 - *config* : array | object | string
	 
	 An obejct, array of objects, or the event string itself. This is very
	 flexible (almost too flexible) allowing you to choose whatever your
	 preference is to 
	 
	 Returns:	
	 - object | objects in hash
	 
	 A single Observer object, or a hash of observer objects indexed by the a
	 specified key
	 
	 Examples:
	 
	 (start code)
	 
	 var listener = $(someElement).listen('click', doSomething, true);
	 
	 // -> new Observer()
	 
	 
	 var listeners = $(someElement).listen({
	 
	 'click': dosomeshit,
	 
	 'keypress': function() {
	 document.write('do some more shit');
	 },
	 
	 'thisisnttheevent': {
	 event: 'click',
	 handler: dosomethincrazy,
	 useCapture: true		
	 }
	 
	 });
	 
	 // -> {click: _Observer_, keypress: _Observer_, thisisnttheevent: _Observer_}
	 
	 
	 var listeners = $(someElement).listen([{
	 event: 'click',
	 handler: dosomeshit,
	 useCapture: true
	 }, {
	 event: 'keypress',
	 handler: function() {
	 document.write('do some more shit');
	 }		
	 }]);
	 
	 // -> {click: _Observer_, keypress: _Observer_, thisisnttheevent: _Observer_}
	 
	 (end)
	 ************/

	listen: function(element, config, handler, useCapture, deferStart) {

		element = $(element);
		var listeners = {};

		if (Object.isArray(config)) {
			config.each(function(node) {
				listeners[node.event] = new Observer(element, node.event, node.handler, node.useCapture, node.deferStart);
			});

		}
		else if (Object.isString(config)) {
			listeners = new Observer(element, config, handler, useCapture, deferStart);
		}
		else {
			Object.keys(config).each(function(event) {
				var c = config[event];
				if (Object.isFunction(c)) listeners[event] = new Observer(element, event, config[event]);
				else {
					var e = c.event || event;
					listeners[event] = new Observer(element, e, c.handler, c.useCapture, c.deferStart);
				}
			})
		}

		return listeners;
	}
});
