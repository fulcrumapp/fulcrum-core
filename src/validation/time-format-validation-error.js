import ElementValidationError from './element-validation-error';
import {format} from 'util';

export default class TimeFormatValidationError extends ElementValidationError {
  get message() {
    const messageFormat = "The value of field '%s' must be a time in HH:MM format.";

    return format(messageFormat, this.label);
  }
}
