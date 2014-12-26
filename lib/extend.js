var path        = require('path')
  , util        = require('util')
  , _           = require('underscore')
  , Q           = require('q')  
  , callerPath  = require('caller-path')
  , superprop   = require('super-prop')
  , Model       = require('./model')
  ;


module.exports = function extend(schemaPathOverride) {
  var schemaPath  = schemaPathOverride || callerPath()
    , ext         = path.extname(schemaPath)
    , jsonPath    = schemaPath.substring(0, schemaPath.length - ext.length) + '.json'
    , json        = require(jsonPath)
    ;

  function NewModel(args) {
    superprop.define(this, Model);
    this.super(json, args);
  }
  util.inherits(NewModel, Model);

  return NewModel;
};