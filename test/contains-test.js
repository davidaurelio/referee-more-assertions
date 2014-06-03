var moreAssertions = require('../referee-more-assertions');

function arbitrary() {}
function same(a, b) { return a === b; }

describe('`createContains`:', function() {
  var createContains = moreAssertions.createContains;

  it('should return a function', function() {
    assert.isFunction(createContains(arbitrary));
  });

  describe('the created function:', function() {
    it('should call the comparator with the expected object and sequence elements', function() {
      var compare = sinon.spy();
      var contains = createContains(compare);

      contains(['a'], 'c');
      assert.calledWith(compare, 'c', 'a');
    });

    it('should return true if the comparison function returns true for any element', function() {
      var contains = createContains(function(_, actual) { return actual === 5; });
      assert(contains([3, 5, 7]));
    });

    it('should return false if the comparison function does not return true for any element', function() {
      var contains = createContains(function(_, actual) { return actual === 5; });
      refute(contains([2, 4, 6]));
    });
  });
});

describe('`createContainsOnce`:', function() {
  var createContainsOnce = moreAssertions.createContainsOnce;

  it('should return a function', function() {
    assert.isFunction(createContainsOnce(arbitrary));
  });

  describe('the created function:', function() {
    it('should call the comparator with the expected object and sequence elements', function() {
      var compare = sinon.spy();
      var containsOnce = createContainsOnce(compare);

      containsOnce(['a'], 'c');
      assert.calledWith(compare, 'c', 'a');
    });

    it('should return true if the comparison function returns true for exactly one element', function() {
      function isOdd(_, actual) { return actual % 2; }
      var containsOnce = createContainsOnce(isOdd);

      assert(containsOnce([2, 3, 4, 6]));
    });

    it('should return false if the comparison function never returns true', function() {
      var containsOnce = createContainsOnce(function(_, __) { return false; });

      refute(containsOnce(['ab', 'cd', 'ef'], 'gh'));
    });

    it('should return false if the comparison returns true more than once', function() {
      var containsOnce = createContainsOnce(function(_, __) { return true; });

      refute(containsOnce(['ab', 'cd', 'ef']), 'ab');
    });
  });
});

describe('createContainsInOrder:', function() {
  var createContainsInOrder = moreAssertions.createContainsInOrder;

  it('should return a function', function() {
    assert.isFunction(createContainsInOrder(arbitrary));
  });

  describe('the created function:', function() {
    it('should call the comparator with the reference object and sequence elements', function() {
      var compare = sinon.spy();
      var containsInOrder = createContainsInOrder(compare);

      containsInOrder(['a'], 'c');
      assert.calledWith(compare, 'c', 'a');
    });

    it('should return true if all reference objects are contained in the right order', function() {
      var containsInOrder = createContainsInOrder(same);

      assert(containsInOrder(['a', 'b', 'c', 'd', 'e'], 'b', 'd', 'e'));
    });

    it('should return false if reference objects are not contained by the sequence', function() {
      var containsInOrder = createContainsInOrder(same);

      refute(containsInOrder(['a', 'b', 'd'], 'b', 'c'));
    });

    it('should return false if reference objects are contained in a different order', function() {
      var containsInOrder = createContainsInOrder(same);

      refute(containsInOrder(['a', 'b', 'd', 'c'], 'b', 'c', 'd'));
    });
  });
});

describe('containsString:', function() {
  var containsString = moreAssertions.containsString;

  it('returns false if a string does not contain a substring', function() {
    refute(containsString('An arbitrary string', 'not contained'));
  });

  it('works with non-strings as haystack', function() {
    assert(containsString(Error('An error message'), 'error'));
  });
});
