import MediaElement from './media-element';

function parseFastfillSettings(settings) {
  if (settings == null || typeof settings !== 'object') {
    return undefined;
  }

  const prototype = Object.getPrototypeOf(settings);
  if (prototype !== Object.prototype && prototype !== null) {
    return undefined;
  }

  if (typeof settings.type !== 'string' ||
      !Array.isArray(settings.target_fields) ||
      settings.target_fields.some((targetField) => typeof targetField !== 'string' || targetField.length === 0)) {
    return undefined;
  }

  return {
    type: settings.type,
    target_fields: settings.target_fields.slice()
  };
}

export default class PhotoElement extends MediaElement {
  constructor(parent, attributes) {
    super(parent, attributes || {});

    this._fastfillSettings = parseFastfillSettings(attributes && attributes.fastfill_settings);
  }

  getFastfillSettings() {
    if (this._fastfillSettings === undefined) {
      return undefined;
    }

    return {
      type: this._fastfillSettings.type,
      target_fields: this._fastfillSettings.target_fields.slice()
    };
  }

  toJSON() {
    const json = super.toJSON();
    const fastfillSettings = this.getFastfillSettings();

    if (fastfillSettings !== undefined) {
      json.fastfill_settings = fastfillSettings;
    }

    return json;
  }
}
