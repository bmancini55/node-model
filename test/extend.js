var mocha         = require('mocha')
  , chai          = require('chai')
  , extend        = require('../lib/extend')
  , expect        = chai.expect
  ;


function fixture(fileName) {
  return __dirname + '/fixtures/' + fileName;
}



  describe('#extend', function() {

  describe('when called without options', function() {
    it('should use the schema named the same as the caller file', function() {
      require('./fixtures/simple.js');
    });
  });

  describe('when called with a schema file', function() {
    it('should use the supplied schema file', function() {
      extend(fixture('simple.json'));
    });
  });

  describe('when extended', function() {

    it('the Type should be isolated from other extended types', function() {
      var A = extend(fixture('simple.js'))
        , B = extend(fixture('simple.js'))
        , a
        , b
        ;

      A.prototype.derp = function() { 
        return 'a';
      };
      A.prototype.turkey = function() {
        return 'turkey';
      };
      B.prototype.derp = function() {
        return 'b';
      };

      a = new A();
      b = new B();

      expect(a.derp()).to.equal('a');
      expect(b.derp()).to.equal('b');
      expect(b.turkey).to.be.undefined;
    });

  });
});