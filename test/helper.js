import fs from 'fs';
import Fulcrum from '../src';

export default function setup() {
  const Form = Fulcrum.Form;
  const Record = Fulcrum.Record;

  let form = null;
  let formJson = null;

  let record = null;
  let recordJson = null;

  formJson = JSON.parse(fs.readFileSync('./test/form.json')).form;
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
