export default class ClassificationElement extends Element {
    allowOther: boolean;
    _classificationFilter: any;
    _overrideClassificationItems: Classification[] | null;
    _classificationSetID: any;
    load(dataSource: any, callback: any): void;
    classificationSet: any;
    get classificationItems(): any;
    set classificationFilter(arg: any);
    get classificationFilter(): any;
    set overrideClassificationItems(arg: any);
    get overrideValues(): any;
    get filteredClassifications(): any;
}
import Element from "./element";
import Classification from "./classification";
