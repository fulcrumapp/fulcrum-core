'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoValue = exports.VideoItemValue = exports.PhotoValue = exports.PhotoItemValue = exports.AudioValue = exports.AudioItemValue = exports.RepeatableElement = exports.CalculatedElement = exports.Condition = exports.ChildElements = exports.NumberUtils = exports.DateUtils = exports.TextUtils = exports.FormValues = exports.Feature = exports.RepeatableValue = exports.RepeatableItemValue = exports.ElementFactory = exports.ClassificationSet = exports.Classification = exports.ChoiceList = exports.Choice = exports.FormValue = exports.Element = exports.Record = exports.Form = undefined;

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _element = require('./elements/element');

var _element2 = _interopRequireDefault(_element);

var _formValue = require('./values/form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _choice = require('./elements/choice');

var _choice2 = _interopRequireDefault(_choice);

var _choiceList = require('./choice-list');

var _choiceList2 = _interopRequireDefault(_choiceList);

var _classification = require('./elements/classification');

var _classification2 = _interopRequireDefault(_classification);

var _classificationSet = require('./classification-set');

var _classificationSet2 = _interopRequireDefault(_classificationSet);

var _elementFactory = require('./elements/element-factory');

var _elementFactory2 = _interopRequireDefault(_elementFactory);

var _repeatableItemValue = require('./values/repeatable-item-value');

var _repeatableItemValue2 = _interopRequireDefault(_repeatableItemValue);

var _repeatableValue = require('./values/repeatable-value');

var _repeatableValue2 = _interopRequireDefault(_repeatableValue);

var _feature = require('./feature');

var _feature2 = _interopRequireDefault(_feature);

var _formValues = require('./values/form-values');

var _formValues2 = _interopRequireDefault(_formValues);

var _textUtils = require('./utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _dateUtils = require('./utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _numberUtils = require('./utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

var _childElements = require('./elements/child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

var _condition = require('./elements/condition');

var _condition2 = _interopRequireDefault(_condition);

var _calculatedElement = require('./elements/calculated-element');

var _calculatedElement2 = _interopRequireDefault(_calculatedElement);

var _repeatableElement = require('./elements/repeatable-element');

var _repeatableElement2 = _interopRequireDefault(_repeatableElement);

var _audioItemValue = require('./values/audio-item-value');

var _audioItemValue2 = _interopRequireDefault(_audioItemValue);

var _audioValue = require('./values/audio-value');

var _audioValue2 = _interopRequireDefault(_audioValue);

var _photoItemValue = require('./values/photo-item-value');

var _photoItemValue2 = _interopRequireDefault(_photoItemValue);

var _photoValue = require('./values/photo-value');

var _photoValue2 = _interopRequireDefault(_photoValue);

var _videoItemValue = require('./values/video-item-value');

var _videoItemValue2 = _interopRequireDefault(_videoItemValue);

var _videoValue = require('./values/video-value');

var _videoValue2 = _interopRequireDefault(_videoValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Form = _form2.default;
exports.Record = _record2.default;
exports.Element = _element2.default;
exports.FormValue = _formValue2.default;
exports.Choice = _choice2.default;
exports.ChoiceList = _choiceList2.default;
exports.Classification = _classification2.default;
exports.ClassificationSet = _classificationSet2.default;
exports.ElementFactory = _elementFactory2.default;
exports.RepeatableItemValue = _repeatableItemValue2.default;
exports.RepeatableValue = _repeatableValue2.default;
exports.Feature = _feature2.default;
exports.FormValues = _formValues2.default;
exports.TextUtils = _textUtils2.default;
exports.DateUtils = _dateUtils2.default;
exports.NumberUtils = _numberUtils2.default;
exports.ChildElements = _childElements2.default;
exports.Condition = _condition2.default;
exports.CalculatedElement = _calculatedElement2.default;
exports.RepeatableElement = _repeatableElement2.default;
exports.AudioItemValue = _audioItemValue2.default;
exports.AudioValue = _audioValue2.default;
exports.PhotoItemValue = _photoItemValue2.default;
exports.PhotoValue = _photoValue2.default;
exports.VideoItemValue = _videoItemValue2.default;
exports.VideoValue = _videoValue2.default;

// const api = {
//   Form: Form,
//   Record: Record,
//   Element: Element,
//   FormValue: FormValue,
//   Choice: Choice,
//   ChoiceList: ChoiceList,
//   Classification: Classification,
//   ClassificationSet: ClassificationSet,
//   ElementFactory: ElementFactory
// };

// const elements = Element.classes();

// for (let prop of Object.keys(elements)) {
//   api[prop] = elements[prop];
// }

// const values = FormValue.classes();

// for (let prop of Object.keys(values)) {
//   api[prop] = values[prop];
// }

// export default api;
//# sourceMappingURL=index.js.map