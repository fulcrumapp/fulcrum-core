import Element from './element';
import ElementFactory from './element-factory';
import Choice from './choice';
import _ from 'lodash';

export default class ChoiceElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.multiple = !!attributes.multiple;
    this.allowOther = !!attributes.allow_other;
    this.choiceFilter = null;
    this.overrideChoices = null;

    this._choiceListID = attributes.choice_list_id;
    this._choices = [];

    if (this._choiceListID) {
      this.choiceList = ElementFactory.getProvider().getChoiceList(this._choiceListID);
      this._choices = this.choiceList.choices.slice();
    } else {
      for (let choice of attributes.choices) {
        this._choices.push(new Choice(choice));
      }
    }
  }

  get isLengthValidationSupported() {
    return this.multiple;
  }

  get choices() {
    return this._overrideChoices ? this._overrideChoices : this.filteredChoices;
  }

  get filteredChoices() {
    const items = this._choices;

    if (!this.choiceFilter) {
      return items;
    }

    const filteredItems = [];

    for (let item of items) {
      if (_.contains(this.choiceFilter, item.value.toLowerCase())) {
        filteredItems.push(item);
      }
    }

    return filteredItems;
  }

  get overrideChoices() {
    return this._overrideChoices;
  }

  set overrideChoices(overrideChoices) {
    this.choicesByValue = null;

    if (!overrideChoices || overrideChoices.length < 1) {
      this._overrideChoices = null;
      return;
    }

    const choices = [];

    for (let choiceAttributes of overrideChoices) {
      const choice = new Choice(choiceAttributes);

      choices.push(choice);
    }

    this._overrideChoices = choices;
  }
}
