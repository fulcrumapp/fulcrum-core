export default class RecordLinkElement extends Element {
    _formID: any;
    allowMultiple: boolean;
    allowExisting: boolean;
    allowCreating: boolean;
    allowUpdating: boolean;
    recordConditionsType: any;
    recordConditions: RecordLinkCondition[];
    recordDefaults: RecordLinkDefault[];
    load(dataSource: any, callback: any): void;
    form: any;
}
import Element from './element';
import RecordLinkCondition from './record-link-condition';
import RecordLinkDefault from './record-link-default';
