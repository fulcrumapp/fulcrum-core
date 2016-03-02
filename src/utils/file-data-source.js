import fs from 'fs';
import path from 'path';

import Form from '../form';
import ChoiceList from '../choice-list';
import ClassificationSet from '../classification-set';

export default class FileDataSource {
  constructor(root) {
    this.root = root.toString();
  }

  json(jsonPath) {
    return JSON.parse(fs.readFileSync(jsonPath).toString());
  }

  getChoiceList(id, callback) {
    const jsonPath = path.join(this.root, 'choice_lists', id + '.json');

    return callback(null, new ChoiceList(this.json(jsonPath).choice_list));
  }

  getClassificationSet(id, callback) {
    const jsonPath = path.join(this.root, 'classification_sets', id + '.json');

    return callback(null, new ClassificationSet(this.json(jsonPath).classification_set));
  }

  getForm(id, callback) {
    const jsonPath = path.join(this.root, 'forms', id + '.json');

    return callback(null, new Form(this.json(jsonPath).form));
  }
}
