import setup from '../helper';

import { ClassificationElement, ClassificationValue, Classification } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('classification fields', () => {
  it('finds a classification field in the form', () => {
    record.form.find('os').should.be.instanceof(ClassificationElement);
  });

  it('supports the classification field attributes', () => {
    const field = record.form.find('os');

    field.classificationItems[0].should.be.instanceof(Classification);
    field.classificationItems[1].items[0].should.be.instanceof(Classification);
  });

  it('supports overriding the choices', () => {
    const field = record.form.find('os');

    field.overrideClassificationItems = [ { label: 'No Color' },
                                          { label: 'Colors',
                                            child_classifications: [ { label: 'Red' },
                                                                     { label: 'Green' },
                                                                     { label: 'Blue' } ] },
                                          { label: 'Test' } ];

    // override the options on the fly
    field.classificationItems[1].items[0].should.be.instanceof(Classification);
    field.classificationItems[1].items[0].value.should.eql('Red');
    field.classificationItems[1].items[1].value.should.eql('Green');
    field.classificationItems[1].items[2].value.should.eql('Blue');

    // now bring the original items back
    field.overrideClassificationItems = null;

    field.classificationItems[1].items[0].value.should.eql('Server');
    field.classificationItems[2].items[0].value.should.eql('Ubuntu');
  });

  it('supports filtering the choices', () => {
    const field = record.form.find('os');

    // should be unfiltered
    field.classificationItems[0].value.should.eql('Unknown');

    // filter by 'windows'
    field.classificationFilter = ['windows'];
    field.classificationItems[0].value.should.eql('Windows');

    // filter by 'linux'
    field.classificationFilter = ['linux'];
    field.classificationItems[0].value.should.eql('Linux');

    // back to unfiltered
    field.classificationFilter = null;
    field.classificationItems[0].value.should.eql('Unknown');
  });

  it('supports creating a value from null', () => {
    const value = new ClassificationValue(record.form.find('os'));

    value.should.be.instanceof(ClassificationValue);
    value.isEmpty.should.eql(true);
  });

  it('finds a single choice value in the record', () => {
    const value = record.formValues.find('os');

    value.should.be.instanceof(ClassificationValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('Linux ▸ Ubuntu ▸ 11.1');

    value.searchableValue.should.eql('Linux Ubuntu 11.1');

    value.toJSON().should.eql({ choice_values: [ 'Linux', 'Ubuntu', '11.1' ], other_values: [] });

    value.length.should.eql(3);

    value.columnValue.should.eql(['Linux', 'Ubuntu', '11.1']);

    value.hasOtherValue.should.eql(false);

    value.selectedClassification.value.should.eql('11.1');

    shouldBeNull(value.otherValue);
  });

  it('changes the value of a classification field', () => {
    const value = record.formValues.find('os');

    value.displayValue.should.eql('Linux ▸ Ubuntu ▸ 11.1');

    const newItem = value.element.classificationItems[1].items[0].items[0];

    value.setSelectedClassification(newItem);

    value.displayValue.should.eql('Windows ▸ Server ▸ 2000');

    value.selectedClassification.toJSON().should.eql([ 'Windows', 'Server', '2000' ]);

    value.isEmpty.should.eql(false);

    value.searchableValue.should.eql('Windows Server 2000');

    value.toJSON().should.eql({ choice_values: [ 'Windows', 'Server', '2000' ], other_values: [] });

    value.length.should.eql(3);

    value.columnValue.should.eql(['Windows', 'Server', '2000']);

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
    const anotherItem = value.element.classificationItems[1].items[0];

    value.setSelectedClassification(anotherItem, '2015');

    value.displayValue.should.eql('Windows ▸ Server ▸ 2015');

    value.selectedClassification.toJSON().should.eql([ 'Windows', 'Server' ]);

    value.isEmpty.should.eql(false);

    value.searchableValue.should.eql('Windows Server 2015');

    value.toJSON().should.eql({ choice_values: [ 'Windows', 'Server' ], other_values: [ '2015' ] });

    value.length.should.eql(3);

    value.columnValue.should.eql(['Windows', 'Server', '2015']);

    value.hasOtherValue.should.eql(true);

    value.otherValue.should.eql('2015');
  });
});
