(function(buster, require) {
  'use strict';

  var moreAssertions;

  // node
  if (!buster) {
    buster = require('buster');
    moreAssertions = require('../buster-more-assertions');
  } else {
    moreAssertions = require('buster-more-assertions');
  }
  var assert = buster.assert, refute = buster.refute;

  function arbitrary() {}
  function same(a, b) { return a === b; }

  var createContains = moreAssertions.createContains;
  buster.testCase('createContains', {
    'should return a function': function() {
      assert.isFunction(createContains(arbitrary));
    },

    'the created function': {
      'should call the comparator with the expected object and sequence elements': function() {
        var compare = this.spy();
        var contains = createContains(compare);

        contains(['a'], 'c');
        assert.calledWith(compare, 'c', 'a');
      },

      'should return true if the comparison function returns true for any element': function() {
        var contains = createContains(function(_, actual) { return actual === 5; });
        assert(contains([3, 5, 7]));
      },

      'should return false if the comparison function does not return true for any element': function() {
        var contains = createContains(function(_, actual) { return actual === 5; });
        refute(contains([2, 4, 6]));
      }
    }
  });

  var createContainsOnce = moreAssertions.createContainsOnce;
  buster.testCase('createContainsOnce', {
    'should return a function': function() {
      assert.isFunction(createContainsOnce(arbitrary));
    },

    'the created function': {
      'should call the comparator with the expected object and sequence elements': function() {
        var compare = this.spy();
        var containsOnce = createContainsOnce(compare);

        containsOnce(['a'], 'c');
        assert.calledWith(compare, 'c', 'a');
      },

      'should return true if the comparison function returns true for exactly one element': function() {
        function isOdd(_, actual) { return actual % 2; }
        var containsOnce = createContainsOnce(isOdd);

        assert(containsOnce([2, 3, 4, 6]));
      },

      'should return false if the comparison function never returns true': function() {
        var containsOnce = createContainsOnce(function(_, __) { return false; });

        refute(containsOnce(['ab', 'cd', 'ef'], 'gh'));
      },

      'should return false if the comparison returns true more than once': function() {
        var containsOnce = createContainsOnce(function(_, __) { return true; });

        refute(containsOnce(['ab', 'cd', 'ef']), 'ab');
      }
    }
  });

  var createContainsInOrder = moreAssertions.createContainsInOrder;
  buster.testCase('createContainsInOrder', {
    'should return a function': function() {
      assert.isFunction(createContainsInOrder(arbitrary));
    },

    'the created function': {
      'should call the comparator with the reference object and sequence elements': function() {
        var compare = this.spy();
        var containsInOrder = createContainsInOrder(compare);

        containsInOrder(['a'], 'c');
        assert.calledWith(compare, 'c', 'a');
      },

      'should return true if all reference objects are contained in the right order': function() {
        var containsInOrder = createContainsInOrder(same);

        assert(containsInOrder(['a', 'b', 'c', 'd', 'e'], 'b', 'd', 'e'));
      },

      'should return false if reference objects are not contained by the sequence': function() {
        var containsInOrder = createContainsInOrder(same);

        refute(containsInOrder(['a', 'b', 'd'], 'b', 'c'));
      },

      'should return false if reference objects are contained in a different order': function() {
        var containsInOrder = createContainsInOrder(same);

        refute(containsInOrder(['a', 'b', 'd', 'c'], 'b', 'c', 'd'));
      }
    }
  });

  var containsString = moreAssertions.containsString;
  buster.testCase('containsString', {
    'returns true if a string contains a substring': function() {
      assert(containsString('An arbitrary string', 'arbitrary'));
    },

    'returns false if a string does not contain a substring': function() {
      refute(containsString('An arbitrary string', 'not contained'));
    },

    'works with non-strings as haystack': function() {
      assert(containsString(Error('An error message'), 'error'));
    }
  });
})(this.buster, require);

