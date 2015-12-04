import ChoiceValue from './choice-value';
import TextValue from './text-value';
import DateValue from './date-value';
import TimeValue from './time-value';
import PhotoValue from './photo-value';
import VideoValue from './video-value';
import AudioValue from './audio-value';
import SignatureValue from './signature-value';
import ClassificationValue from './classification-value';
import RepeatableValue from './repeatable-value';
import AddressValue from './address-value';
import YesNoValue from './yes-no-value';
import HyperlinkValue from './hyperlink-value';
import BarcodeValue from './barcode-value';
import CalculatedValue from './calculated-value';
import RecordLinkValue from './record-link-value';

const Constructors = {
  ChoiceField: ChoiceValue,
  TextField: TextValue,
  DateTimeField: DateValue,
  DateField: DateValue,
  TimeField: TimeValue,
  PhotoField: PhotoValue,
  VideoField: VideoValue,
  AudioField: AudioValue,
  SignatureField: SignatureValue,
  ClassificationField: ClassificationValue,
  Repeatable: RepeatableValue,
  AddressField: AddressValue,
  YesNoField: YesNoValue,
  HyperlinkField: HyperlinkValue,
  BarcodeField: BarcodeValue,
  CalculatedField: CalculatedValue,
  RecordLinkField: RecordLinkValue
};

export default class FormValueFactory {
  static create(element, attributes) {
    const constructor = Constructors[element.type];

    if (constructor == null) {
      throw new Error('Unsupported element ' + element.type);
    }

    return new constructor(element, attributes);
  }

  static classes() {
    return Constructors;
  }
}

