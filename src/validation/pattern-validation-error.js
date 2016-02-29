import ElementValidationError from './element-validation-error';
import {format} from 'util';

export default class PatternValidationError extends ElementValidationError {
  get message() {
    return format("The field '%s' is not in the correct format: %s",
                  this.label,
                  this.element.patternDescription);
  }
}
