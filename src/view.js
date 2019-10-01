import DateUtils from './utils/date-utils';

export default class View {
  constructor(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  updateFromAPIAttributes(attrs) {
    const attributes = attrs || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._queries = attributes.queries;
    this._options = attributes.options;
    this._createdAt = DateUtils.parseISOTimestamp(attributes.created_at);
    this._updatedAt = DateUtils.parseISOTimestamp(attributes.updated_at);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get queries() {
    return this._queries;
  }

  get options() {
    return this._options;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
