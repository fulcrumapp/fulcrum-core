import MediaValue from './media-value';
import TextUtils from '../utils/text-utils';
import AttachmentItemValue from './attachment-item-value';

export default class AttachmentValue extends MediaValue {
  get ItemClass() {
    return AttachmentItemValue;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Attachment';
    }

    return `${this.length} Attachments`;
  }

  get searchableValue() {
    if (this.isEmpty) {
      return null;
    }

    const ids = [];

    for (const item of this._items) {
      if (TextUtils.isPresent(item.name)) {
        ids.push(item.name);
      }
    }

    return ids.join(' ');
  }
}
