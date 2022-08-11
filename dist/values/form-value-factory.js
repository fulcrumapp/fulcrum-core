"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const choice_value_1 = __importDefault(require("./choice-value"));
const text_value_1 = __importDefault(require("./text-value"));
const date_value_1 = __importDefault(require("./date-value"));
const time_value_1 = __importDefault(require("./time-value"));
const photo_value_1 = __importDefault(require("./photo-value"));
const video_value_1 = __importDefault(require("./video-value"));
const audio_value_1 = __importDefault(require("./audio-value"));
const attachment_value_1 = __importDefault(require("./attachment-value"));
const signature_value_1 = __importDefault(require("./signature-value"));
const classification_value_1 = __importDefault(require("./classification-value"));
const repeatable_value_1 = __importDefault(require("./repeatable-value"));
const address_value_1 = __importDefault(require("./address-value"));
const yes_no_value_1 = __importDefault(require("./yes-no-value"));
const hyperlink_value_1 = __importDefault(require("./hyperlink-value"));
const barcode_value_1 = __importDefault(require("./barcode-value"));
const calculated_value_1 = __importDefault(require("./calculated-value"));
const record_link_value_1 = __importDefault(require("./record-link-value"));
const checkbox_value_1 = __importDefault(require("./checkbox-value"));
const dynamic_value_1 = __importDefault(require("./dynamic-value"));
const location_value_1 = __importDefault(require("./location-value"));
const Constructors = {
    ChoiceField: choice_value_1.default,
    TextField: text_value_1.default,
    DateTimeField: date_value_1.default,
    DateField: date_value_1.default,
    TimeField: time_value_1.default,
    PhotoField: photo_value_1.default,
    VideoField: video_value_1.default,
    AudioField: audio_value_1.default,
    AttachmentField: attachment_value_1.default,
    SignatureField: signature_value_1.default,
    ClassificationField: classification_value_1.default,
    Repeatable: repeatable_value_1.default,
    AddressField: address_value_1.default,
    YesNoField: yes_no_value_1.default,
    HyperlinkField: hyperlink_value_1.default,
    BarcodeField: barcode_value_1.default,
    CalculatedField: calculated_value_1.default,
    RecordLinkField: record_link_value_1.default,
    CheckboxField: checkbox_value_1.default,
    DynamicField: dynamic_value_1.default,
    LocationField: location_value_1.default
};
class FormValueFactory {
    static create(element, attributes) {
        const constructor = Constructors[element.type];
        if (constructor == null) {
            return null;
        }
        return new constructor(element, attributes);
    }
    static classes() {
        return Constructors;
    }
}
exports.default = FormValueFactory;
//# sourceMappingURL=form-value-factory.js.map