import MediaItemValue from './media-item-value';

export default class PhotoItemValue extends MediaItemValue {
  get mediaKey() {
    return 'photo_id';
  }
}
