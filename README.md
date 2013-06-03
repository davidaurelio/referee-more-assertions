buster-more-assertions
======================

Additional assertions for buster.js:

- `assert.containsOnce(array, element)` passes if `array` contains `element`
  exactly once.

- `assert.containsInOrder(array, a, b, c, ...)` passes if array contains all
  listed values in that order.

- `assert.containsMatch(array, matcher)` passes if any element in `array`
  matches `matcher`. Check the [documentation of `assert.match`][match] to understand
  how buster matches.

- `assert.containsMatchOnce(array, matcher)` passes if exactly one element in
  `array` matches `matcher`.

- `assert.containsMatchesInOrder(array, matcherA, matcherB, ...)` passes if
  elements matching the passed-in matchers appear in the order of appearance.

[match]: http://docs.busterjs.org/en/latest/modules/buster-assertions/#match

