import setup from '../helper';

import { Element } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('elements', () => {
  it('supports the basic attributes', () => {
    const element = record.form.get('ae75');

    element.should.be.instanceof(Element);
    element.key.should.eql('ae75');
    element.type.should.eql('TextField');
    element.label.should.eql('Name');
    element.dataName.should.eql('name');
    element.description.should.eql('Enter your name');
    element.defaultValue.should.eql('no name');
    element.isRequired.should.eql(true);
    element.isHidden.should.eql(false);
    element.isDisabled.should.eql(false);
    element.minLength.should.eql(1);
    element.maxLength.should.eql(30);
    element.hasMinLength.should.eql(true);
    element.hasMaxLength.should.eql(true);
    element.isLengthValidationSupported.should.eql(true);
    element.hasVisibilityConditions.should.eql(false);
    element.hasRequiredConditions.should.eql(false);
    element.hasHiddenParent.should.eql(false);
    element.isTextElement.should.eql(true);
  });
});
