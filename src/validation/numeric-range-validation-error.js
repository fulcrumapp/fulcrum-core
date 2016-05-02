import ElementValidationError from './element-validation-error';
import {format} from 'util';

export default class NumericRangeValidationError extends ElementValidationError {
  get message() {
    let message = null;

    const fieldLabel = this.label;

    if (this.element.hasMin && this.element.hasMax) {
      message = format("The value of field '%s' must be between %s and %s.",
                       fieldLabel,
                       this.element.min,
                       this.element.max);
    } else if (this.element.hasMin) {
      message = format("The value of field '%s' must be greater than or equal to %s.",
                       fieldLabel,
                       this.element.min);
    } else {
      message = format("The value of field '%s' must be less than or equal to %s.",
                       fieldLabel,
                       this.element.max);
    }

    return message;
  }
}
