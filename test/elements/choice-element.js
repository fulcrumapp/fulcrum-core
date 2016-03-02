import setup from '../helper';

import { ChoiceElement, ChoiceValue, Choice } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('choice fields', () => {
  it('finds a choice field in the form', () => {
    record.form.find('single_choice').should.be.instanceof(ChoiceElement);
  });

  it('supports the choice field attributes', () => {
    const field = record.form.find('single_choice');

    field.multiple.should.eql(false);
    field.choices[0].should.be.instanceof(Choice);
  });

  it('supports overriding the choices', () => {
    const field = record.form.find('single_choice');

    field.overrideChoices = [ { label: 'red' },
                              { label: 'green' },
                              { label: 'blue' }];

    field.choices[0].label.should.eql('red');
    field.choices[1].label.should.eql('green');
    field.choices[2].label.should.eql('blue');

    field.overrideChoices = null;

    field.choices[0].label.should.eql('Safety Critical');
  });

  it('supports filtering the choices', () => {
    const field = record.form.find('single_choice');

    field.choices.length.should.eql(4);

    field.choiceFilter = ['crit'];

    field.choices.length.should.eql(3);

    field.choiceFilter = ['important'];

    field.choices.length.should.eql(1);

    field.choiceFilter = null;

    field.choices.length.should.eql(4);
  });

  it('finds a single choice value in the record', () => {
    const value = record.formValues.find('single_choice');

    value.should.be.instanceof(ChoiceValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('Operations Critical');

    value.searchableValue.should.eql('Operations Critical operations_critical');

    value.toJSON().should.eql({ choice_values: [ 'operations_critical' ], other_values: [] });

    value.length.should.eql(1);

    value.columnValue.should.eql('operations_critical');

    value.hasOtherValue.should.eql(false);

    value.selectedValues.should.eql([ 'operations_critical' ]);

    value.otherValues.should.eql([]);

    shouldBeNull(value.otherValue);
  });

  it('changes the value of a single choice field', () => {
    const value = record.formValues.find('single_choice');

    value.selectedValues.should.eql([ 'operations_critical' ]);

    value.selectedValues = [ 'safety_critical' ];

    value.selectedValues.should.eql([ 'safety_critical' ]);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('Safety Critical');

    value.searchableValue.should.eql('Safety Critical safety_critical');

    value.toJSON().should.eql({ choice_values: [ 'safety_critical' ], other_values: [] });

    value.length.should.eql(1);

    value.columnValue.should.eql('safety_critical');

    value.hasOtherValue.should.eql(false);

    value.otherValues.should.eql([]);

    shouldBeNull(value.otherValue);

    // clear the value
    value.selectedValues = null;

    value.selectedValues.should.eql([]);

    value.isEmpty.should.eql(true);

    value.displayValue.should.eql('');

    value.searchableValue.should.eql('');

    shouldBeNull(value.toJSON());

    value.length.should.eql(0);

    shouldBeNull(value.columnValue);

    value.hasOtherValue.should.eql(false);

    value.otherValues.should.eql([]);

    shouldBeNull(value.otherValue);
  });

  it('finds a multiple choice value in the record', () => {
    const value = record.formValues.find('multiple_choice');

    value.should.be.instanceof(ChoiceValue);

    value.element.multiple.should.eql(true);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('24 Amp Hour, 38 Amp Hour, Another');

    value.searchableValue.should.eql('24 Amp Hour 24 38 Amp Hour 38 Another');

    value.toJSON().should.eql({ choice_values: [ '24', '38' ], other_values: [ 'Another' ] });

    value.length.should.eql(3);

    value.columnValue.should.eql('\t24\t38\tAnother\t');

    value.hasOtherValue.should.eql(true);

    value.selectedValues.should.eql([ '24', '38' ]);

    value.otherValues.should.eql(['Another']);

    value.otherValue.should.eql('Another');
  });
});
