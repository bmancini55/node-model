var _           = require('underscore')
  , Q           = require('q')
  , extend      = require('./extend')
  ;


function BaseModel(schema, values) {
  var self = this;

  function defineProps(values) {
    this.schema.properties.forEach(function(prop) {
      if(values) {
        this[prop.name] = values[prop.name];
      }
      this[prop.name] = this[prop.name] || prop.default || null;
    }.bind(this));  
  }

  // set the schema
  this.schema = schema;

  // attach properies with values
  defineProps.call(this, values);
}

module.exports = BaseModel;



BaseModel.prototype.toClient = function toClient() {
  var self  = this 
    , client = {}
    ;
  
  this.schema.properties.forEach(function(prop) {
    if(prop.noClient) return;

    var name  = prop.clientName || prop.name
      , value = self[prop.name]
      ;
      
    client[name] = value;
  });

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



function validateRequired(obj, prop) {
  // TODO implement
  // if(!obj[prop.name]) {
  //   return AppError.createValidation(prop.name + ' is required');
  // }
}


function validateType(obj, prop) {
  // TODO implement
}