import { StatusElement } from '../../src';

describe('StatusElement', () => {
  it('handles null attributes without crashing', () => {
    const element = new StatusElement(null, null);

    element.type.should.eql('StatusField');
    element.label.should.eql('Status');
    element.key.should.eql('@status');
    element.dataName.should.eql('status');
    element.isEnabled.should.eql(false);
    element.choices.should.eql([]);
  });

  it('handles undefined attributes without crashing', () => {
    const element = new StatusElement(null, undefined);

    element.type.should.eql('StatusField');
    element.isEnabled.should.eql(false);
  });

  it('handles empty object attributes', () => {
    const element = new StatusElement(null, {});

    element.type.should.eql('StatusField');
    element.label.should.eql('Status');
    element.isEnabled.should.eql(false);
  });

  it('preserves provided attributes over defaults', () => {
    const attrs = {
      label: 'Custom Status',
      enabled: true,
      choices: [{ label: 'Done', value: 'done', color: '#00FF00' }],
    };

    const element = new StatusElement(null, attrs);

    element.type.should.eql('StatusField');
    element.label.should.eql('Custom Status');
    element.isEnabled.should.eql(true);
    element.choices.length.should.eql(1);
  });
});
