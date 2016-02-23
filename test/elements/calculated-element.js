import setup from '../helper';
import DisplayOptions from '../../src/elements/display-options';

import { CalculatedElement, CalculatedValue } from '../../src';

let record = null;

beforeEach((done) => {
  ({ record } = setup());

  done();
});

describe('calculated fields', () => {
  it('finds an calculated field in the form', () => {
    record.form.find('text_calculation').should.be.instanceof(CalculatedElement);
  });

  it('supports the calculation attributes', () => {
    record.form.find('text_calculation').expression.should.eql("'text value'");
    record.form.find('text_calculation').display.should.be.instanceof(DisplayOptions);

    record.form.find('text_calculation').display.isText.should.eql(true);
    record.form.find('date_calculation').display.isDate.should.eql(true);
    record.form.find('number_calculation').display.isNumber.should.eql(true);
    record.form.find('currency_calculation').display.isCurrency.should.eql(true);
  });

  it('finds a text calculation value in the record', () => {
    const value = record.formValues.find('text_calculation');

    value.should.be.instanceof(CalculatedValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('text value');

    value.searchableValue.should.eql('text value');

    value.toJSON().should.eql('text value');

    value.columnValue.should.eql('text value');
  });

  it('finds a date calculation value in the record', () => {
    const value = record.formValues.find('date_calculation');

    value.should.be.instanceof(CalculatedValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('December 31, 1969');

    value.searchableValue.should.eql('1969-12-31');

    value.toJSON().should.eql('1969-12-31');

    value.columnValue.should.eql(-86400000);
  });

  it('finds a numeric calculation value in the record', () => {
    const value = record.formValues.find('number_calculation');

    value.should.be.instanceof(CalculatedValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('1337');

    value.searchableValue.should.eql('1337');

    value.toJSON().should.eql('1337');

    value.columnValue.should.eql(1337);
  });

  it('finds a currency calculation value in the record', () => {
    const value = record.formValues.find('currency_calculation');

    value.should.be.instanceof(CalculatedValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('$1,337.37');

    value.searchableValue.should.eql('1337.37');

    value.toJSON().should.eql('1337.37');

    value.columnValue.should.eql(1337.37);
  });
});

