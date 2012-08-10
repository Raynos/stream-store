# stream-store [![build status][1]][2]

Storage API for streams

## Example

    var StreamStore = require("stream-store")
        , store = StreamStore()

    var stream = store.get("name") // a named stream!

    store.set("name", stream) // stream was set

## Example with custom stream generators

    var StreamStore = require("stream-store")
        , through = require("through")
        , store = StreamStore(create)

    store.get("name") // stream created using create function!

    function create() {
        return through()
    }

## Installation

`npm install stream-store`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/stream-store.png
  [2]: http://travis-ci.org/Raynos/stream-store