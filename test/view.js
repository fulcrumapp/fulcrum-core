// import setup from './helper';
import assert from 'assert';
import fs from 'fs';

import { View } from '../src';

const viewJSON = JSON.parse(fs.readFileSync('./test/fixtures/view.json').toString()).view;
const view = new View(viewJSON);

describe('View', () => {
  it('has a name', () => {
    view.name.should.eql('Created in the last 30 days');
  });

  it('has a created date', () => {
    assert.equal(view.createdAt.getMonth(), 9);
  });

  it('has an ID', () => {
    view.id.should.eql('73d51a92-707a-4dfb-8f80-502073fd7c10');
  });

  it('has a query form ID', () => {
    assert.equal(view.queries[0].form_id, 'd025cda2-efff-4874-9bec-48d1ffd8a40b');
  });

  it('has an expression', () => {
    const filter = view.queries[0].filter;
    assert.equal(filter.type, 'and');
    assert.equal(filter.expressions[0].field, '_server_created_at');
    assert.equal(filter.expressions[0].operator, 'date_last_30_days');
    assert.equal(filter.expressions[0].value.length, 0);
  });
});
