export default class AttachmentValue extends MediaValue {
    get ItemClass(): typeof AttachmentItemValue;
    get displayValue(): string;
    addItem(id: any, name: any): AttachmentItemValue;
}
import MediaValue from "./media-value";
import AttachmentItemValue from "./attachment-item-value";
