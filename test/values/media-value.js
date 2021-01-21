import setup from '../helper';

import { MediaValue } from '../../src';

let record = null;
let mediaValue = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    mediaValue = record.formValues.find('photos');
    done();
  });
});

describe('MediaValue', () => {
  describe('isEmpty', () => {
    it('is true when there are no items', () => {
      mediaValue = new MediaValue('element', []);
      mediaValue.isEmpty.should.eql(true);
    });

    it('is false when there are items', () => {
      mediaValue.isEmpty.should.eql(false);
    });
  });

  describe('searchableValue', () => {
    it('returns a string of the media captions', () => {
      mediaValue.searchableValue.should.eql('photo caption');
    });
  });

  describe('length', () => {
    it('returns the number of items', () => {
      mediaValue.length.should.eql(1);
    });
  });

  describe('format', () => {
    let options = null;
    beforeEach(() => {
      options = {
        part: null,
        formatMediaURL: () => 'https://formatted.media/url',
        formatMediaViewerURL: () => 'https://formatted.media.viewer/url',
        formatMediaName: () => 'formatted-media-name',
        args: 'args'
      };
    });

    describe('when empty', () => {
      it('returns null', () => {
        mediaValue = new MediaValue('element', []);
        shouldBeNull(mediaValue.format({}));
      });
    });

    describe('when part is null', () => {
      it('returns an array of ids', () => {
        mediaValue.format({}).should.eql(['2b1fa188-39f6-4540-8bcd-9c6641e7748a']);
      });
    });

    describe('when part is captions', () => {
      it('returns an array of captions', () => {
        options.part = 'captions';
        mediaValue.format(options).should.eql(['photo caption']);
      });
    });

    describe('when part is view', () => {
      it('returns a media viewer url', () => {
        options.part = 'view';
        mediaValue.format(options).should.eql('https://formatted.media.viewer/url');
      });
    });

    describe('when part is urls', () => {
      it('returns an array of media urls', () => {
        options.part = 'urls';
        mediaValue.format(options).should.eql(['https://formatted.media/url']);
      });
    });

    describe('when part is name', () => {
      it('returns an array of media names', () => {
        options.part = 'name';
        mediaValue.format(options).should.eql(['formatted-media-name']);
      });
    });
  });
});
