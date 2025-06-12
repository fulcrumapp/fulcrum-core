"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const section_element_1 = __importDefault(require("./section-element"));
const choice_element_1 = __importDefault(require("./choice-element"));
const text_element_1 = __importDefault(require("./text-element"));
const date_element_1 = __importDefault(require("./date-element"));
const time_element_1 = __importDefault(require("./time-element"));
const photo_element_1 = __importDefault(require("./photo-element"));
const video_element_1 = __importDefault(require("./video-element"));
const audio_element_1 = __importDefault(require("./audio-element"));
const attachment_element_1 = __importDefault(require("./attachment-element"));
const signature_element_1 = __importDefault(require("./signature-element"));
const classification_element_1 = __importDefault(require("./classification-element"));
const repeatable_element_1 = __importDefault(require("./repeatable-element"));
const address_element_1 = __importDefault(require("./address-element"));
const label_element_1 = __importDefault(require("./label-element"));
const yes_no_element_1 = __importDefault(require("./yes-no-element"));
const hyperlink_element_1 = __importDefault(require("./hyperlink-element"));
const barcode_element_1 = __importDefault(require("./barcode-element"));
const calculated_element_1 = __importDefault(require("./calculated-element"));
const record_link_element_1 = __importDefault(require("./record-link-element"));
const container_element_1 = __importDefault(require("./container-element"));
const checkbox_element_1 = __importDefault(require("./checkbox-element"));
const dynamic_element_1 = __importDefault(require("./dynamic-element"));
const location_element_1 = __importDefault(require("./location-element"));
const button_element_1 = __importDefault(require("./button-element"));
const sketch_element_1 = __importDefault(require("./sketch-element"));
const Constructors = {
    Section: section_element_1.default,
    ChoiceField: choice_element_1.default,
    TextField: text_element_1.default,
    DateTimeField: date_element_1.default,
    DateField: date_element_1.default,
    TimeField: time_element_1.default,
    PhotoField: photo_element_1.default,
    VideoField: video_element_1.default,
    AudioField: audio_element_1.default,
    AttachmentField: attachment_element_1.default,
    SignatureField: signature_element_1.default,
    ClassificationField: classification_element_1.default,
    Repeatable: repeatable_element_1.default,
    AddressField: address_element_1.default,
    Label: label_element_1.default,
    YesNoField: yes_no_element_1.default,
    HyperlinkField: hyperlink_element_1.default,
    BarcodeField: barcode_element_1.default,
    CalculatedField: calculated_element_1.default,
    RecordLinkField: record_link_element_1.default,
    CheckboxField: checkbox_element_1.default,
    DynamicField: dynamic_element_1.default,
    LocationField: location_element_1.default,
    ButtonField: button_element_1.default,
    SketchElement: sketch_element_1.default,
};
let initialized = false;
class ElementFactory {
    static create(parent, attributes) {
        const constructor = Constructors[attributes.type];
        if (!initialized) {
            initialized = true;
            container_element_1.default.initialize();
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
exports.default = ElementFactory;
//# sourceMappingURL=element-factory.js.map