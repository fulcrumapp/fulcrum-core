export default class VideoValue extends MediaValue {
    get ItemClass(): typeof VideoItemValue;
    get displayValue(): string;
}
import MediaValue from "./media-value";
import VideoItemValue from "./video-item-value";
