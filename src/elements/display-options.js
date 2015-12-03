import TextUtils from '../utils/text-utils';
import NumberUtils from '../utils/number-utils';
import DateUtils from '../utils/date-utils';

export default class DisplayOptions {
  constructor(attributes) {
    this.style = attributes.style;
    this.currency = attributes.currency;
  }

  get isCurrency() {
    return this.style === 'currency';
  }

  get isNumber() {
    return this.style === 'number';
  }

  get isDate() {
    return this.style === 'date';
  }

  get isText() {
    return this.style === 'text';
  }

  format(value) {
    if (!TextUtils.isPresent(value)) {
      return value;
    }

    switch (true) {
      case this.isNumber:
        return NumberUtils.localizedStringFromMachineString(value, true);

      case this.isDate:
        const date = DateUtils.parseDate(value);

        if (date != null) {
          return DateUtils.formatLocalizedDate(date);
        }

        break;

      case this.isCurrency:
        return NumberUtils.formatCurrency(value, this.currency);

      default:
        break;
    }

    return value;
  }
}
