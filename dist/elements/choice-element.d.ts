export default class ChoiceElement extends Element {
    multiple: boolean;
    allowOther: boolean;
    _choiceFilter: any;
    _overrideChoices: any;
    _choiceListID: any;
    _choices: Choice[];
    load(dataSource: any, callback: any): void;
    _choicesByValue: {} | null | undefined;
    choiceList: any;
    get choices(): any;
    set choiceFilter(choiceFilter: any);
    get choiceFilter(): any;
    get filteredChoices(): Choice[];
    set overrideChoices(overrideChoices: any);
    get overrideChoices(): any;
    get overrideValues(): any;
    choiceByValue(value: any): any;
}
import Element from './element';
import Choice from './choice';
