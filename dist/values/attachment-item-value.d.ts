export default class AttachmentItemValue extends MediaItemValue {
    name: any;
    toJSON(): {
        name: any;
    };
    get mediaKey(): string;
}
import MediaItemValue from "./media-item-value";
