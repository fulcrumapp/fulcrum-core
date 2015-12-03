import Form from './form';
import Record from './record';
import Element from './elements/element';

const api = {
  Form: Form,
  Record: Record
  // Condition: require('./elements/condition'),
  // NumberUtils: require('./utils/number-utils'),
  // CalculatedElement: require('./elements/calculated-element')
};

const classes = Element.classes();

for (let prop of Object.keys(classes)) {
  api[prop] = classes[prop];
}

export default api;
