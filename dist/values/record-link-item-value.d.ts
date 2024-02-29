export default class RecordLinkItemValue {
    constructor(parent: any, attributes: any);
    _parent: any;
    _recordID: any;
    get parent(): any;
    get id(): any;
    toJSON(): {
        record_id: any;
    };
    get displayValue(): any;
    set record(record: any);
    get record(): any;
    _record: any;
    load(dataSource: any, callback: any): void;
}
