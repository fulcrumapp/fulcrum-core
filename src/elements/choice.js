export default class Choice {
  constructor(attributes) {
    this.label = attributes.label;
    this.value = attributes.value || attributes.label;
  }

  toJSON() {
    return {
      label: this.label,
      value: this.value
    };
  }
}
