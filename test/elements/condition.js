import setup from '../helper';

import Condition from '../../src/elements/condition';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('condition', () =>  {

  it('should return record status value if the condition is on status', () => {
    
    const element = record.form.get('ae75');
    const attributes = {
      field_key: '@status',
      operator: 'equal_to'
    };
    const condition = new Condition(element, attributes);

    const result = Condition.valueForCondition(condition, record.formValues, record);

    result.textValue.should.eql('complete');

  });

  it('should return the value for specified key', () => {
    
    const element = record.form.get('ae75');
    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to'
    };
    const condition = new Condition(element, attributes);

    const result = Condition.valueForCondition(condition, record.formValues, record);

    result.textValue.should.eql('Test');

  });

});