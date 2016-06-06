'use strict';

exports.__esModule = true;
exports.default = loadObject;
function loadObject(dataSource, attribute, loader, callback) {
  var _this = this;

  var ivar = '_' + attribute + 'ID';

  if (this[ivar] == null) {
    callback();
    return;
  }

  dataSource[loader](this[ivar], function (err, object) {
    if (err) {
      return callback(err);
    }

    _this['_' + attribute] = object;

    return callback();
  });
}
//# sourceMappingURL=load-object.js.map