import TextualElement from './textual-element';

export default class HyperlinkElement extends TextualElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.defaultURL = attributes.default_url;
  }
}
