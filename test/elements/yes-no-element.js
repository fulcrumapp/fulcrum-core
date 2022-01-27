import setup from '../helper';
import fuzz from '../fuzz';

import { YesNoElement, YesNoValue } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('yes no fields', () => {
  it('finds a yes no field in the form', () => {
    const field = record.form.find('yesno');

    field.should.be.instanceof(YesNoElement);
    shouldBeNull(field.minLength);
    shouldBeNull(field.maxLength);
    field.positiveChoice.label.should.eql('Yes');
    field.positiveChoice.value.should.eql('yes');
    field.negativeChoice.label.should.eql('No');
    field.negativeChoice.value.should.eql('no');
    field.neutralChoice.label.should.eql('N/A');
    field.neutralChoice.value.should.eql('n/a');
    field.neutralEnabled = false;

    field.toJSON().should.eql({
      type: 'YesNoField',
      label: 'Yes/No',
      key: '3a9c',
      data_name: 'yesno',
      description: null,
      default_value: null,
      default_previous_value: false,
      disabled: false,
      hidden: false,
      required: false,
      required_conditions: null,
      required_conditions_type: null,
      visible_conditions: null,
      visible_conditions_behavior: 'clear',
      visible_conditions_type: null,
      positive: {
        label: 'Yes',
        value: 'yes'
      },
      negative: {
        label: 'No',
        value: 'no'
      },
      neutral: {
        label: 'N/A',
        value: 'n/a'
      },
      neutral_enabled: false
    });
  });

  it('finds a yes no na field in the form', () => {
    const field = record.form.find('yesnona');

    field.should.be.instanceof(YesNoElement);
    shouldBeNull(field.minLength);
    shouldBeNull(field.maxLength);
    field.positiveChoice.label.should.eql('Yes');
    field.positiveChoice.value.should.eql('yes');
    field.negativeChoice.label.should.eql('No');
    field.negativeChoice.value.should.eql('no');
    field.neutralChoice.label.should.eql('N/A');
    field.neutralChoice.value.should.eql('n/a');
    field.neutralEnabled = true;

    field.toJSON().should.eql({
      type: 'YesNoField',
      label: 'Yes/No/NA',
      key: '01ed',
      data_name: 'yesnona',
      description: null,
      default_value: null,
      default_previous_value: false,
      disabled: false,
      hidden: false,
      required: false,
      required_conditions: null,
      required_conditions_type: null,
      visible_conditions: [
        {
          field_key: '3a9c',
          operator: 'equal_to',
          value: 'yes'
        }
      ],
      visible_conditions_behavior: 'clear',
      visible_conditions_type: 'all',
      positive: {
        label: 'Yes',
        value: 'yes'
      },
      negative: {
        label: 'No',
        value: 'no'
      },
      neutral: {
        label: 'N/A',
        value: 'n/a'
      },
      neutral_enabled: true
    });
  });

  it('finds a yes no value in the record', () => {
    const value = record.formValues.find('yesno');
    value.should.be.instanceof(YesNoValue);
    value.isPositive.should.eql(true);
    value.isNegative.should.eql(false);
    value.isNeutral.should.eql(false);
    value.isEmpty.should.eql(false);
    value.displayValue.should.eql('Yes');
    value.searchableValue.should.eql('Yes');
    value.toJSON().should.eql('yes');
    value.length.should.eql(3);
    value.columnValue.should.eql('yes');
  });

  it('changes the value of a yes no field', () => {
    const value = record.formValues.find('yesno');

    value.textValue = 'yes';
    value.isPositive.should.eql(true);
    value.isNegative.should.eql(false);
    value.isNeutral.should.eql(false);
    value.isEmpty.should.eql(false);
    value.displayValue.should.eql('Yes');
    value.searchableValue.should.eql('Yes');
    value.toJSON().should.eql('yes');
    value.length.should.eql(3);
    value.columnValue.should.eql('yes');

    // clear the value
    value.textValue = null;
    value.isEmpty.should.eql(true);
    value.displayValue.should.eql('');
    value.searchableValue.should.eql('');
    shouldBeNull(value.toJSON());
    value.length.should.eql(0);
    shouldBeNull(value.columnValue);

    // clear the value with empty string (should have same semantics as null)
    value.textValue = '';
    value.isEmpty.should.eql(true);
    value.displayValue.should.eql('');
    value.searchableValue.should.eql('');
    shouldBeNull(value.toJSON());
    value.length.should.eql(0);
    shouldBeNull(value.columnValue);
  });
});
