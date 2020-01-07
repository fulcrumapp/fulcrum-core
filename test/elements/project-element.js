import setup from '../helper';

import { ProjectElement } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('project fields', () => {
  it('finds a project field in the form', () => {
    record.form.projectField.should.be.instanceof(ProjectElement);
  });
});
