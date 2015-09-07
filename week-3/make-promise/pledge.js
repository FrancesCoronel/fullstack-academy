/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

$Promise = function(state) {
  this.state = state;
  this.handlerGroups = [];
};

$Promise.prototype.callHandlers = function() {
  for (var i = this.handlerGroups.length - 1; i >= 0; i--) {
    if (this.handlerGroups[i].successCb && typeof this.handlerGroups[i].successCb === "function" && this.state === 'resolved') {
      var successTempState = this.handlerGroups.shift();
      successTempState.successCb(this.value);
    }
    else if (this.handlerGroups[i].errorCb && typeof this.handlerGroups[i].errorCb === "function" && this.state === 'rejected') {
      var failureTempState = this.handlerGroups.shift();
      failureTempState.errorCb(this.value);
    }
    /** --- alternate solution
    // can use ternary operator
      else {
        try () {
          var output = handler(this.value);
          group.forwarder.resolve(output);
          if (output instanceof $Promise) {
            output.then(function(val) {
              group.forwarder.resolve(val);
            }, function(err) {
              group.forwarder.reject(err);
            }
            });
          } else {
            group.forwarder.resolve(output);
          }
        }
        catch(err) {
          group.forwarder.reject(output);
        }
      }
     */
  }
};

$Promise.prototype.then = function(successHandler, failureHandler) {
  this.handlerGroups.push({
    successCb: successHandler,
    errorCb: failureHandler,
    forwarder: new Deferral()
  });
  if (typeof successHandler !== "function") {
    this.handlerGroups[this.handlerGroups.length - 1].successCb = undefined;
  }
  if (typeof failureHandler !== "function") {
    this.handlerGroups[this.handlerGroups.length - 1].errorCb = undefined;
  }
  if(this.state !== 'pending') {
    this.callHandlers();
  }
  return handlerGroups.forwarder.$promise;
};

$Promise.prototype.catch = function(errorFunction) {
  return this.then(null, errorFunction);
};

Deferral = function() {
  this.$promise = new $Promise('pending');
};

var defer = function() {
  return new Deferral();
};

Deferral.prototype.resolve = function(value) {
  if (this.$promise.state === 'pending') {
    this.$promise.state = 'resolved';
    this.$promise.value = value;
  }
  this.$promise.callHandlers();
};

Deferral.prototype.reject = function(value) {
  if (this.$promise.state === 'pending') {
    this.$promise.state = 'rejected';
    this.$promise.value = value;
  }
  this.$promise.callHandlers();
};

// Deferral.prototype.assimilate = function() {
//   var forwarder = this;
//   returnedPromise.then (
//     forwarder.resolve.bind(forwarder),
//     forwarder.reject.bind(forwarder)
//   );
// };

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------