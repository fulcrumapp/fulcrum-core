export default class ClassificationElement extends Element {
    allowOther: boolean;
    _classificationFilter: any;
    _overrideClassificationItems: Classification[] | null;
    _classificationSetID: any;
    load(dataSource: any, callback: any): void;
    classificationSet: any;
    get classificationItems(): any;
    set classificationFilter(classificationFilter: any);
    get classificationFilter(): any;
    set overrideClassificationItems(overrideClassificationSetItems: any);
    get overrideValues(): any;
    get filteredClassifications(): any;
}
import Element from './element';
import Classification from './classification';
