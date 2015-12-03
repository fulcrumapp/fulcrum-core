import MediaValue from './media-value';
import VideoItemValue from './video-item-value';

export default class VideoValue extends MediaValue {
  get ItemClass() {
    return VideoItemValue;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Video';
    } else {
      return `${this.length} Videos`;
    }
  }
}
