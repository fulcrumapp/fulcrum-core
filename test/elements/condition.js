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

  it('should return false when a conditionally hidden field with "clear" has a matching value', () => {
    const element = record.form.get('ae75');

    sinon.stub(Condition, 'shouldElementBeVisibleRecursive').returns(false);

    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };

    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(false);

    Condition.shouldElementBeVisibleRecursive.restore();
  });

  it('should return true when a field inside a preserve section is conditionally hidden (inherited preserve)', () => {
    const element = record.form.get('ae75');

    // Parent section has visible_conditions_behavior: 'preserve'; field itself is 'clear' (default).
    // Before the fix, isPreserved on the field would return false because _visibleConditionsBehavior
    // is 'clear'. After the fix, isPreserved walks up and finds the parent, returning true.
    element._parent = { isPreserved: true };

    sinon.stub(Condition, 'shouldElementBeVisibleRecursive').returns(false);

    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };

    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(true);

    Condition.shouldElementBeVisibleRecursive.restore();
  });

  it('should return true when inner section has preserve and outer section has clear and is hidden (S7)', () => {
    const element = record.form.get('ae75');

    // Outer section has 'clear' with own conditions; inner section has 'preserve' (no own conditions).
    // The inner preserve wins: isPreserved returns true at the inner section level and the outer
    // section's clear behavior does not override it.
    element._parent = { isPreserved: true };

    sinon.stub(Condition, 'shouldElementBeVisibleRecursive').returns(false);

    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };

    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(true);

    Condition.shouldElementBeVisibleRecursive.restore();
  });

  it('should return true when grandparent section has preserve and inner section and field have clear (transitive inheritance)', () => {
    const element = record.form.get('ae75');

    // Two-level nesting: grandparent has preserve, inner section and field both have clear.
    // isPreserved walks up: field delegates to inner, inner delegates to grandparent, grandparent returns true.
    const grandparentSection = { isPreserved: true };
    const innerSection = {
      get isPreserved() { return grandparentSection.isPreserved; }
    };
    element._parent = innerSection;

    sinon.stub(Condition, 'shouldElementBeVisibleRecursive').returns(false);

    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };

    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(true);

    Condition.shouldElementBeVisibleRecursive.restore();
  });

  it('should return false when a field with no preserve ancestor is conditionally hidden', () => {
    const element = record.form.get('ae75');

    // Neither the field nor any ancestor has preserve. isPreserved returns false,
    // so the visibility check runs and the hidden field's value is treated as blank.
    sinon.stub(Condition, 'shouldElementBeVisibleRecursive').returns(false);

    const attributes = {
      field_key: 'ae75',
      operator: 'equal_to',
      value: 'Test'
    };

    const condition = new Condition(element, attributes);

    const result = condition.isSatisfied(record, record.formValues, {});

    result.should.eql(false);

    Condition.shouldElementBeVisibleRecursive.restore();
  });
});
