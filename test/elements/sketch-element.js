import setup from '../helper';

import { SketchElement, SketchValue } from '../../src';
import LengthValidationError from '../../src/validation/length-validation-error';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('SketchElement', () => {
  it('finds a sketch element field in the form', () => {
    const field = record.form.find('sketch');
    field.should.be.instanceof(SketchElement);
  });
});

describe('dynamic elements fields', () => {
  it('finds a sketch elements value in the record', () => {
    const value = record.formValues.find('sketch');

    value.should.be.instanceof(SketchValue);

    value.isEmpty.should.eql(false);
  });
});

describe('SketchElement length validation', () => {
  let field;

  beforeEach(() => {
    field = record.form.find('sketch');
  });

  it('returns an at-least message when minLength is set', () => {
    field._minLength = 5;
    field._maxLength = null;
    const error = new LengthValidationError(field);
    error.message.should.eql("The field 'Sketch' must have at least 5 sketches.");
  });

  it('returns a singular at-least message when minLength is 1', () => {
    field._minLength = 1;
    field._maxLength = null;
    const error = new LengthValidationError(field);
    error.message.should.eql("The field 'Sketch' must have at least 1 sketch.");
  });

  it('returns an at-most message when maxLength is set', () => {
    field._minLength = null;
    field._maxLength = 5;
    const error = new LengthValidationError(field);
    error.message.should.eql("The field 'Sketch' cannot have more than 5 sketches.");
  });

  it('returns a singular at-most message when maxLength is 1', () => {
    field._minLength = null;
    field._maxLength = 1;
    const error = new LengthValidationError(field);
    error.message.should.eql("The field 'Sketch' cannot have more than 1 sketch.");
  });

  it('returns a between message when both min and max length are set', () => {
    field._minLength = 2;
    field._maxLength = 5;
    const error = new LengthValidationError(field);
    error.message.should.eql("The field 'Sketch' must have between 2 and 5 sketches.");
  });

  it('returns an exactly message when min and max length are equal', () => {
    field._minLength = 3;
    field._maxLength = 3;
    const error = new LengthValidationError(field);
    error.message.should.eql("The field 'Sketch' must have exactly 3 sketches.");
  });

  it('returns a singular exactly message when min and max are 1', () => {
    field._minLength = 1;
    field._maxLength = 1;
    const error = new LengthValidationError(field);
    error.message.should.eql("The field 'Sketch' must have exactly 1 sketch.");
  });
});