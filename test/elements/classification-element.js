import setup from '../helper';

const { ClassificationElement, ClassificationValue, Classification } = setup();

let record = null;

beforeEach((done) => {
  ({ record } = setup());

  done();
});

describe('choice fields', () => {
  it('finds a classification field in the form', () => {
    record.form.find('os').should.be.instanceof(ClassificationElement);
  });

  it('supports the classification field attributes', () => {
    const field = record.form.find('os');

    field.classificationItems[0].should.be.instanceof(Classification);
    field.classificationItems[1].children[0].should.be.instanceof(Classification);
  });

  // it('supports overriding the choices', () => {
  //   const field = record.form.find('single_choice');

  //   field.overrideChoices = [ { label: 'red' },
  //                             { label: 'green' },
  //                             { label: 'blue' }];

  //   field.choices[0].label.should.eql('red');
  //   field.choices[1].label.should.eql('green');
  //   field.choices[2].label.should.eql('blue');

  //   field.overrideChoices = null;

  //   field.choices[0].label.should.eql('Safety Critical');
  // });

  // it('supports filtering the choices', () => {
  //   const field = record.form.find('single_choice');

  //   field.choices.length.should.eql(4);

  //   field.choiceFilter = ['crit'];

  //   field.choices.length.should.eql(3);

  //   field.choiceFilter = ['important'];

  //   field.choices.length.should.eql(1);

  //   field.choiceFilter = null;

  //   field.choices.length.should.eql(4);
  // });

  it('finds a single choice value in the record', () => {
    const value = record.formValues.find('os');

    value.should.be.instanceof(ClassificationValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('Linux ▸ Ubuntu ▸ 11.1');

    value.searchableValue.should.eql('Linux Linux Ubuntu Ubuntu 11.1 11.1');

    value.toJSON().should.eql({ choice_values: [ 'Linux', 'Ubuntu', '11.1' ], other_values: [] });

    value.length.should.eql(3);

    value.columnValue.should.eql('Linux\tUbuntu\t11.1');

    value.hasOtherValue.should.eql(false);

    value.selectedClassification.value.should.eql('11.1');

    shouldBeNull(value.otherValue);
  });

  it('changes the value of a classification field', () => {
    const value = record.formValues.find('os');

    value.displayValue.should.eql('Linux ▸ Ubuntu ▸ 11.1');

    const newItem = value.element.classificationItems[1].children[0].children[0];

    value.setSelectedClassification(newItem);

    value.displayValue.should.eql('Windows ▸ Server ▸ 2000');

    value.selectedClassification.toJSON().should.eql([ 'Windows', 'Server', '2000' ]);

    value.isEmpty.should.eql(false);

    value.searchableValue.should.eql('Windows Windows Server Server 2000 2000');

    value.toJSON().should.eql({ choice_values: [ 'Windows', 'Server', '2000' ], other_values: [] });

    value.length.should.eql(3);

    value.columnValue.should.eql('Windows\tServer\t2000');

    value.hasOtherValue.should.eql(false);

    shouldBeNull(value.otherValue);

    // clear the value
    value.setSelectedClassification(null);

    shouldBeNull(value.selectedClassification);

    value.isEmpty.should.eql(true);

    value.displayValue.should.eql('');

    value.searchableValue.should.eql('');

    shouldBeNull(value.toJSON());

    value.length.should.eql(0);

    shouldBeNull(value.columnValue);

    value.hasOtherValue.should.eql(false);

    shouldBeNull(value.otherValue);

    // set an other value
    const anotherItem = value.element.classificationItems[1].children[0];

    value.setSelectedClassification(anotherItem, '2015');

    value.displayValue.should.eql('Windows ▸ Server ▸ 2015');

    value.selectedClassification.toJSON().should.eql([ 'Windows', 'Server' ]);

    value.isEmpty.should.eql(false);

    value.searchableValue.should.eql('Windows Windows Server Server 2015');

    value.toJSON().should.eql({ choice_values: [ 'Windows', 'Server' ], other_values: [ '2015' ] });

    value.length.should.eql(3);

    value.columnValue.should.eql('Windows\tServer\t2015');

    value.hasOtherValue.should.eql(true);

    value.otherValue.should.eql('2015');
  });
});
