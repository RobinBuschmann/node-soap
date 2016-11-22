SOAPError.prototype = Object.create(Error.prototype);
SOAPError.prototype.constructor = SOAPError;
function SOAPError(message) {
  Error.call(this, message);
  this.details = message;
  this.reasonText = 'Bad arguments';
  this.codeValue = 'Sender';
}


UnknownSOAPOperationError.prototype = Object.create(SOAPError.prototype);
UnknownSOAPOperationError.prototype.constructor = UnknownSOAPOperationError;
function UnknownSOAPOperationError(targetOperation) {

  SOAPError.call(this, 'Unknown soap operation "' + targetOperation + '"');
}

SOAPValidationError.prototype = Object.create(SOAPError.prototype);
SOAPValidationError.prototype.constructor = SOAPValidationError;
function SOAPValidationError(element, value, type, restriction, regex) {

  var message = 'Invalid value for "' + element + '" element. Expected "' + value + '" ';

  if(restriction && regex) {
    if(restriction === 'enum') {
      message += 'to be one of ' + regex.source
          .substring(2, regex.source.length - 2)
          .split('|')
          .map(function(value){return '"' + value + '"';})
          .join(', ');
    } else if (restriction === 'pattern') {
      message += 'to match "' + regex.toString() + '"';
    }
    message += ' specfied by "' + type + '".'
  } else {
    message += 'to be a ' + type;
  }

  SOAPError.call(this, message);
}

SOAPUnexpectedElement.prototype = Object.create(SOAPError.prototype);
SOAPUnexpectedElement.prototype.constructor = SOAPUnexpectedElement;
function SOAPUnexpectedElement(element, parent) {

  SOAPError.call(this, 'Unexpected element "' + element + '" in "' + parent + '".');
}

SOAPMissingElement.prototype = Object.create(SOAPError.prototype);
SOAPMissingElement.prototype.constructor = SOAPMissingElement;
function SOAPMissingElement(element, parent) {

  SOAPError.call(this, 'Missing element "' + element + '" in "' + parent + '".');
}

SOAPMissingChoiceError.prototype = Object.create(SOAPError.prototype);
SOAPMissingChoiceError.prototype.constructor = SOAPMissingChoiceError;
function SOAPMissingChoiceError(elements, parent) {

  SOAPError.call(this, 'Missing choice in ' + parent + '. One of the following choices is needed: ' +
    elements.join(', '));
}

SOAPChoiceError.prototype = Object.create(SOAPError.prototype);
SOAPChoiceError.prototype.constructor = SOAPChoiceError;
function SOAPChoiceError(elements, parent) {

  SOAPError.call(this, 'Choice error in ' + parent + '. Only one of the following choices are available: ' +
    elements.join(', '));
}

exports.SOAPError = SOAPError;
exports.UnknownSOAPOperationError = UnknownSOAPOperationError;
exports.SOAPValidationError = SOAPValidationError;
exports.SOAPUnexpectedElement = SOAPUnexpectedElement;
exports.SOAPMissingElement = SOAPMissingElement;
exports.SOAPMissingChoiceError = SOAPMissingChoiceError;
exports.SOAPChoiceError = SOAPChoiceError;
