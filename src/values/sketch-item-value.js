import MediaItemValue from './media-item-value';

export default class SketchItemValue extends MediaItemValue {
  get mediaKey() {
    return 'sketch_id';
  }
}
