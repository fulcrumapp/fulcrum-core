export default class ChildElements extends Mixin {
    get elements(): any[] | undefined;
    createChildElements(elements: any): void;
    _elements: any[] | undefined;
    get allElements(): any;
    get elementsByKey(): {};
    _elementsByKey: {} | undefined;
    get elementsByDataName(): {};
    _elementsByDataName: {} | undefined;
    elementsOfType(type: any, recurseRepeatables?: boolean): any[];
    flattenElements(recurseRepeatables?: boolean): any;
    _flattenElements(elements: any, recurseRepeatables?: boolean): any;
    _flattenElementsByAttribute(elements: any, attr: any): {};
}
import Mixin from 'mixmatch';
