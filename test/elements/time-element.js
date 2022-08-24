import setup from '../helper';

import { TimeElement, TimeValue } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('time fields', () => {
  it('finds a time field in the form', () => {
    record.form.get('dfd5').should.be.instanceof(TimeElement);
  });

  it('finds a time value in the record by key', () => {
    record.formValues.get('dfd5').should.be.instanceof(TimeValue);
    record.formValues.get('dfd5').textValue.should.eql('21:14');
    record.formValues.get('dfd5').displayValue.should.eql('21:14');
    record.formValues.get('dfd5').columnValue.should.eql('21:14');
    record.formValues.get('dfd5').searchableValue.should.eql('21:14');

    record.formValues.get('dfd5').textValue = '12:43 PM';
    shouldBeNull(record.formValues.get('dfd5').columnValue);
  });

  it('should proccess HH:MM:SS time format and not to be null', () => {
    record.formValues.get('dfd5').textValue = '12:43:09';
    record.formValues.get('dfd5').columnValue.should.not.be.null
  })

  it('when the time format is not correct it should be null', () => {
    record.formValues.get('dfd5').textValue = '12:43:0';
    shouldBeNull(record.formValues.get('dfd5').columnValue);
  })

  it('finds a time value in the record by data name', () => {
    record.formValues.find('time').should.be.instanceof(TimeValue);
    record.formValues.find('time').textValue.should.eql('21:14');
  });
});
