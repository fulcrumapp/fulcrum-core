import ElementValidationError from './element-validation-error';
import {format} from 'util';

export default class DateFormatValidationError extends ElementValidationError {
  get message() {
    const messageFormat = "The value of field '%s' must be a date in YYYY-MM-DD format.";

    return format(messageFormat, this.label);
  }
}
