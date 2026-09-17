import {Form} from '../../src';

function createPhotoElement(fastfillSettings) {
  const attributes = {
    type: 'PhotoField',
    key: 'photo-key',
    label: 'Photos',
    data_name: 'photos'
  };

  if (fastfillSettings !== undefined) {
    attributes.fastfill_settings = fastfillSettings;
  }

  const form = new Form({elements: [attributes]});

  return {
    element: form.elements[0],
    form
  };
}

describe('PhotoElement', () => {
  it('returns the complete FastFill settings object for supported modes', () => {
    for (const type of ['off', 'text_extraction', 'generic']) {
      const {element} = createPhotoElement({
        type,
        target_fields: ['a1b2', 'c3d4']
      });

      element.getFastfillSettings().should.eql({
        type,
        target_fields: ['a1b2', 'c3d4']
      });
    }
  });

  it('returns a defensive copy from getFastfillSettings', () => {
    const input = {
      type: 'generic',
      target_fields: ['a1b2']
    };
    const {element} = createPhotoElement(input);

    const settings = element.getFastfillSettings();
    settings.type = 'off';
    settings.target_fields.push('c3d4');

    element.getFastfillSettings().should.eql({
      type: 'generic',
      target_fields: ['a1b2']
    });
    input.should.eql({
      type: 'generic',
      target_fields: ['a1b2']
    });
  });

  it('returns undefined for missing, null, and invalid settings', () => {
    const invalidSettings = [
      undefined,
      null,
      'invalid',
      {type: 'unsupported', target_fields: []},
      {type: 'generic'},
      {type: 'generic', target_fields: 'a1b2'},
      {type: 'generic', target_fields: ['']}
    ];

    for (const settings of invalidSettings) {
      const {element} = createPhotoElement(settings);
      shouldBeUndefined(element.getFastfillSettings());
    }
  });

  it('preserves valid target fields without imposing a cardinality limit', () => {
    const targetFields = Array.from({length: 101}, (_, index) => `field-${index}`);
    const {element} = createPhotoElement({
      type: 'generic',
      target_fields: targetFields
    });

    element.getFastfillSettings().target_fields.should.eql(targetFields);
  });

  it('serializes only the canonical FastFill settings shape', () => {
    const {element} = createPhotoElement({
      type: 'text_extraction',
      target_fields: ['a1b2'],
      enabled: true,
      prompt: 'ignored'
    });

    element.toJSON().fastfill_settings.should.eql({
      type: 'text_extraction',
      target_fields: ['a1b2']
    });
  });

  it('omits invalid FastFill settings from element serialization', () => {
    const {element} = createPhotoElement({
      type: 'generic',
      target_fields: ['']
    });

    shouldBeUndefined(element.toJSON().fastfill_settings);
  });

});
