import Locale from './locale';

const MachineFormatterOptions = {
  style: 'decimal',
  useGrouping: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 20
};

let intl = null;

if (typeof Intl !== 'undefined') {
  /* eslint-disable no-undef */
  intl = Intl;
  /* eslint-enable no-undef */
}

export default class NumberUtils {
  static parseDouble(input) {
    const number = +input;

    if (number == null || isNaN(number)) {
      return null;
    }

    return number;
  }

  static get localeDecimalFormatter() {
    if (!this._localeDecimalFormatter && intl) {
      this._localeDecimalFormatter = new intl.NumberFormat();
    }

    return this._localeDecimalFormatter;
  }

  static get localeIntegerFormatter() {
    if (!this._localeIntegerFormatter && intl) {
      this._localeIntegerFormatter = new intl.NumberFormat([], {maximumFractionDigits: 0});
    }

    return this._localeIntegerFormatter;
  }

  static get machineFormatter() {
    if (!this._machineFormatter && intl) {
      this._machineFormatter = new intl.NumberFormat(['en-US'], MachineFormatterOptions);
    }

    return this._machineFormatter;
  }

  static localizedStringFromMachineString(machineString, allowDecimals = true) {
    if (allowDecimals && NumberUtils.localeDecimalFormatter) {
      return NumberUtils.localeDecimalFormatter.format(machineString);
    } else if (NumberUtils.localeIntegerFormatter) {
      return NumberUtils.localeIntegerFormatter.format(machineString);
    }

    return machineString;
  }

  static formatMachine(number) {
    return NumberUtils.formatWithFormatter(NumberUtils.machineFormatter, number);
  }

  static formatCurrency(number, currency) {
    if (number == null) {
      return null;
    }

    return NumberUtils.__formatCurrency(number, currency);
  }

  static __formatCurrency(number, currency) {
    if (!Locale.supportsECMA402()) {
      return number;
    }

    const options = {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    const formatter = new global.Intl.NumberFormat(Locale.currentLocale(), options);

    return formatter.format(number);
  }

  static formatWithFormatter(formatter, number) {
    if (formatter != null) {
      let string = formatter.format(number);

      if (string === 'NaN') {
        return number;
      } else {
        return string;
      }
    } else {
      return number.toString();
    }
  }
}
