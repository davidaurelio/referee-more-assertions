(function(define, buster) {
  'use strict';

  // node
  if (!buster) { buster = require('buster'); }

  function factory(exports) {
    if (!exports) { exports = {}; }

    var partial = buster.partial;

    // export factories for testing and reuse
    exports.createContains = createContains;
    exports.createContainsOnce = createContainsOnce;
    exports.createContainsInOrder = createContainsInOrder;

    function createContains(compare) {
      return function(sequence, reference) {
        return find(sequence, partial(compare, reference)) !== -1;
      };
    }

    function createContainsOnce(compare) {
      return function(sequence, reference) {
        var compare_ = partial(compare, reference);
        var first = find(sequence, compare_);
        return first !== -1 && find(sequence, compare_, first + 1) === -1;
      };
    }

    function createContainsInOrder(compare) {
      return function(sequence, reference) {
        var last = -1;
        for (var i = 1, n = arguments.length; i < n; i += 1) {
          var foundAt = find(sequence, partial(compare, arguments[i]));
          if (foundAt <= last) {
            return false;
          }
          last = foundAt;
        }
        return true;
      };
    }

    function find(sequence, compare, start) {
      for (var i = start || 0, n = sequence.length; i < n; i += 1) {
        if (compare(sequence[i])) { return i; }
      }
      return -1;
    }

    function same(a, b) { return a === b; }
    function slice(sequence, from) {
      return Array.prototype.slice.call(sequence, from || 0);
    }
    function flip(fn) {
      return function(a, b) { return fn(b, a); }
    }
    var assertions = buster.assertions;
    var match = flip(assertions.match);
    var deepEqual = flip(assertions.deepEqual);

    assertions.add('containsOnce', {
      assert: createContainsOnce(same),
      expectation: 'toContainOnce',
      assertMessage: 'Expected ${0} to contain ${1} once',
      refuteMessage: 'Expected ${0} not to contain ${1} exactly once',
      values: function(haystack, needle) {
        return [slice(haystack), needle];
      }
    });

    assertions.add('containsInOrder', {
      assert: createContainsInOrder(same),
      expectation: 'toContainInOrder',
      assertMessage: 'Expected ${0} to contain ${1} in order',
      refuteMessage: 'Expected ${0} not to contain ${1} in order',
      values: function(sequence) {
        return [slice(sequence), slice(arguments, 1)];
      }
    });

    assertions.add('containsMatch', {
      assert: createContains(match),
      expectation: 'toContainMatch',
      assertMessage: 'Expected ${0} to contain match for ${1}',
      refuteMessage: 'Expected ${0} not to contain match for ${1}',
      values: function(sequence, matcher) {
        return [slice(sequence), matcher];
      }
    });

    assertions.add('containsMatchOnce', {
      assert: createContainsOnce(match),
      expectation: 'toContainMatchOnce',
      assertMessage: 'Expected ${0} to contain match for ${1} once',
      refuteMessage: 'Expected ${0} not to contain a match for ${1} exactly once',
      values: function(haystack, matcher) {
        return [slice(haystack), matcher];
      }
    });

    assertions.add('containsMatchesInOrder', {
      assert: createContainsInOrder(match),
      expectation: 'toContainMatchesInOrder',
      assertMessage: 'Expected ${0} to contain matches for ${1} in order',
      refuteMessage: 'Expected ${0} not to contain matches for ${1} in order',
      values: function(sequence) {
        return [slice(sequence), slice(arguments, 1)];
      }
    });

    assertions.add('containsEqual', {
      assert: createContains(deepEqual),
      expectation: 'toContainEqual',
      assertMessage: 'Expected ${0} to contain an element equal to ${1}',
      refuteMessage: 'Expected ${0} not to contain an element equal to ${1}',
      values: function(haystack, needle) {
        return [slice(haystack), needle];
      }
    });

    assertions.add('containsEqualOnce', {
      assert: createContainsOnce(deepEqual),
      expectation: 'toContainEqualOnce',
      assertMessage: 'Expected ${0} to contain exactly one element equal to ${1}',
      refuteMessage: 'Expected ${0} not to contain exactly one element equal to ${1}',
      values: function(haystack, needle) {
        return [slice(haystack), needle];
      }
    });

    assertions.add('containsEqualsInOrder', {
      assert: createContainsInOrder(deepEqual),
      expectation: 'toContainEqualsInOrder',
      assertMessage: 'Expected ${0} to contain equal elements to ${1} in order',
      refuteMessage: 'Expected ${0} not to contain equal elements to ${1} in order',
      values: function(sequence) {
        return [slice(sequence), slice(arguments, 1)];
      }
    });

    return exports;
  }

  // create module
  (define && define.amd ? define :
    function(id, deps, f) { f(typeof exports !== 'undefined' ? exports : 1) }
  )('buster-more-assertions', ['exports'], factory);
}(this.define, this.buster));
