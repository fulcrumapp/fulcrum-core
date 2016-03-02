import setup from '../helper';
import fuzz from '../fuzz';

import { TextElement, TextValue } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('text fields', () => {
  it('finds a text field in the form', () => {
    const field = record.form.find('name');

    field.should.be.instanceof(TextElement);
    field.numeric.should.eql(false);
    field.pattern.should.eql('[a-zA-Z0-9]+');
    field.patternDescription.should.eql('Alphanumeric Only');
    field.minLength.should.eql(1);
    field.maxLength.should.eql(30);
  });

  it('finds a text value in the record', () => {
    const value = record.formValues.find('name');

    value.should.be.instanceof(TextValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('Test');

    value.searchableValue.should.eql('Test');

    value.toJSON().should.eql('Test');

    value.length.should.eql(4);

    value.columnValue.should.eql('Test');
  });

  it('changes the value of a text field', () => {
    const value = record.formValues.find('name');

    value.textValue = 'fulcrum';

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('fulcrum');

    value.searchableValue.should.eql('fulcrum');

    value.toJSON().should.eql('fulcrum');

    value.length.should.eql(7);

    value.columnValue.should.eql('fulcrum');

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

  it('handles integer numeric fields', () => {
    const value = record.formValues.find('integer_number');

    value.element.isIntegerFormat.should.eql(true);

    value.element.isDecimalFormat.should.eql(false);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('12');

    value.searchableValue.should.eql('12');

    value.toJSON().should.eql('12');

    value.length.should.eql(2);

    value.columnValue.should.eql(12);

    value.numericValue.should.eql(12);
  });

  it('handles decimal numeric fields', () => {
    const value = record.formValues.find('decimal_number');

    value.element.isIntegerFormat.should.eql(false);

    value.element.isDecimalFormat.should.eql(true);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('13.2');

    value.searchableValue.should.eql('13.2');

    value.toJSON().should.eql('13.2');

    value.length.should.eql(4);

    value.columnValue.should.eql(13.2);

    value.numericValue.should.eql(13.2);
  });

  it('implements comparisons for integer numeric fields', () => {
    const value = record.formValues.find('integer_number');

    value.textValue.should.eql('12');

    // conditions
    value.isEqual('12').should.eql(true);
    value.isEqual('12.0').should.eql(false); // TODO(zhm) seems wrong
    value.isEqual('11').should.eql(false);
    value.isEqual(null).should.eql(false);

    value.contains('1').should.eql(true);
    value.contains('12').should.eql(true);
    value.contains('12.2').should.eql(false);
    value.contains('12.20').should.eql(false);
    value.contains('a').should.eql(false);
    value.contains(null).should.eql(false);

    value.startsWith('1').should.eql(true);
    value.startsWith('12').should.eql(true);
    value.startsWith('12.3').should.eql(false);
    value.startsWith('13.30').should.eql(false);
    value.startsWith('a').should.eql(false);
    value.startsWith(null).should.eql(false);

    value.isLessThan('13').should.eql(true);
    value.isLessThan('12.1').should.eql(true);
    value.isLessThan('12').should.eql(false);
    value.isLessThan('12.0').should.eql(false);
    value.isLessThan('11.9').should.eql(false);
    value.isLessThan('a').should.eql(false);
    value.isLessThan(null).should.eql(false);

    value.isGreaterThan('11').should.eql(true);
    value.isGreaterThan('11.9').should.eql(true);
    value.isGreaterThan('12').should.eql(false);
    value.isGreaterThan('12.0').should.eql(false);
    value.isGreaterThan('12.1').should.eql(false);
    value.isGreaterThan('14').should.eql(false);
    value.isGreaterThan('a').should.eql(false);
    value.isGreaterThan(null).should.eql(false);

    fuzz(v => value.isEqual(v));
    fuzz(v => value.contains(v));
    fuzz(v => value.startsWith(v));
    fuzz(v => value.isLessThan(v));
    fuzz(v => value.isGreaterThan(v));
  });

  it('implements comparisons for decimal numeric fields', () => {
    const value = record.formValues.find('decimal_number');

    value.textValue.should.eql('13.2');

    // conditions
    value.isEqual('13.2').should.eql(true);
    value.isEqual('13.20').should.eql(false); // TODO(zhm) seems wrong
    value.isEqual('12').should.eql(false);
    value.isEqual(null).should.eql(false);

    value.contains('13').should.eql(true);
    value.contains('13.2').should.eql(true);
    value.contains('13.20').should.eql(false);
    value.contains('a').should.eql(false);
    value.contains(null).should.eql(false);

    value.startsWith('13').should.eql(true);
    value.startsWith('13.2').should.eql(true);
    value.startsWith('13.20').should.eql(false);
    value.startsWith('a').should.eql(false);
    value.startsWith(null).should.eql(false);

    value.isLessThan('14').should.eql(true);
    value.isLessThan('13.2').should.eql(false);
    value.isLessThan('12').should.eql(false);
    value.isLessThan('a').should.eql(false);
    value.isLessThan(null).should.eql(false);

    value.isGreaterThan('12').should.eql(true);
    value.isGreaterThan('13.2').should.eql(false);
    value.isGreaterThan('14').should.eql(false);
    value.isGreaterThan('a').should.eql(false);
    value.isGreaterThan(null).should.eql(false);
  });
});
