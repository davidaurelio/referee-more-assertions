var moreAssertions = require('../referee-more-assertions')(referee);

describe('“contain” assertions:', function() {
  describe('containsOnce:', function() {
    it('passes if an element is contained once in a sequence', function() {
      refute.exception(function() {
        assert.containsOnce([1, 2, 3], 2);
      });
    });

    it('does not pass if an element is not contained in a sequence', function() {
      refute.exception(function() {
        refute.containsOnce([], 2);
      });
    });

    it('does not pass if an element is contained more than once in a sequence', function() {
      refute.exception(function() {
        refute.containsOnce([1, 2, 3, 2, 4], 2);
      });
    });
  });
});
