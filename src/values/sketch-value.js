import MediaValue from './media-value';
import SketchItemValue from './sketch-item-value';

export default class SketchValue extends MediaValue {
  get ItemClass() {
    return SketchItemValue;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Sketch';
    }

    return `${this.length} Sketches`;
  }
}
