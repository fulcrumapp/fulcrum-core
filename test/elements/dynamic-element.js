import setup from '../helper';
import fuzz from '../fuzz';

import { DynamicElement, DynamicValue, CheckboxElement, CheckboxValue } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('dynamic elements fields', () => {
  it('finds a dynamic elements field in the form', () => {
    const field = record.form.find('checklist');

    field.should.be.instanceof(DynamicElement);
  });

  it('finds a dynamic elements value in the record', () => {
    const value = record.formValues.find('checklist');

    value.should.be.instanceof(DynamicValue);

    value.isEmpty.should.eql(false);

    const cbElement = value.items[0].elements[0];

    cbElement.should.be.instanceof(CheckboxElement);

    const cbValue = value.items[0].values.get(cbElement.key);

    cbValue.should.be.instanceof(CheckboxValue);

    cbValue.columnValue.should.eql(true);

    value.items[0].metadata.timestamp.should.eql('2022-12-03T02:15:06Z');
  });

  it('changes the value of a dynamic field', () => {
    const value = record.formValues.find('checklist');

    const cbElement = value.items[0].elements[0];
    const cbValue = value.items[0].values.get(cbElement.key);
    cbValue.beforeEach = true;

    value.items[0].values.get(cbElement.key).booleanValue = true;

    value.items[0].values.get(cbElement.key).isEmpty.should.eql(false);

    value.items[0].values.get(cbElement.key).displayValue.should.eql('true');

    value.items[0].values.get(cbElement.key).searchableValue.should.eql('true');

    value.items[0].values.get(cbElement.key).toJSON().should.eql(true);
  });
});
