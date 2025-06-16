import MediaValue from './media-value';
import PhotoItemValue from './photo-item-value';

export default class SketchValue extends MediaValue {
  get ItemClass() {
    return PhotoItemValue;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Photo';
    }

    return `${this.length} Photos`;
  }
}
