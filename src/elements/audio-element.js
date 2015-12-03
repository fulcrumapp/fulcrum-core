import MediaElement from './media-element';

export default class AudioElement extends MediaElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.trackEnabled = !!attributes.track_enabled;
  }
}
