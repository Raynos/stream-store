var MemoryStore = require("memory-store")
    , through = require("through")

module.exports = StreamStore

function StreamStore(Stream) {
    var store = {}
    Stream = Stream || through

    return {
        get: get
        , set: set
        , delete: $delete
    }

    function get(name, callback) {
        var stream = store[name]

        if (!stream) {
            stream = store[name] = Stream()
        }

        return stream
    }

    function set(name, stream) {
        store[name] = stream
    }

    function $delete(name) {
        return delete store[name]
    }
}