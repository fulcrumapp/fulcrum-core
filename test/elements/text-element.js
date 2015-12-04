import setup from '../helper';

const { TextElement, TextValue } = setup();

let record = null;

beforeEach((done) => {
  ({ record } = setup());

  done();
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

    // conditions
    value.isEqual('13.2').should.eql(true);
    value.isEqual('12').should.eql(false);
    value.isEqual(null).should.eql(false);

    value.contains('13').should.eql(true);
    value.contains('a').should.eql(false);
    value.contains(null).should.eql(false);

    value.startsWith('13').should.eql(true);
    value.startsWith('a').should.eql(false);
    value.startsWith(null).should.eql(false);

    value.isLessThan('14').should.eql(true);
    value.isLessThan('12').should.eql(false);
    value.isLessThan('a').should.eql(false);
    value.isLessThan(null).should.eql(false);

    value.isGreaterThan('12').should.eql(true);
    value.isGreaterThan('14').should.eql(false);
    value.isGreaterThan('a').should.eql(false);
    value.isGreaterThan(null).should.eql(false);
  });
});
