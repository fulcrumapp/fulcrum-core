import setup from '../helper';
import fuzz from '../fuzz';

import { LocationElement, LocationValue, } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('location element field', () => {
  it('finds a location element field in the form', () => {
    const field = record.form.find('location');

    field.should.be.instanceof(LocationElement);
  });

  it('finds a location element value in the record', () => {
    const value = record.formValues.find('location');

    value.should.be.instanceof(LocationValue);

    value.latitude.should.eql(1.2)
  });

  it('changes a location field value', () => {
    const value = record.formValues.find('location');
    value.latitude = 1.3
    value.longitude = -1.3
    value.address = "New Address"

    value.latitude.should.eql(1.3)
    value.longitude.should.eql(-1.3)
    value.address.should.eql("New Address")
  });
});
