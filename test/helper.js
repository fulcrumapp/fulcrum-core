import fs from 'fs';
import path from 'path';
import Fulcrum from '../src';
import ElementFactory from '../src/elements/element-factory';
import FileProvider from '../src/utils/file-provider';

const fileRoot = path.join('.', 'test', 'fixtures');

ElementFactory.setProvider(new FileProvider(fileRoot));

export default function setup() {
  const Form = Fulcrum.Form;
  const Record = Fulcrum.Record;

  let form = null;
  let formJson = null;

  let record = null;
  let recordJson = null;

  formJson = JSON.parse(fs.readFileSync('./test/fixtures/forms/18300cfb-20e3-4e8b-9aef-878636b09ac4.json')).form;
  recordJson = JSON.parse(fs.readFileSync('./test/record.json')).record;

  form = new Form(formJson);
  record = new Record(form, recordJson);

  const result = { record: record };

  for (let prop in Fulcrum) {
    if (Fulcrum.hasOwnProperty(prop)) {
      result[prop] = Fulcrum[prop];
    }
  }

  return result;
}
