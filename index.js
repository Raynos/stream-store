var MemoryStore = require("memory-store")
    , through = require("through")
    , globalContext = new Function('return this')()

module.exports = StreamStore

function StreamStore(Stream) {
    var store = {}
    Stream = Stream || through

    return {
        set: set
        , get: get
        , has: has
        , delete: $delete
        , keys: keys
        , values: values
        , iterate: iterate
        , toArray: toArray
    }

    function get(name) {
        var stream = store[name]

        if (!stream) {
            stream = store[name] = Stream()
        }

        return stream
    }

    function has(name) {
        return name in store
    }

    function keys() {
        return Object.keys(store)
    }

    function values() {
        return Object.keys(store).map(toValue, store)
    }

    function toArray() {
        return Object.keys(store).map(toKeyValue, store)
    }

    function iterate(callback, context) {
        var keys = Object.keys(store)
            , length = keys.length

        context = context || globalContext

        for (var i = 0; i < length; i++) {
            var key = keys[i]
                , value = store[key]

            callback.call(context, value, key, store)
        }
    }

    function set(name, stream) {
        store[name] = stream
    }

    function $delete(name) {
        return delete store[name]
    }
}

function toValue(key) {
    return this[key]
}

function toKeyValue(key) {
    return {
        key: key
        , value: this[key]
    }
}