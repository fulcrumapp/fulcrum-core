import fs from 'fs';
import path from 'path';
import {Form, Record, User} from '../src';
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

let user = null;
let userJson = null;

beforeEach((done) => {
  formJson = JSON.parse(fs.readFileSync('./test/fixtures/forms/18300cfb-20e3-4e8b-9aef-878636b09ac4.json')).form;
  recordJson = JSON.parse(fs.readFileSync('./test/record.json')).record;
  userJson = JSON.parse(fs.readFileSync('./test/user.json'));

  form = new Form(formJson);

  form.load(dataSource, () => {
    record = new Record(recordJson, form);

    record._formValuesJSON = recordJson.form_values;

    done();
  });

  user = new User(userJson);
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

  it('parses record_count', () => {
    form.recordCount.should.eql(1);
  });
});

describe('User', () => {
  it('parses images', () => {
    user.imageSmall.should.eql('https://fulcrumapp.s3.amazonaws.com/user-images/small_4f1efa091441405373000445-a8ddba97-80d8-4ed6-ba31-82ca1d541a8d.jpg');
    user.imageLarge.should.eql('https://fulcrumapp.s3.amazonaws.com/user-images/large_4f1efa091441405373000445-a8ddba97-80d8-4ed6-ba31-82ca1d541a8d.jpg');
  });
});
