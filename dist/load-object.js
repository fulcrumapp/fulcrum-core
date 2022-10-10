"use strict";

exports.__esModule = true;
exports["default"] = loadObject;
function loadObject(object, dataSource, attribute, loader, callback) {
  var ivar = '_' + attribute + 'ID';
  if (object[ivar] == null) {
    callback();
    return;
  }
  dataSource[loader](object[ivar], function (err, result) {
    if (err) {
      return callback(err);
    }
    object['_' + attribute] = result;
    return callback();
  });
}
//# sourceMappingURL=load-object.js.map