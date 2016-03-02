export default class RecordLinkDefault {
  constructor(attributes) {
    this.sourceKey = attributes.source_field_key;
    this.destinationKey = attributes.destination_field_key;
  }
}
