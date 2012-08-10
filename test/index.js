var test = require("testling")
    , StreamStore = require("..")
    , store = StreamStore()

test("stream store can get", function (t) {
    var stream = store.get("foo")
    t.ok(stream.write && stream.end, "stream is not stream")
    t.end()
})

test("stream store can set", function (t) {
    var bar = {}
    store.set("foo", bar)
    var stream = store.get("foo")
    t.equal(bar, stream)
    t.end()
})

test("stream store can have constructor", function (t) {
    var store = StreamStore(function () {
        return 42
    })

    var stream = store.get("foo")
    t.equal(42, stream)
    t.end()
})