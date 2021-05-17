import MediaItemValue from './media-item-value';

export default class AttachmentItemValue extends MediaItemValue {
  constructor(mediaValue, attributes) {
    super(mediaValue, attributes);

    this.name = attributes.name;
  }

  toJSON() {
    const json = {};

    json.name = this.name || null;
    json[this.mediaKey] = this.mediaID || null;

    return json;
  }

  get mediaKey() {
    return 'attachment_id';
  }
}