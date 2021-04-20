import SectionElement from './section-element';
import ChoiceElement from './choice-element';
import TextElement from './text-element';
import DateElement from './date-element';
import TimeElement from './time-element';
import PhotoElement from './photo-element';
import VideoElement from './video-element';
import AudioElement from './audio-element';
import AttachmentElement from './attachment-element';
import SignatureElement from './signature-element';
import ClassificationElement from './classification-element';
import RepeatableElement from './repeatable-element';
import AddressElement from './address-element';
import LabelElement from './label-element';
import YesNoElement from './yes-no-element';
import HyperlinkElement from './hyperlink-element';
import BarcodeElement from './barcode-element';
import CalculatedElement from './calculated-element';
import RecordLinkElement from './record-link-element';
import ContainerElement from './container-element';

const Constructors = {
  Section: SectionElement,
  ChoiceField: ChoiceElement,
  TextField: TextElement,
  DateTimeField: DateElement,
  DateField: DateElement,
  TimeField: TimeElement,
  PhotoField: PhotoElement,
  VideoField: VideoElement,
  AudioField: AudioElement,
  AttachmentField: AttachmentElement,
  SignatureField: SignatureElement,
  ClassificationField: ClassificationElement,
  Repeatable: RepeatableElement,
  AddressField: AddressElement,
  Label: LabelElement,
  YesNoField: YesNoElement,
  HyperlinkField: HyperlinkElement,
  BarcodeField: BarcodeElement,
  CalculatedField: CalculatedElement,
  RecordLinkField: RecordLinkElement
};

let initialized = false;

export default class ElementFactory {
  static create(parent, attributes) {
    const constructor = Constructors[attributes.type];

    if (!initialized) {
      initialized = true;
      ContainerElement.initialize();
    }

    if (constructor == null) {
      return null;
    }

    return new constructor(parent, attributes);
  }

  static classes() {
    return Constructors;
  }
}

