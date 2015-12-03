import MediaItemValue from './media-item-value';

export default class VideoItemValue extends MediaItemValue {
  get mediaKey() {
    return 'video_id';
  }
}
