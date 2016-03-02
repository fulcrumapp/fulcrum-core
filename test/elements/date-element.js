import setup from '../helper';

import { DateElement, DateValue } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('date fields', () => {
  it('finds a date field in the form', () => {
    record.form.get('8fd4').should.be.instanceof(DateElement);
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

