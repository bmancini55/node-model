var path        = require('path')
  , util        = require('util')
  , _           = require('underscore')
  , Q           = require('q')  
  , callerPath  = require('caller-path')
  , superprop   = require('super-prop')
  , Model       = require('./model')
  ;


/**
 * Extends the BaseModel and provides a new Type constructor. This will
 * attach the schema object to the new Type either as an object, a 
 * path to a schema file, or will look up the existing schema file 
 * based on file name
 * 
 * @api public
 * @param {String|Object} [schema] accepts the path to the schema file,
*   the schema object, or null 
 * @return {Function} returns the new type constructor
 */
module.exports = function extend(arg) {
  var schemaPath
    , ext
    , jsonPath
    , json
    ;

  if(typeof arg === 'object') {
    json        = arg;
  } else if (typeof arg === 'string') {
    jsonPath    = arg;
    json        = require(jsonPath);
  } else {
    schemaPath  = callerPath();
    ext         = path.extname(schemaPath);
    jsonPath    = schemaPath.substring(0, schemaPath.length - ext.length) + '.json';
    json        = require(jsonPath);
  }

  function NewModel(args) {
    superprop.define(this, Model);
    this.super(json, args);
  }
  util.inherits(NewModel, Model);

  return NewModel;
};