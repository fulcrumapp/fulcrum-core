import Element from './element';

export default class SignatureElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.agreementText = attributes.agreement_text;
  }
}

