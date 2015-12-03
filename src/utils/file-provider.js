import fs from 'fs';
import path from 'path';

import Form from '../form';
import ChoiceList from '../choice-list';
import ClassificationSet from '../classification-set';

export default class FileProvider {
  constructor(root) {
    this.root = root.toString();
    this.cache = {};
  }

  json(jsonPath) {
    return JSON.parse(fs.readFileSync(jsonPath).toString());
  }

  getChoiceList(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }

    const jsonPath = path.join(this.root, 'choice_lists', id + '.json');

    this.cache[id] = new ChoiceList(this.json(jsonPath).choice_list);

    return this.cache[id];
  }

  getClassificationSet(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }

    const jsonPath = path.join(this.root, 'classification_sets', id + '.json');

    this.cache[id] = new ClassificationSet(this.json(jsonPath).classification_set);

    return this.cache[id];
  }

  getForm(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }

    const jsonPath = path.join(this.root, 'forms', id + '.json');

    this.cache[id] = new Form(this.json(jsonPath).form);

    return this.cache[id];
  }
}
