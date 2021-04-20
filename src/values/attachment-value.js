import MediaValue from './media-value';
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
}
