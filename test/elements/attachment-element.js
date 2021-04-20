import setup from '../helper';

import { AttachmentElement, AttachmentValue } from '../../src';

let record = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    done();
  });
});

describe('attachment fields', () => {
  it('finds an attachment field in the form', () => {
    record.form.find('attachments').should.be.instanceof(AttachmentElement);
  });

  it('finds an attachment value in the record', () => {
    const value = record.formValues.find('attachments');

    value.should.be.instanceof(AttachmentValue);

    value.isEmpty.should.eql(false);

    value.displayValue.should.eql('2 Attachments');

    value.searchableValue.should.eql('attachment caption a different attachment caption');

    value.toJSON().should.eql([ 
      {
         'attachment_id': '2b1fa188-39f6-4540-8bcd-9c6641e7749b',
         'caption': 'attachment caption'
      },
      {   
        'caption': 'a different attachment caption',
        'attachment_id': '2b1fa188-39f6-4540-8bcd-9c6641e7742c'
      }
    ]);

    value.length.should.eql(2);

    value.columnValue.should.eql({
      'f0d81': [
        '2b1fa188-39f6-4540-8bcd-9c6641e7749b',
        '2b1fa188-39f6-4540-8bcd-9c6641e7742c'
      ], 
      'f0d81_captions': [
        'attachment caption',
        'a different attachment caption'
      ]
    });
  });
});
