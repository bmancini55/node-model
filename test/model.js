var mocha     = require('mocha')
  , chai      = require('chai')
  , BaseModel = require('../lib/model')
  , expect    = chai.expect;

describe('BaseModel', function() {

  describe('new instance creation', function() {

    it('should attach the schema', function() {
      /* jshint es5:false */
      /* jshint quotmark:false */
      var schema
        , sut
        ;

      schema = {
        "properties": []
      };
      sut = new BaseModel(schema);

      expect(sut.schema).to.be.a('object');
    });

    it('should create all properties in the schema', function() {
      /* jshint es5:false */
      /* jshint quotmark:false */
      var schema
        , sut
        ;

      schema = {
        "properties": [
          { "name": "first" },
          { "name": "second" }
        ]
      };
      sut = new BaseModel(schema);

      expect(sut.first).to.be.null;
      expect(sut.second).to.be.null;
    });

    it('should set property defaults', function() {
      /* jshint es5:false */
      /* jshint quotmark:false */
      var sut
        , schema
        ;

      schema = {
        "properties": [
          { "name": "first", "default": 1 },
          { "name": "second", "default": 2 }
        ]
      };
      sut = new BaseModel(schema);

      expect(sut.first).to.equal(1);
      expect(sut.second).to.equal(2);
    });

    it('should copy property values when supplied', function() {
      /* jshint es5:false */
      /* jshint quotmark: false */
      var schema
        , values
        , sut
        ;

      schema = {
        "properties": [
          { "name": "first" },
          { "name": "second" }
        ]
      };
      values = { 
        "first": "first",
        "second": "second"
      };
      sut = new BaseModel(schema, values);

      expect(sut.first).to.equal('first');
      expect(sut.second).to.equal('second');
    });

  });

  describe('#toClient', function() {
    /* jshint es5:false */
    /* jshint quotmark: false */
    var schema
      , values
      ;

    schema = {
      "properties": [
        { "name": "first" },
        { "name": "rename", "clientName": "renamed" },
        { "name": "noclient", "noClient": true}
      ]
    };
    values = {
      "first": "first",
      "rename": "rename",
      "noclient": "noclient"
    };


    it('should create a shallow copy', function() {
      var sut     = new BaseModel(schema, values)
        , result  = sut.toClient()
        ;

      expect(result).to.not.equal(sut);
    });

    it('should create public properties', function() {
      var sut     = new BaseModel(schema, values)
        , result  = sut.toClient()
        ;

      expect(result.first).to.equal('first');
    });

    it('should respect clientName prop configs', function() {
      var sut     = new BaseModel(schema, values)
        , result  = sut.toClient()
        ;

      expect(result.renamed).to.equal('rename');
    });

    it('should respect noClient prop configs', function() {
      var sut     = new BaseModel(schema, values)
        , result  = sut.toClient()
        ;
        
      expect(result.noclient).to.be.undefined;
    });

  });
});