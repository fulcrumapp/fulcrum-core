import MediaItemValue from './media-item-value';

export default class AudioItemValue extends MediaItemValue {
  get mediaKey() {
    return 'audio_id';
  }
}
