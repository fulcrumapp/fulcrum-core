import setup from '../helper';

import { CheckboxElement, CheckboxValue } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('checkbox fields', () => {
  it('finds a checkbox field in the form', () => {
    const field = record.form.find('checkbox_field');

    field.should.be.instanceof(CheckboxElement);
    shouldBeNull(field.minLength);
    shouldBeNull(field.maxLength);

    field.toJSON().should.eql({
      type: 'CheckboxField',
      label: 'Checkbox Field',
      key: '92ab',
      data_name: 'checkbox_field',
      description: null,
      default_value: null,
      default_previous_value: false,
      disabled: false,
      hidden: false,
      required: true,
      required_conditions: null,
      required_conditions_type: null,
      visible_conditions: null,
      visible_conditions_behavior: 'clear',
      visible_conditions_type: null,
    });
  });

  it('finds a boolean value in the record', () => {
    const value = record.formValues.find('checkbox_field');
    value.should.be.instanceof(CheckboxValue);
    value.booleanValue.should.eql(true);
    value.isEmpty.should.eql(false);
    value.displayValue.should.eql('true');
    value.searchableValue.should.eql('true');
    value.isChecked.should.eql(true);
    value.columnValue.should.eql(true);
  });

  it('changes the value of a checkbox field', () => {
    const value = record.formValues.find('checkbox_field');
    value.booleanValue = true;
    value.isEmpty.should.eql(false);
    value.displayValue.should.eql('true');
    value.searchableValue.should.eql('true');
    value.toJSON().should.eql(true);
    value.length.should.eql(1);
    value.columnValue.should.eql(true);

    // clear the value
    value.booleanValue = false;
    value.columnValue.should.eql(false);
    value.isEmpty.should.eql(false);
    value.displayValue.should.eql('false');
    value.searchableValue.should.eql('false');
    value.toJSON().should.eql(false);
    value.columnValue.should.eql(false);
    value.length.should.eql(1);
  });
});
