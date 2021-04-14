import MediaItemValue from './media-item-value';

export default class AttachmentItemValue extends MediaItemValue {
  get mediaKey() {
    return 'attachment_id';
  }
}