import setup from '../helper';

import { ButtonElement, } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('button element field', () => {
  it('finds a button element field in the form', () => {
    const field = record.form.find('button');

    field.should.be.instanceof(ButtonElement);
  });
});
