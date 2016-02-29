import {format} from 'util';
import ElementValidationError from './element-validation-error';

export default class RequiredFieldValidationError extends ElementValidationError {
  get message() {
    return format("The field '%s' is required.", this.label);
  }
}
