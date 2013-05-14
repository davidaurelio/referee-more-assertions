(function(define, buster) {
  'use strict';

  // node
  if (!buster) { buster = require('buster'); }

  function factory(exports) {
    if (!exports) { exports = {}; }
    var assertions = buster.assertions;

    function slice(sequence, from) {
      return Array.prototype.slice.call(sequence, from || 0);
    }

    function indexOf(sequence, needle, from) {
      return Array.prototype.indexOf.call(sequence, needle, from || 0);
    }

    var containsOnce = exports.containsOnce = function(haystack, needle) {
      var index = indexOf(haystack, needle);
      return index !== -1 && indexOf(haystack, needle, index + 1) === -1;
    };
    assertions.add('containsOnce', {
      assert: containsOnce,
      expectation: 'toContainOnce',
      assertMessage: 'Expected ${0} to contain ${1} once',
      refuteMessage: 'Expected ${0} not to contain ${1} exactly once',
      values: function(haystack, needle) {
        return [slice(haystack), needle];
      }
    });

    var containsInOrder = exports.containsInOrder = function(haystack, needle) {
      for (var i = 1, n = arguments.length, index, lastIndex = -1; i < n; i++) {
        index = indexOf(haystack, arguments[i]);
        if (index <= lastIndex) { return false; }
        lastIndex = index;
      }
      return true;
    };
    assertions.add('containsInOrder', {
      assert: containsInOrder,
      expectation: 'toContainInOrder',
      assertMessage: 'Expected ${0} to contain ${1} in order',
      refuteMessage: 'Expected ${0} not to contain ${1} in order',
      values: function(sequence) {
        return [slice(sequence), slice(arguments, 1)];
      }
    });

    // containsMatch
    // containsMatchOnce
    // containsMatchesInOrder
  }

  // create module
  (define && define.amd ? define :
    function(id, deps, f) { f(typeof exports !== 'undefined' ? exports : 0) }
  )('buster-more-assertions', ['exports'], factory);
}(this.define, this.buster));
