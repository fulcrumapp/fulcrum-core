import TextualElement from './textual-element';

const DEFAULT_PROJECT_ELEMENT = {
  label: 'Project',
  key: '@project',
  data_name: 'project',
  disabled: false,
  hidden: false,
  choices: []
};

export default class ProjectElement extends TextualElement {
  constructor(parent, attributes) {
    attributes.type = 'ProjectField';

    const attrs = Object.assign({}, DEFAULT_PROJECT_ELEMENT, attributes);

    super(parent, attrs);

    this._disabled = !!attrs.disabled;
    this._hidden = !!attrs.hidden;
  }

  get isEnabled() {
    return !this._disabled;
  }

  get isReadOnly() {
    return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._readOnly;
  }

  projectForValue(value) {
    for (const choice of this.choices) {
      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  }
}
