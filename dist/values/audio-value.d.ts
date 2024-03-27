export default class AudioValue extends MediaValue {
    get ItemClass(): typeof AudioItemValue;
    get displayValue(): string;
}
import MediaValue from "./media-value";
import AudioItemValue from "./audio-item-value";
