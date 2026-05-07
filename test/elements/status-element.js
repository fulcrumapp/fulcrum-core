import { StatusElement } from '../../src';

describe('StatusElement', () => {
  describe('constructor', () => {
    it('always sets type to StatusField', () => {
      const element = new StatusElement(null, {});

      element.type.should.eql('StatusField');
    });

    it('cannot be overridden by a different type in attributes', () => {
      const element = new StatusElement(null, { type: 'TextField' });

      element.type.should.eql('StatusField');
    });

    it('does not mutate the attributes argument', () => {
      const attributes = { label: 'My Status' };
      new StatusElement(null, attributes);

      (attributes.type === undefined).should.eql(true);
    });

    it('applies default values when attributes are empty', () => {
      const element = new StatusElement(null, {});

      element.label.should.eql('Status');
      element.key.should.eql('@status');
      element.dataName.should.eql('status');
      element.isEnabled.should.eql(false);
      element.isReadOnly.should.eql(false);
    });

    it('applies provided attributes over defaults', () => {
      const element = new StatusElement(null, { label: 'Custom Status', enabled: true });

      element.label.should.eql('Custom Status');
      element.isEnabled.should.eql(true);
    });

    it('builds choices from attributes', () => {
      const element = new StatusElement(null, {
        choices: [
          { label: 'Open', value: 'open', color: '#FF0000' },
          { label: 'Closed', value: 'closed', color: '#00FF00' },
        ],
      });

      element.choices.length.should.eql(2);
      element.choices[0].value.should.eql('open');
      element.choices[1].value.should.eql('closed');
    });
  });
});
