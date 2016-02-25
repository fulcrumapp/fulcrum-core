import Choice from './choice';

export default class StatusChoice extends Choice {
  constructor(attributes) {
    super(attributes);

    this.color = attributes.color;
  }
}
