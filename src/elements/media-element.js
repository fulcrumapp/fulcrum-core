import Element from './element';

export default class MediaElement extends Element {
  get isLengthValidationSupported() {
    return true;
  }

  set overrideMediaGalleryEnabled(override) {
    this._overrideMediaGalleryEnabled = override;
  }

  get overrideMediaGalleryEnabled() {
    return this._overrideMediaGalleryEnabled;
  }

  get overrideValues() {
    return Object.assign(super.overrideValues, {
      overrideMediaGalleryEnabled: this._overrideMediaGalleryEnabled
    });
  }

  resetOverrides() {
    super.resetOverrides();

    this._overrideMediaGalleryEnabled = null;
  }
}
