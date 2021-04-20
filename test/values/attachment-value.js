import setup from '../helper';

import { AttachmentValue } from '../../src';

let record = null;
let attachmentValue = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    attachmentValue = record.formValues.find('attachments');
    done();
  });
});

describe('AttachmentValue', () => {
  describe('isEmpty', () => {
    it('is true when the id is not set', () => {
      attachmentValue = new AttachmentValue('element', {});
      attachmentValue.isEmpty.should.eql(true);
    });

    it('is false when the id is set', () => {
      attachmentValue.isEmpty.should.eql(false);
    });
  });

  describe('searchableValue', () => {
    it('returns a string of the media captions', () => {
      attachmentValue.searchableValue.should.eql('attachment caption a different attachment caption');
    });
  });

  describe('length', () => {
    it('returns the number of items', () => {
      attachmentValue.length.should.eql(2);
    });
  });

  describe('format', () => {
    let options = null;
    beforeEach(() => {
      options = {
        part: null,
        formatMediaURL: () => ['https://formatted.media/url', 'https://formatted.media/url'],
        formatMediaViewerURL: () => ['https://formatted.media.viewer/url', 'https://formatted.media.viewer/url'],
        formatMediaName: () => ['formatted-media-name', 'formatted-media-name'],
        args: 'args'
      };
    });

    describe('when id is not set', () => {
      it('returns null', () => {
        attachmentValue = new AttachmentValue('element', {});
        shouldBeNull(attachmentValue.format({}));
      });
    });

    describe('when part is null', () => {
      it('return the id', () => {
        attachmentValue.format({}).should.eql([
          '2b1fa188-39f6-4540-8bcd-9c6641e7749b', 
          '2b1fa188-39f6-4540-8bcd-9c6641e7742c'
        ]);
      });
    });

    describe('when part is view', () => {
      it('returns a viewer url', () => {
        options.part = 'view';
        attachmentValue.format(options).should.eql([
          'https://formatted.media.viewer/url',
          'https://formatted.media.viewer/url'
        ]);
      });
    });

    describe('when part is captions', () => {
      it('returns an array of captions', () => {
        options.part = 'captions';
        attachmentValue.format(options).should.eql([
          'attachment caption', 
          'a different attachment caption'
        ]);
      });
    });
  });
});

