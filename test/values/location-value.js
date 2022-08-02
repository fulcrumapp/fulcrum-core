import setup from '../helper';

import { LocationValue } from '../../src';

let record = null;
let locationValue = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    locationValue = record.formValues.find('location');
    done();
  });
});

describe('LocationValue', () => {
  describe('isEmpty', () => {
    it('is true when the properties are unset', () => {
      locationValue = new LocationValue('element', {});
      locationValue.isEmpty.should.eql(true);
    });

    it('is false when the properties are set', () => {
      locationValue.isEmpty.should.eql(false);
    });
  });

  describe('latitude', () => {
    it('returns the latitude', () => {
      locationValue.latitude.should.eql(1.2);
    });
  });

  describe('longitude', () => {
    it('returns the longitude', () => {
      locationValue.longitude.should.eql(-1.2);
    });
  });

  describe('address', () => {
    it('returns the address', () => {
      locationValue.address.should.eql("City Test");
    });
  });

  describe('toJSON', () => {
    it('returns the json object', () => {
      locationValue.toJSON().should.eql({ latitude: 1.2, longitude: -1.2, address: 'City Test' });
    });
  });
});
