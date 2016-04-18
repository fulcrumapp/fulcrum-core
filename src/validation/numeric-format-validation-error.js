import ElementValidationError from './element-validation-error';
import {format} from 'util';

export default class NumericFormatValidationError extends ElementValidationError {
  get message() {
    const messageFormat = this.element.isIntegerFormat ? "The value of field '%s' must be an integer number."
                                                       : "The value of field '%s' must be an decimal number.";

    return format(messageFormat, this.label);
  }
}
