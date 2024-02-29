export default class Choice {
    constructor(attributes: any);
    label: any;
    value: any;
    toJSON(): {
        label: any;
        value: any;
    };
}
