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

export default function setup(callback) {
  let form = null;
  let formJson = null;

  let record = null;
  let recordJson = null;

  formJson = JSON.parse(fs.readFileSync('./test/fixtures/forms/18300cfb-20e3-4e8b-9aef-878636b09ac4.json')).form;
  recordJson = JSON.parse(fs.readFileSync('./test/record.json')).record;

  form = new Form(formJson);

  form.load(dataSource, () => {
    record = new Record(recordJson);

    record._form = form;
    record._formValuesJSON = recordJson.form_values;

    callback(record);
  });
}
