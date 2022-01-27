import setup from '../helper';

import {
  CheckboxElement,
  CheckboxValue,
  DynamicValue,
  TextElement,
  TextValue
} from '../../src';

let record = null;
let checklist = null;

beforeEach((done) => {
  setup((rec) => {
    record = rec;
    checklist = record.formValues.find('checklist');
    done();
  });
});

describe('DynamicValue', () => {
  describe('isEmpty', () => {
    it('is true when there are no items', () => {
      checklist = new DynamicValue('element', []);
      checklist.isEmpty.should.eql(true);
    });

    it('is false when there are items', () => {
      checklist.isEmpty.should.eql(false);
    });
  });

  describe('modifiyItem', () => {
    it('updates the metadata', () => {
      const metadata = checklist.items[0].metadata;
      metadata.x = true;
      checklist.items[0].metadata.x.should.eql(true);

      delete metadata.x;
      checklist.items[0].metadata.id.should.eql('bacd0c33-ad90-429d-b791-b8a05f0d2487');
      (checklist.items[0].metadata.x === undefined).should.be.true;
    });
  });

  describe('addItem', () => {
    it('adds an item', () => {
      const newItem = checklist.createNewItem();
      const textElement = new TextElement(null, { type: 'TextField', key: '2', data_name: '2' });
      const textValue = new TextValue(textElement, 'testtext');
      const checkboxElement = new CheckboxElement(null, { type: 'CheckboxField', key: '3', data_name: '3' });
      const checkboxValue = new CheckboxValue(checkboxElement, true);

      newItem.elements.push(textElement);
      newItem.values.set(textElement.key, textValue);
      newItem.elements.push(checkboxElement);
      newItem.values.set(checkboxElement.key, checkboxValue);

      checklist.insertItem(newItem);

      checklist.itemIndex(newItem.metadata.id).should.eql(1);
      checklist.items.length.should.eql(2);
      checklist.items[1].elements[0].should.be.instanceof(TextElement);
      checklist.items[1].values.get(textElement.key).should.be.instanceof(TextValue);
      checklist.items[1].elements[1].should.be.instanceof(CheckboxElement);
      checklist.items[1].values.get(checkboxElement.key).should.be.instanceof(CheckboxValue);

      checklist.items[1].toJSON().should.eql({
        metadata: {
          id: newItem.metadata.id
        },
        elements: [
          {
            type: 'TextField',
            key: '2',
            label: null,
            description: null,
            required: false,
            disabled: false,
            hidden: false,
            data_name: '2',
            default_value: null,
            visible_conditions_type: null,
            visible_conditions_behavior: 'clear',
            visible_conditions: null,
            required_conditions_type: null,
            required_conditions: null,
            numeric: false,
            pattern: null,
            pattern_description: null,
            min_length: null,
            max_length: null,
            default_previous_value: false
          },
          {
            type: 'CheckboxField',
            key: '3',
            label: null,
            description: null,
            required: false,
            disabled: false,
            hidden: false,
            data_name: '3',
            default_value: null,
            visible_conditions_type: null,
            visible_conditions_behavior: 'clear',
            visible_conditions: null,
            required_conditions_type: null,
            required_conditions: null,
          }
        ],
        values: {
          '2': 'testtext',
          '3': true
        }
      });
    });
  });

  describe('removeItem', () => {
    it('adds an item', () => {
      checklist.removeItem(checklist.items[0].id);
      checklist.items.length.should.eql(0);
    });
  });

  describe('length', () => {
    it('returns the number of items', () => {
      checklist.length.should.eql(1);
    });
  });

  describe('format', () => {
    let options = null;
    beforeEach(() => {
      options = {
        part: null,
        args: 'args'
      };
    });

    describe('when empty', () => {
      it('returns null', () => {
        checklist = new DynamicValue('element', []);
        shouldBeNull(checklist.format({}));
      });
    });

    describe('when part is null', () => {
      it('returns an array of values', () => {
        options.part = 'values';

        checklist.format(options).should.eql([ {1: true} ]);
      });
    });

    describe('when part is metadata', () => {
      it('returns an array of metadata', () => {
        options.part = 'metadata';

        checklist.format(options).should.eql([ {id: 'bacd0c33-ad90-429d-b791-b8a05f0d2487', timestamp: '2022-12-03T02:15:06Z'} ]);
      });
    });
  });
});
