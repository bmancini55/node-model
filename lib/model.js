var path        = require('path')
  , util        = require('util')
  , _           = require('underscore')
  , Q           = require('q')  
  , callerPath  = require('caller-path')
  ;


module.exports.extend = function extend(schemaPathOverride) {
  var schemaPath  = schemaPathOverride || callerPath()
    , ext         = path.extname(schemaPath)
    , jsonPath    = schemaPath.substring(0, schemaPath.length - ext.length) + '.json'
    , json        = require(jsonPath)
    ;
  
  function NewModel(args) {
    Model.call(this, args);
  }
  util.inherits(NewModel, Model);

  NewModel.prototype.schema = function() {
    return json;
  };

  return NewModel;
};




function Model(args) {
  var self = this;

  this.schema().properties.forEach(function(prop) {
    if(args) {
      self[prop.name] = args[prop.name];
    }
    self[prop.name] = self[prop.name] || prop.default || null;
  });
  
}



Model.prototype.toClient = function toClient(next) {
  var deferred = Q.defer()
    , client = _.extend(client, this)
    ;
  
  // rename properties
  // TODO

  // delete server only
  // TODO

  return deferred
    .promise
    .nodeify(next);
};

Model.prototype.validate = function validate(next) {
  var deferred = Q.defer()
    , self = this
    , errors = [];
  
  process.nextTick(function() {        

    self.schema().properties.forEach(function(prop) {
      var result;
      if(prop.required) {
        result = validateRequired(self, prop);
        if(result) errors.push(result);
      }
    });

    if(errors.length > 0) {
      deferred.reject(errors);
    } else {
      deferred.resolve();
    }
  });

  return deferred.promise.nodeify(next);
};


function validateRequired(obj, prop) {
  // TODO implement
  // if(!obj[prop.name]) {
  //   return AppError.createValidation(prop.name + ' is required');
  // }
}


function validateType(obj, prop) {
  // TODO implement
}