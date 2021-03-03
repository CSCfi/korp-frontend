
// Class for a simple plugin facility
//
// Plugins are objects containing function properties which correspond
// to plugin callback functions for named hook points. A plugin can be
// either a simple object or an object created from a prototype. Each
// plugin must be registered with Plugins.register(plugin).
//
// Callback functions in a plugin object obj may be mapped to hook
// points in two ways:
// 1. If obj contains property "callbacks", its keys are regarded
//    hook point names and their values are the callback functions
//    in obj to be registered for the hook point. The values may
//    be either single functions (function references), lists of
//    them or strings (the name of the function property in obj).
// 2. If obj does not contain property "callbacks", all function
//    properties whose names do not begin or end with an
//    underscore in obj and its direct prototype are added as
//    callbacks, taking the function name as the name of the hook
//    point.
//
// Callback functions for a hook point are called via
// Plugins.callActions (for functions not returning a value or whose
// return value is discarded) or Plugins.callFilters (functions
// returning a value); see the descriptions of these functions below
// for more information.

const Plugins = class Plugins {

    constructor () {
        // Plugin callback function object: each property corresponds to a
        // hook point (a type of plugin function) and its value is an
        // array of functions to be called at the hook point.
        this.callbacks = {}
    }

    // Add (append) callback function func in object obj to hook point
    // hookPoint.
    addCallback (hookPoint, func, obj) {
        if (! (hookPoint in this.callbacks)) {
            this.callbacks[hookPoint] = []
        }
        this.callbacks[hookPoint].push(func.bind(obj))
    }

    // Register a plugin object obj containing function properties
    // which correspond to plugin callback functions and are added to
    // this.callbacks, each to the array of the property with the name
    // of the hook point.
    register (obj) {

        // Return the names of methods in obj and its direct
        // prototype. Modified from
        // https://flaviocopes.com/how-to-list-object-methods-javascript/
        // to ignore methods further up the prototype chain.
        const getMethods = (obj) => {
            let properties = new Set()
            for (let obj2 of [obj, Object.getPrototypeOf(obj)]) {
                Object.getOwnPropertyNames(obj2)
                    .map(item => properties.add(item));
            }
            return [...properties.keys()].filter(
                item => typeof obj[item] === 'function')
        }

        c.log("Plugins.register", obj)
        if (obj.callbacks) {
            for (let propname of Object.getOwnPropertyNames(obj.callbacks)) {
                let callbacks = obj.callbacks[propname]
                if (! _.isArray(callbacks)) {
                    callbacks = [callbacks]
                }
                for (let callback of callbacks) {
                    if (_.isString(callback)) {
                        callback = obj[callback]
                    }
                    this.addCallback(propname, callback, obj)
                }
            }
        } else {
            for (let propname of getMethods(obj)) {
                c.log(propname, obj[propname], _.isFunction(obj[propname]))
                if (propname != "constructor" && ! propname.startsWith("_")
                        && ! propname.endsWith("_")
                        && _.isFunction(obj[propname])) {
                    this.addCallback(propname, obj[propname], obj)
                }
            }
        }
        // c.log("pluginFunctions", this.callbacks)
    }

    // Call plugin callback functions (actions) registered for
    // hookPoint in the order they are in listed this.callbacks, with
    // the (optional) arguments args... The possible return value of
    // the functions is ignored.
    callActions (hookPoint, ...args) {
        for (let func of this.callbacks[hookPoint] || []) {
            // Would this be needed?
            // func(...Array.from(args || []))
            func(...args)
        }
    }

    // Call plugin callback functions (filters) registered for
    // hookPoint in the order they are in listed this.callbacks, with
    // the argument arg1 and optional rest... Each callback function
    // gets as its arg1 the return value of the previous function, and
    // this function returns the value returned by the last callback
    // function.
    callFilters (hookPoint, arg1, ...rest) {
        // c.log("callFilters", hookPoint, arg1, ...rest)
        for (let func of this.callbacks[hookPoint] || []) {
            // arg1 = func(arg1, ...Array.from(rest));
            arg1 = func(arg1, ...rest)
        }
        return arg1
    }

}

// Create a global Plugins instance to which all plugins should be
// registered.
window.plugins = new Plugins()
