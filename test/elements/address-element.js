import setup from '../helper';

import { AddressElement, AddressValue } from '../../src';

let record = null;

beforeEach((done) => {
  ({ record } = setup());

  done();
});

describe('address fields', () => {
  it('finds an address field in the form', () => {
    record.form.find('address').should.be.instanceof(AddressElement);
  });

  it('supports the autoPopulate attribute', () => {
    record.form.find('address').autoPopulate.should.eql(true);
  });

  it('finds a date value in the record by key', () => {
    const value = record.formValues.find('address');

    value.should.be.instanceof(AddressValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('4261 55th Ave N\nSaint Petersburg FL 33714\nUS');

    value.searchableValue.should.eql('4261 55th Ave N Saint Petersburg FL 33714 US');

    value.address.lines.should.eql([ '4261 55th Ave N',
                                     'Saint Petersburg FL 33714',
                                     'US' ]);

    value.address.line1.should.eql('4261 55th Ave N');
    value.address.line2.should.eql('Saint Petersburg FL 33714');
    value.address.line3.should.eql('US');

    value.toJSON().should.eql({
      sub_thoroughfare: '4261',
      thoroughfare: '55th Ave N',
      suite: null,
      locality: 'Saint Petersburg',
      sub_admin_area: 'Pinellas',
      admin_area: 'FL',
      postal_code: '33714',
      country: 'US'
    });
  });
});
