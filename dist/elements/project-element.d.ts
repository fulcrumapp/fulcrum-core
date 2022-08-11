export default class ProjectElement extends TextualElement {
    _disabled: boolean;
    _hidden: boolean;
    get isEnabled(): boolean;
    get isReadOnly(): any;
    projectForValue(value: any): any;
}
import TextualElement from "./textual-element";
