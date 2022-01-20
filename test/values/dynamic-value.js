import setup from '../helper';

import { DynamicValue, TextElement, TextValue, CheckboxElement } from '../../src';

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
    });
  });

  describe('addItem', () => {
    it('adds an item', () => {
      const newItem = checklist.createNewItem();
      const newElement = new TextElement('element', {key: '2', data_name: '2'});
      newItem.elements.push(newElement);
      const newValue = new TextValue(newElement, 'testtext');
      newItem.values.set('2', newValue);

      newItem.elements[0].should.be.instanceof(TextElement);
      newItem.elements.length.should.eql(1);

      checklist.insertItem(newItem);

      checklist.itemIndex(newItem.metadata.id).should.eql(1);
      checklist.items.length.should.eql(2);
      const testElement = checklist.items[1].elements[0];
      testElement.should.be.instanceof(TextElement);
      const testValue = checklist.items[1].values.get(testElement.key);
      testValue.should.be.instanceof(TextValue);

      checklist.items[1].toJSON().metadata.id.should.eql(newItem.metadata.id);
      // checklist.items[1].toJSON().should.eql({ metadata: { id: 'aaa'}, elements: [], values: {} });
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
