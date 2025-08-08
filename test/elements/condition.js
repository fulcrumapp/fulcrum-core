import setup from '../helper';
import sinon from 'sinon';

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

describe('isSatisfied', () => {
  it('should return true if the condition is satisfied', () => {
    const element = record.form.get('ae75');
    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };
    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(true);
  });

  it('should return false if the condition is not satisfied', () => {
    const element = record.form.get('ae75');
    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Not Test'
    };
    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(false);
  });

  it('should return true when a conditionally hidden field with "preserve" has a matching value', () => {
    const element = record.form.get('ae75');

    element._visibleConditionsBehavior = 'preserve';

    sinon.stub(Condition, 'shouldElementBeVisible').returns(false);

    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };

    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(true);

    Condition.shouldElementBeVisible.restore();
  });

  it.skip('should return false when a conditionally hidden field with "clear" has a matching value', () => {
    const element = record.form.get('ae75');

    sinon.stub(Condition, 'shouldElementBeVisible').returns(false);

    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };
console.log("Element", element);
console.log("Attributes", attributes);
console.log("Record", record);
    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});
console.log("RESULT", result)
    result.should.eql(false);

    Condition.shouldElementBeVisible.restore();
  });
});
