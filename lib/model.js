var _           = require('underscore')
  , Q           = require('q')
  , extend      = require('./extend')
  ;


function BaseModel(schema, args) {
  var self = this;
  this.schema = schema;
  defineProps.call(this, args);
}

module.exports = BaseModel;



BaseModel.prototype.toClient = function toClient() {
  var client = _.clone(this);
  
  // rename properties
  // TODO

  // delete server only
  // TODO

  return client;
};

BaseModel.prototype.validate = function validate(next) {
  var deferred = Q.defer()
    , self = this
    , errors = [];
  
  process.nextTick(function() {        

    self.schema.properties.forEach(function(prop) {
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


function defineProps(values) {
  this.schema.properties.forEach(function(prop) {
    if(values) {
      this[prop.name] = values[prop.name];
    }
    this[prop.name] = this[prop.name] || prop.default || null;
  }.bind(this));  
}


function validateRequired(obj, prop) {
  // TODO implement
  // if(!obj[prop.name]) {
  //   return AppError.createValidation(prop.name + ' is required');
  // }
}


function validateType(obj, prop) {
  // TODO implement
}