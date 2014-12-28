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

  describe('when called with an object', function() {
    it('should use the object for the schema', function() {
      var schema
        , result
        ;
      /* jshint es5:false */
      /* jshint quotmark: false */
      schema = {
        "properties": [
          { "name": "first"},
          { "name": "second" }
        ]
      };
      result = extend(schema);
      expect(result).to.be.a('function');
    });
  });

  describe('when extended', function() {

    it('the Type should be isolated from other extended types', function() {
      var A = extend(fixture('simple.json'))
        , B = extend(fixture('simple.json'))
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