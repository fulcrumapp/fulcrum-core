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

    // this._projectFilter = null;
    // this._choices = [];

    // if (attrs.choices) {
    //   for (const choice of attrs.choices) {
    //     this._choices.push(choice);
    //   }
    // }

    this._disabled = !!attrs.disabled;
    this._hidden = !!attrs.hidden;
  }

  // get choices() {
  //   // return this.filteredChoices;
  //   return this._choices;
  // }

  get isEnabled() {
    return !this._disabled;
  }

  get isReadOnly() {
    return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._readOnly;
  }

//   get statusFilter() {
//     return this._statusFilter;
//   }

//   set statusFilter(statusFilter) {
//     this._statusFilter = statusFilter;
//   }

  projectForValue(value) {
    for (const choice of this.choices) {
      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  }

//   get filteredChoices() {
//     const items = this._choices;

//     if (!this.statusFilter) {
//       return items;
//     }

//     const filteredItems = [];

//     for (const item of items) {
//       for (const filter of this.statusFilter) {
//         if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
//           filteredItems.push(item);
//         }
//       }
//     }

//     return filteredItems;
//   }

//   get overrideValues() {
//     return Object.assign(Object.getOwnPropertyDescriptor(Element.prototype, 'overrideValues').get.call(this), {
//       statusFilter: this._statusFilter
//     });
//   }

//   resetOverrides() {
//     super.resetOverrides();

//     this._statusFilter = null;
//   }
}
