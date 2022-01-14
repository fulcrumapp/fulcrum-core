import setup from '../helper';

import { DynamicValue } from '../../src';

let record = null;
let checklist = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    checklist = record.formValues.find('checklist');
    done();
  });
});

describe('DynamicValue', () => {
  describe('isEmpty', () => {
    it('is true when there are no items', () => {
      checklist = new DynamicValue('element', []);
      checklist.isEmpty.should.eql(true);
    });

    it('is false when there are items', () => {
      checklist.isEmpty.should.eql(false);
    });
  });

  // describe('searchableValue', () => {
  //   it('returns a string of the media captions', () => {
  //     mediaValue.searchableValue.should.eql('photo caption');
  //   });
  // });

  describe('length', () => {
    it('returns the number of items', () => {
      checklist.length.should.eql(1);
    });
  });

  describe('format', () => {
    let options = null;
    beforeEach(() => {
      options = {
        part: null,
        args: 'args'
      };
    });

    describe('when empty', () => {
      it('returns null', () => {
        checklist = new DynamicValue('element', []);
        shouldBeNull(checklist.format({}));
      });
    });

    // describe('when part is null', () => {
    //   it('returns an array of values', () => {
    //     checklist.format({}).should.eql(['2b1fa188-39f6-4540-8bcd-9c6641e7748a']);
    //   });
    // });

    // describe('when part is metadata', () => {
    //   it('returns an array of metadata', () => {
    //     options.part = 'metadata';

    //     const x = checklist.format(options);
    //     console.log(typeof x[0]);


    //     checklist.format(options).should.eql(['xxx']);
    //   });
    // });

  //   describe('when part is view', () => {
  //     it('returns a media viewer url', () => {
  //       options.part = 'view';
  //       mediaValue.format(options).should.eql('https://formatted.media.viewer/url');
  //     });
  //   });

  //   describe('when part is urls', () => {
  //     it('returns an array of media urls', () => {
  //       options.part = 'urls';
  //       mediaValue.format(options).should.eql(['https://formatted.media/url']);
  //     });
  //   });

  //   describe('when part is name', () => {
  //     it('returns an array of media names', () => {
  //       options.part = 'name';
  //       mediaValue.format(options).should.eql(['formatted-media-name']);
  //     });
  //   });
  });
});
