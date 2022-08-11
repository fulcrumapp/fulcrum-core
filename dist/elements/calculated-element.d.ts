export default class CalculatedElement extends TextualElement {
    static findCalculatedElementRoot(form: any, container: any): any;
    static findCalculatedElementsForContainer(container: any): any;
    expression: any;
    display: DisplayOptions;
}
import TextualElement from "./textual-element";
import DisplayOptions from "./display-options";
