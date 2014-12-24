var mocha         = require('mocha')
  , chai          = require('chai')
  , Model         = require('../lib/model')
  , expect        = chai.expect
  ;


function fixture(fileName) {
  return __dirname + '/fixtures/' + fileName;
}

describe('Model', function() {

  describe('when #extend is called without options', function() {

    it('should use the schema named the same as the caller file', function() {
      require('./fixtures/simple.js');
    });

  });

  describe('when #extend is called with a schema file', function() {

    it('should use the supplied schema file', function() {
      Model.extend(fixture('simple.json'));
    });

  });

  describe('when extended', function() {

    it('the Type should be isolated from other extended types', function() {
      var A = Model.extend(fixture('simple.js'))
        , B = Model.extend(fixture('simple.js'))
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

  
    describe('when a new model instance is created', function() {

      it('should have a schema method', function() {
        var NewModel  = Model.extend(fixture('simple.js'))
          , sut       = new NewModel()
          ;
        expect(sut.schema).to.be.a('function');
      });

      it('should create all properties in the schema', function() {
        var NewModel  = Model.extend(fixture('properties.json'))
          , sut       = new NewModel()
          ;
        expect(sut.first).to.be.null;
        expect(sut.second).to.be.null;
      });

      it('should set property defaults', function() {
        var NewModel  = Model.extend(fixture('default.json'))
          , sut       = new NewModel()
          ;
        expect(sut.first).to.equal(1);
        expect(sut.second).to.equal(2);
      });

      it('should copy property values when supplied', function() {
        var NewModel  = Model.extend(fixture('copyargs.json'))
          , sut       = new NewModel({ first: 'first', second: 'second' })
          ;
        expect(sut.first).to.equal('first');
        expect(sut.second).to.equal('second');
      });

    });

  });
  
});