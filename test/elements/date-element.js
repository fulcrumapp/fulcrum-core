import setup from '../helper';

const { DateElement, DateValue } = setup();

let record = null;

beforeEach((done) => {
  ({ record } = setup());

  done();
});

describe('date fields', () => {
  it('finds a date field in the form', () => {
    record.form.elementByKey('8fd4').should.be.instanceof(DateElement);
  });

  it('finds a date value in the record', () => {
    record.formValues.getFormValue('8fd4').should.be.instanceof(DateValue);
    record.formValues.getFormValue('8fd4').textValue.should.eql('2015-12-01');
  });
});

