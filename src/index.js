import Form from './form';
import Record from './record';
import Element from './elements/element';
import FormValue from './values/form-value';
import Choice from './elements/choice';
import Classification from './elements/classification';

const api = {
  Form: Form,
  Record: Record,
  Element: Element,
  FormValue: FormValue,
  Choice: Choice,
  Classification: Classification
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
