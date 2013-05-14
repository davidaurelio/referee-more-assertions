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

  var containsOnce = moreAssertions.containsOnce;
  var containsInOrder = moreAssertions.containsInOrder;

  function toArrayLike() { return arguments; }

  buster.testCase('containsOnce', {
    'with arrays': containsOnceTest(Array),
    'with array-like objects': containsOnceTest(toArrayLike)
  });

  buster.testCase('containsInOrder', {
    'with arrays': containsInOrderTest(Array),
    'with array-like objects': containsInOrderTest(toArrayLike)
  });

  function containsOnceTest(array) {
    return {
      'should allow sequences containing only the needle': function() {
        assert(containsOnce(array('foo'), 'foo'));
      },
      'should allow longer sequences containing the needle': function() {
        assert(containsOnce(array('abc', 'def', 'ghi'), 'def'));
      },
      'should refute empty sequences': function() {
        refute(containsOnce(array(), 'arbitrary'));
      },
      'should refute sequences not containing the needle': function() {
        refute(containsOnce(array('foo', 'bar', 'baz'), 'other'));
      },
      'should refute sequences containing the needle more than once': function() {
        refute(containsOnce(array('foo', 'bar', 'bar', 'baz'), 'bar'));
      }
    };
  }

  function containsInOrderTest(array) {
    return {
      'should allow sequences containing only two elements in search order': function() {
        assert(containsInOrder(array('a', 'b'), 'a', 'b'));
      },
      'should allow sequences containing four needles in search order with elements between them': function() {
        var a = 'a', b = 'b', c = 'c', d = 'd';
        var haystack = array('arbitrary', a, 'arbitrary', b, 'arbitrary', c, 'arbitrary', d, 'arbitrary');
        assert(containsInOrder(haystack, a, b, c, d));
      },
      'should refute sequences not containing the first needle': function() {
        refute(containsInOrder(array(), 'arbitrary'));
      },
      'should refute sequences containing the first, but not the second needle': function() {
        refute(containsInOrder(array('a'), 'a', 'b'));
      },
      'should refute sequences containing the first needle after the second needle': function() {
        refute(containsInOrder(array('second', 'first'), 'first', 'second'));
      },
      'should refute sequences containing the fourth needle before the first': function() {
        var a = 'a', b = 'b', c = 'c', d = 'd';
        var haystack = array('arbitrary', d, a, 'arbitrary', b, c);
        refute(containsInOrder(haystack, a, b, c, d));
      }
    }
  }

})(this.buster, require);

