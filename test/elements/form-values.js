import setup from '../helper';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('formValues', () => {
  it('supports deep copy of form values', () => {
    const copy = record.formValues.copy();

    copy.toJSON().should.eql(record.formValues.toJSON());
  });

  it('supports deep copy of form values even when there is a unknown value in the record', () => {
    const childField = record.form.find('room_number');

    // add a value for a child repeatable into the values, it's technically invalid at this level
    // but a copy operation should still preserve it.
    record.formValues.set(
      childField.key,
      record.formValues.createValue(childField, 'hello')
    );

    const copy = record.formValues.copy();

    copy.toJSON().should.eql(record.formValues.toJSON());
  });

  it('should not clear out conditionally visible items', () => {
    const { formValues } = record;
    const formValue = formValues.find('yesnona');

    formValue.textValue.should.eql('no');

    formValues.clearInvisibleValues(formValues, record);

    formValue.textValue.should.eql('no');
  });

  it('should clear out conditionally invisible items', () => {
    const { formValues } = record;
    const formValue = formValues.find('yesno');

    // `yesnona` is only visible if `yesno` === 'yes'. Setting it to 'no' should
    // make the other yes/no field invisible.
    formValue.textValue = 'no';

    formValues.find('yesnona').isEmpty.should.eql(false);

    formValues.clearInvisibleValues(formValues, record);

    formValues.find('yesnona').isEmpty.should.eql(true);
  });

  it('should not clear out conditionally invisible items if the behavior is set to preserve values', () => {
    const { formValues } = record;
    const formValue = formValues.find('yesno');

    formValues.find('yesnona').element._visibleConditionsBehavior = 'preserve';

    // `yesnona` is only visible if `yesno` === 'yes'. Setting it to 'no' should
    // make the other yes/no field invisible, but the rule is set to preserve the value.
    formValue.textValue = 'no';

    formValues.find('yesnona').textValue.should.eql('no');

    formValues.clearInvisibleValues(formValues, record);

    formValues.find('yesnona').textValue.should.eql('no');
  });
});
