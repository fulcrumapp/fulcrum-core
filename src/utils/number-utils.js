import Locale from './locale';

const MachineFormatterOptions = {
  style: 'decimal',
  useGrouping: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 20
};

let intl = null;

if (typeof Intl !== 'undefined') {
  intl = (window || global).Intl;
}

export default class NumberUtils {
  static parseDouble(input) {
    return +input;
  }

  static localizedStringFromMachineString(machineString, allowDecimals) {
    return machineString;
  }

  static formatMachine(number) {
    if (intl) {
      if (NumberUtils.machineFormatter == null) {
        NumberUtils.machineFormatter = new intl.NumberFormat(['en-US'], MachineFormatterOptions);
      }
    }

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

    const formatter = new (window || global).Intl.NumberFormat(Locale.currentLocale(), options);

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
