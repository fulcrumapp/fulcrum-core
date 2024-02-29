export default class DisplayOptions {
    constructor(attributes: any);
    style: any;
    currency: any;
    get isCurrency(): boolean;
    get isNumber(): boolean;
    get isDate(): boolean;
    get isText(): boolean;
    format(value: any): any;
}
