import fs from 'fs';
import path from 'path';
import {Form, Record} from '../src';
import DataSource from '../src/data-source';
import MemoryDataSource from '../src/utils/memory-data-source';
import FileDataSource from '../src/utils/file-data-source';

const fileRoot = path.join('.', 'test', 'fixtures');

const dataSource = new DataSource();

dataSource.add(new MemoryDataSource())
          .add(new FileDataSource(fileRoot));

let form = null;
let formJson = null;

let record = null;
let recordJson = null;

beforeEach((done) => {
  formJson = JSON.parse(fs.readFileSync('./test/fixtures/forms/18300cfb-20e3-4e8b-9aef-878636b09ac4.json')).form;
  recordJson = JSON.parse(fs.readFileSync('./test/record.json')).record;

  form = new Form(formJson);

  form.load(dataSource, () => {
    record = new Record(recordJson, form);

    record._formValuesJSON = recordJson.form_values;

    done();
  });
});

describe('Record', () => {
  it('parses a record', () => {
    record.should.be.instanceof(Record);
  });

  it('parses a yes/no value', () => {
    record.formValues.get('01ed').textValue.should.eql('no');
  });

  it('parses a date value', () => {
    record.formValues.get('8fd4').textValue.should.eql('2015-12-02');
  });
});

describe('Form', () => {
  it('parses project_enabled', () => {
    form.isProjectEnabled.should.eql(false);
  });

  it('parses assignment_enabled', () => {
    form.isAssignmentEnabled.should.eql(true);
  });

  it('parses auto_assign', () => {
    form.isAutoAssign.should.eql(true);
  });
});
