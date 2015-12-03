import Form from './form';
import Record from './record';
import Element from './elements/element';
import FormValue from './values/form-value';

const api = {
  Form: Form,
  Record: Record
  // Condition: require('./elements/condition'),
  // NumberUtils: require('./utils/number-utils'),
  // CalculatedElement: require('./elements/calculated-element')
};

const elements = Element.classes();

for (let prop of Object.keys(elements)) {
  api[prop] = elements[prop];
}

const values = FormValue.classes();

for (let prop of Object.keys(values)) {
  api[prop] = values[prop];
}

export default api;
