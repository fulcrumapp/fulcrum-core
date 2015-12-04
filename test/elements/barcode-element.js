import setup from '../helper';

const { BarcodeElement, BarcodeValue } = setup();

let record = null;

beforeEach((done) => {
  ({ record } = setup());

  done();
});

describe('barcode fields', () => {
  it('finds a barcode field in the form', () => {
    record.form.find('barcode').should.be.instanceof(BarcodeElement);
  });

  it('finds a barcode value in the record', () => {
    const value = record.formValues.find('barcode');

    value.should.be.instanceof(BarcodeValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('EC1532 014123');

    value.searchableValue.should.eql('EC1532 014123');

    value.toJSON().should.eql('EC1532 014123');

    value.length.should.eql(13);

    value.columnValue.should.eql('EC1532 014123');
  });

  it('changes the value of a barcode field', () => {
    const value = record.formValues.find('barcode');

    value.textValue = 'AA 014123';

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('AA 014123');

    value.searchableValue.should.eql('AA 014123');

    value.toJSON().should.eql('AA 014123');

    value.length.should.eql(9);

    value.columnValue.should.eql('AA 014123');

    // clear the value
    value.textValue = null;

    value.isEmpty.should.eql(true);

    value.displayValue.should.eql('');

    value.searchableValue.should.eql('');

    shouldBeNull(value.toJSON());

    value.length.should.eql(0);

    shouldBeNull(value.columnValue);
  });
});
