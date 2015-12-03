import setup from '../helper';

const { DateElement, DateValue } = setup();

let record = null;

beforeEach((done) => {
  ({ record } = setup());

  done();
});

describe('date fields', () => {
  it('finds a date field in the form', () => {
    record.form.elementsByKey['8fd4'].should.be.instanceof(DateElement);
  });

  it('finds a date value in the record by key', () => {
    record.formValues.get('8fd4').should.be.instanceof(DateValue);
    record.formValues.get('8fd4').textValue.should.eql('2015-12-02');
  });

  it('finds a date value in the record by data name', () => {
    record.formValues.find('date').should.be.instanceof(DateValue);
    record.formValues.find('date').textValue.should.eql('2015-12-02');
    record.formValues.find('date').dateValue.should.eql(new Date('2015/12/02'));
    record.formValues.find('date').dateValue.getTime().should.eql(new Date('2015/12/02').getTime());
  });
});

