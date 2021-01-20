import setup from '../helper';

import { SignatureValue } from '../../src';

let record = null;
let signatureValue = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    signatureValue = record.formValues.find('signature');
    done();
  });
});

describe('SignatureValue', () => {
  describe('id', () => {
    it('returns the id', () => {
      signatureValue.id.should.eql('24fa474e-311f-4b72-9617-7a3ed0c4c8a7');
    });
  });

  describe('isEmpty', () => {
    it('is true when the id is not set', () => {
      signatureValue = new SignatureValue('element', {});
      signatureValue.isEmpty.should.eql(true);
    });

    it('is false when the id is set', () => {
      signatureValue.isEmpty.should.eql(false);
    });
  });

  describe('searchableValue', () => {
    it('returns null', () => {
      shouldBeNull(signatureValue.searchableValue);
    });
  });

  describe('length', () => {
    it('returns the number of items', () => {
      signatureValue.length.should.eql(1);
    });
  });

  describe('format', () => {
    let options = null;
    beforeEach(() => {
      options = {
        part: null,
        formatSignatureURL: () => 'https://formatted.media/url',
        formatSignatureViewerURL: () => 'https://formatted.media.viewer/url',
        formatSignatureName: () => 'formatted-media-name',
        args: 'args'
      };
    });

    describe('when id is not set', () => {
      it('returns null', () => {
        signatureValue = new SignatureValue('element', {});
        shouldBeNull(signatureValue.format({}));
      });
    });

    describe('when part is null', () => {
      it('return the id', () => {
        signatureValue.format({}).should.eql('24fa474e-311f-4b72-9617-7a3ed0c4c8a7');
      });
    });

    describe('when part is view', () => {
      it('returns a viewer url', () => {
        options.part = 'view';
        signatureValue.format(options).should.eql('https://formatted.media.viewer/url');
      });
    });

    describe('when part is url', () => {
      it('returns a url', () => {
        options.part = 'url';
        signatureValue.format(options).should.eql('https://formatted.media/url');
      });
    });

    describe('when part is name', () => {
      it('returns a name', () => {
        options.part = 'name';
        signatureValue.format(options).should.eql('formatted-media-name');
      });
    });
  });
});
