import MediaElement from './media-element';

export default class VideoElement extends MediaElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.trackEnabled = !!attributes.track_enabled;
    this.audioEnabled = !!attributes.audio_enabled;
  }
}

