import MediaValue from './media-value';
import AudioItemValue from './audio-item-value';

export default class AudioValue extends MediaValue {
  get ItemClass() {
    return AudioItemValue;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Audio File';
    } else {
      return `${this.length} Audio Files`;
    }
  }
}
