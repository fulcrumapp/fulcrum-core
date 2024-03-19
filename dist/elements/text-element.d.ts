export default class TextElement extends TextualElement {
    _isNumeric: boolean;
    format: any;
    min: number | null;
    max: number | null;
    pattern: any;
    patternDescription: any;
    get isDecimalFormat(): boolean;
    get isIntegerFormat(): boolean;
    get isNumeric(): boolean;
    get hasMin(): boolean;
    get hasMax(): boolean;
    get hasPattern(): any;
    get hasPatternDescription(): any;
}
import TextualElement from "./textual-element";
