import setup from '../helper';
import fuzz from '../fuzz';

import { CheckBoxElement, CheckBoxValue } from '../../src';

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

    field.should.be.instanceof(CheckBoxElement);
  });

  it('finds a boolean value in the record', () => {
    const value = record.formValues.find('checkbox_field');

    value.should.be.instanceof(CheckBoxValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('true');

    value.searchableValue.should.eql('true');

    value.isChecked.should.eql(true);

    value.columnValue.should.eql(true);
  });

  it('changes the value of a text field', () => {
    const value = record.formValues.find('checkbox_field');

    value.booleanValue = true;

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('true');

    value.searchableValue.should.eql('true');

    value.toJSON().should.eql(true);

    // value.length.should.eql(7);

    value.columnValue.should.eql(true);

    // clear the value
    value.booleanValue = false;

    value.columnValue.should.eql(false);

    // value.isEmpty.should.eql(true);

    // value.displayValue.should.eql('');

    // value.searchableValue.should.eql('');

    // shouldBeNull(value.toJSON());

    // value.length.should.eql(0);

    // shouldBeNull(value.columnValue);

    // // clear the value with empty string (should have same semantics as null)
    // value.textValue = '';

    // value.isEmpty.should.eql(true);

    // value.displayValue.should.eql('');

    // value.searchableValue.should.eql('');

    // shouldBeNull(value.toJSON());

    // value.length.should.eql(0);

    // shouldBeNull(value.columnValue);
  });

  // it('handles integer numeric fields', () => {
  //   const value = record.formValues.find('integer_number');

  //   value.element.isIntegerFormat.should.eql(true);

  //   value.element.isDecimalFormat.should.eql(false);

  //   value.isEmpty.should.eql(false);

  //   value.displayValue.should.eql('12');

  //   value.searchableValue.should.eql('12');

  //   value.toJSON().should.eql('12');

  //   value.length.should.eql(2);

  //   value.columnValue.should.eql(12);

  //   value.numericValue.should.eql(12);
  // });

  // it('handles decimal numeric fields', () => {
  //   const value = record.formValues.find('decimal_number');

  //   value.element.isIntegerFormat.should.eql(false);

  //   value.element.isDecimalFormat.should.eql(true);

  //   value.isEmpty.should.eql(false);

  //   value.displayValue.should.eql('1337.2');

  //   value.searchableValue.should.eql('1337.2');

  //   value.toJSON().should.eql('1337.2000');

  //   value.length.should.eql(9);

  //   value.columnValue.should.eql(1337.2);

  //   value.numericValue.should.eql(1337.2);
  // });

  // it('implements comparisons for integer numeric fields', () => {
  //   const value = record.formValues.find('integer_number');

  //   value.textValue.should.eql('12');

  //   // conditions
  //   value.isEqual('12').should.eql(true);
  //   value.isEqual('12.0').should.eql(false); // TODO(zhm) seems wrong
  //   value.isEqual('11').should.eql(false);
  //   value.isEqual(null).should.eql(false);

  //   value.contains('1').should.eql(true);
  //   value.contains('12').should.eql(true);
  //   value.contains('12.2').should.eql(false);
  //   value.contains('12.20').should.eql(false);
  //   value.contains('a').should.eql(false);
  //   value.contains(null).should.eql(false);

  //   value.startsWith('1').should.eql(true);
  //   value.startsWith('12').should.eql(true);
  //   value.startsWith('12.3').should.eql(false);
  //   value.startsWith('13.30').should.eql(false);
  //   value.startsWith('a').should.eql(false);
  //   value.startsWith(null).should.eql(false);

  //   value.isLessThan('13').should.eql(true);
  //   value.isLessThan('12.1').should.eql(true);
  //   value.isLessThan('12').should.eql(false);
  //   value.isLessThan('12.0').should.eql(false);
  //   value.isLessThan('11.9').should.eql(false);
  //   value.isLessThan('a').should.eql(false);
  //   value.isLessThan(null).should.eql(false);

  //   value.isGreaterThan('11').should.eql(true);
  //   value.isGreaterThan('11.9').should.eql(true);
  //   value.isGreaterThan('12').should.eql(false);
  //   value.isGreaterThan('12.0').should.eql(false);
  //   value.isGreaterThan('12.1').should.eql(false);
  //   value.isGreaterThan('14').should.eql(false);
  //   value.isGreaterThan('a').should.eql(false);
  //   value.isGreaterThan(null).should.eql(false);

  //   fuzz(v => value.isEqual(v));
  //   fuzz(v => value.contains(v));
  //   fuzz(v => value.startsWith(v));
  //   fuzz(v => value.isLessThan(v));
  //   fuzz(v => value.isGreaterThan(v));
  // });

  // it('implements comparisons for decimal numeric fields', () => {
  //   const value = record.formValues.find('decimal_number');

  //   value.textValue.should.eql('1337.2000');

  //   // conditions
  //   value.isEqual('1337.2000').should.eql(true);
  //   value.isEqual('1337.20').should.eql(false); // TODO(zhm) seems wrong
  //   value.isEqual('12').should.eql(false);
  //   value.isEqual(null).should.eql(false);

  //   value.contains('1337').should.eql(true);
  //   value.contains('1337.2').should.eql(true);
  //   value.contains('1337.200000').should.eql(false);
  //   value.contains('a').should.eql(false);
  //   value.contains(null).should.eql(false);

  //   value.startsWith('1337').should.eql(true);
  //   value.startsWith('1337.2').should.eql(true);
  //   value.startsWith('1337.200000').should.eql(false);
  //   value.startsWith('a').should.eql(false);
  //   value.startsWith(null).should.eql(false);

  //   value.isLessThan('1400').should.eql(true);
  //   value.isLessThan('1337.2').should.eql(false);
  //   value.isLessThan('1200').should.eql(false);
  //   value.isLessThan('a').should.eql(false);
  //   value.isLessThan(null).should.eql(false);

  //   value.isGreaterThan('1200').should.eql(true);
  //   value.isGreaterThan('1337.2').should.eql(false);
  //   value.isGreaterThan('1400').should.eql(false);
  //   value.isGreaterThan('a').should.eql(false);
  //   value.isGreaterThan(null).should.eql(false);
  // });
});
