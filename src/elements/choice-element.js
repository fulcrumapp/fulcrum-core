import Element from './element';

export default class ChoiceElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.choiceListID = attributes.choice_list_id;
    this.choices = attributes.choices;
    this.multiple = !!attributes.multiple;
    this.allowOther = !!attributes.allow_other;
  }
}
