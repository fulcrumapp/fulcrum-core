export default class Classification {
  constructor(attributes) {
    this.label = attributes.label;
    this.value = attributes.value || attributes.label;
    this.children = [];

    if (attributes.child_classifications) {
      for (let child of attributes.child_classifications) {
        this.children.push(new Classification(child));
      }
    }
  }
}
