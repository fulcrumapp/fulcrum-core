"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecordLinkCondition = function RecordLinkCondition(attributes) {
  _classCallCheck(this, RecordLinkCondition);

  this.linkedFormFieldKey = attributes.linked_form_field_key;
  this.operator = attributes.operator;
  this.value = attributes.value;
  this.valueFieldKey = attributes.value_field_key;
};

exports.default = RecordLinkCondition;
//# sourceMappingURL=record-link-condition.js.map