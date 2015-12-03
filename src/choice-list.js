import Choice from './elements/choice';

export default class ChoiceList {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.choices = [];

    if (attributes.choices) {
      for (let choice of attributes.choices) {
        this.choices.push(new Choice(choice));
      }
    }
  }
}
