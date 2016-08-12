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
    return Object.assign(Object.getOwnPropertyDescriptor(Element.prototype, 'overrideValues').get.call(this), {
      overrideMediaGalleryEnabled: this._overrideMediaGalleryEnabled
    });
  }

  resetOverrides() {
    super.resetOverrides();

    this._overrideMediaGalleryEnabled = null;
  }
}
