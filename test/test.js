import fs from 'fs';
import path from 'path';
import {Form, FormValue, Record} from '../src';
import FeatureValidator from '../src/validation/feature-validator';
import RequiredFieldValidationError from '../src/validation/required-field-validation-error';
import CustomValidationError from '../src/validation/custom-validation-error';
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
let simpleJson = null;

beforeEach((done) => {
  formJson = JSON.parse(fs.readFileSync('./test/fixtures/forms/18300cfb-20e3-4e8b-9aef-878636b09ac4.json')).form;
  recordJson = JSON.parse(fs.readFileSync('./test/record.json')).record;
  simpleJson = JSON.parse(fs.readFileSync('./test/fixtures/records/simple-format.json'));

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

  it('produces simple JSON', () => {
    record.toJSON({simple: true}).should.eql(simpleJson);
  });
});

describe('Form', () => {
  it('parses project_enabled', () => {
    form.isProjectEnabled.should.eql(true);
  });

  it('parses assignment_enabled', () => {
    form.isAssignmentEnabled.should.eql(true);
  });

  it('parses auto_assign', () => {
    form.isAutoAssign.should.eql(true);
  });

  it('parses field effects', () => {
    form.fieldEffects.should.eql({
      effects: [
        {
          event: { name: 'change', field: 'single_choice' },
          conditions: [{ field: 'single_choice', operator: 'equals', value: 'Important' }],
          actions: [{ type: 'setvalue', field: 'name', value: 'Important Name' }]
        }
      ]
    });

  });
});

describe('FeatureValidator', () => {
  it('validates the presence of a status if status is enabled', () => {
    record.status = null;

    const [ error ] = FeatureValidator.validateRecord(record, record.formValues);

    error.should.be.instanceOf(RequiredFieldValidationError);
    error.message.should.eql("The field 'Record Status' is required.");
  });

  it('validates that the status value is valid', () => {
    record.status = 'fail';

    const [ error ] = FeatureValidator.validateRecord(record, record.formValues);

    error.should.be.instanceOf(CustomValidationError);
    error.message.should.eql('fail is not a valid status.');
  });

  it('validates a required checkbox is checked', () => {
    const checkboxElement = record.formValues.find('checkbox_field').element;
    record.formValues.set(checkboxElement.key, FormValue.create(checkboxElement, false));

    const [ error ] = FeatureValidator.validateRecord(record, record.formValues);

    error.should.be.instanceOf(RequiredFieldValidationError);
    error.message.should.eql("The field 'Checkbox Field' is required.");
  });
});
