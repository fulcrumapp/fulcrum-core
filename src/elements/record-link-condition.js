export default class RecordLinkCondition {
  constructor(attributes) {
    this.linkedFormFieldKey = attributes.linked_form_field_key;
    this.operator = attributes.operator;
    this.value = attributes.value;
    this.valueFieldKey = attributes.value_field_key;
  }
}
