import setup from '../helper';

import { SketchElement, SketchValue } from '../../src';

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