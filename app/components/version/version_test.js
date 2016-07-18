'use strict';

describe('transitApp.version module', function() {
  beforeEach(module('transitApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
