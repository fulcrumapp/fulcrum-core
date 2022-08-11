export default class Classification {
    constructor(parent: any, attributes: any);
    parent: any;
    label: any;
    value: any;
    _items: Classification[];
    get items(): Classification[];
    get exploded(): Classification[];
    toJSON(): any[];
}
