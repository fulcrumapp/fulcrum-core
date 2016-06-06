export default function loadObject(dataSource, attribute, loader, callback) {
  const ivar = '_' + attribute + 'ID';

  if (this[ivar] == null) {
    callback();
    return;
  }

  dataSource[loader](this[ivar], (err, object) => {
    if (err) {
      return callback(err);
    }

    this['_' + attribute] = object;

    return callback();
  });
}
