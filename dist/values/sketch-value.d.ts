export default class SketchValue extends MediaValue {
    get ItemClass(): typeof SketchItemValue;
    get displayValue(): string;
}
import MediaValue from "./media-value";
import SketchItemValue from "./sketch-item-value";
