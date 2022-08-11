export default class NumberUtils {
    static parseDouble(input: any): number | null;
    static get localeDecimalFormatter(): any;
    static get localeIntegerFormatter(): any;
    static get machineFormatter(): any;
    static localizedStringFromMachineString(machineString: any, allowDecimals?: boolean): any;
    static formatMachine(number: any): any;
    static formatCurrency(number: any, currency: any): any;
    static __formatCurrency(number: any, currency: any): any;
    static formatWithFormatter(formatter: any, number: any): any;
}
