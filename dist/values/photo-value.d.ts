export default class PhotoValue extends MediaValue {
    get ItemClass(): typeof PhotoItemValue;
    get displayValue(): string;
}
import MediaValue from './media-value';
import PhotoItemValue from './photo-item-value';
