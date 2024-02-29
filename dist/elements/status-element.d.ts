export default class StatusElement extends TextualElement {
    _statusFilter: any;
    _choices: StatusChoice[];
    _enabled: boolean;
    _readOnly: boolean;
    get choices(): StatusChoice[];
    get isEnabled(): boolean;
    get isReadOnly(): any;
    set statusFilter(statusFilter: any);
    get statusFilter(): any;
    statusForValue(value: any): StatusChoice | null;
    get filteredChoices(): StatusChoice[];
    get overrideValues(): any;
}
import TextualElement from './textual-element';
import StatusChoice from './status-choice';
