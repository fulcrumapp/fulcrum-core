import BooleanElement from './boolean-element';

export default class CheckboxElement extends BooleanElement {
  toJSON() {
    const json = super.toJSON();
    return {
      ...json,
      default_previous_value: !!this._defaultPreviousValue
    };
  }
}
