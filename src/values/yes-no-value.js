import TextualValue from './textual-value';

export default class YesNoValue extends TextualValue {
  get isPositive() {
    if (this.element.positiveChoice) {
      return this.textValue === this.element.positiveChoice.value;
    }

    return false;
  }

  get isNegative() {
    if (this.element.negativeChoice) {
      return this.textValue === this.element.negativeChoice.value;
    }

    return false;
  }

  get isNeutral() {
    if (this.element.neutralChoice) {
      return this.textValue === this.element.neutralChoice.value;
    }

    return false;
  }

  get displayValue() {
    switch (true) {
      case this.isPositive:
        return this.element.positiveChoice.label;
      case this.isNegative:
        return this.element.negativeChoice.label;
      case this.isNeutral:
        return this.element.neutralChoice.label;
      default:
        return this.textValue;
    }
  }
}
