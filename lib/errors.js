
UnknownSOAPOperationError.prototype = Object.create(Error.prototype);
UnknownSOAPOperationError.prototype.constructor = UnknownSOAPOperationError;

function UnknownSOAPOperationError(targetOperation) {

  Error.call(this, 'Unknown soap operation \'' + targetOperation + '\'');

  this.targetOperation = targetOperation;
}

exports.UnknownSOAPOperationError = UnknownSOAPOperationError;
