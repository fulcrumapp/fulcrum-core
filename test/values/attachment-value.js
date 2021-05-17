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
      attachmentValue.searchableValue.should.eql('test_one.pdf test_two.pdf');
    });
  });

  describe('addItem', () => {
    it('adds an item', () => {
      attachmentValue.addItem('123', 'test_three.pdf');
      attachmentValue.items.length.should.eql(3);
      attachmentValue.items[2].toJSON().should.eql({ attachment_id: '123', name: 'test_three.pdf'});
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
        formatMediaName: (item, args) => item.name,
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

    describe('when part is name', () => {
      it('returns an array of names', () => {
        options.part = 'name';
        attachmentValue.format(options).should.eql([
          'test_one.pdf', 
          'test_two.pdf'
        ]);
      });
    });
  });
});

