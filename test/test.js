import fs from 'fs';
import chai from 'chai';
import Fulcrum from '../src';

chai.should();

const Form = Fulcrum.Form;
const Record = Fulcrum.Record;

let form = null;
let formJson = null;

let record = null;
let recordJson = null;

beforeEach((done) => {
  formJson = JSON.parse(fs.readFileSync('./test/form.json')).form;
  recordJson = JSON.parse(fs.readFileSync('./test/record.json')).record;

  form = new Form(formJson);
  record = new Record(form, recordJson);

  done();
});

describe('Record', () => {
  it('parses a record', () => {
    record.should.be.instanceof(Record);
  });

  it('parses a yes/no value', () => {
    record.formValues.getFormValue('01ed').textValue.should.eql('no');
  });

  it('parses a date value', () => {
    record.formValues.getFormValue('8fd4').textValue.should.eql('2015-12-02');
  });
});
