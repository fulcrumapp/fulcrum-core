"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadObject(object, dataSource, attribute, loader, callback) {
    const ivar = '_' + attribute + 'ID';
    if (object[ivar] == null) {
        callback();
        return;
    }
    dataSource[loader](object[ivar], (err, result) => {
        if (err) {
            return callback(err);
        }
        object['_' + attribute] = result;
        return callback();
    });
}
exports.default = loadObject;
//# sourceMappingURL=load-object.js.map