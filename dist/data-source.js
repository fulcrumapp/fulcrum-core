"use strict";
/*

  The DataSource class is a composable series of layers that can be used to
  chain data providers together to form more complex schemes.

  For example, we can setup several layers of caching and data providers:
    * A - First look in an in-memory hash (e.g. lives until a page refresh)
    * B - Then look in indexedDB (lives beyond a page refresh, but requires pulling from somewhere else)
    * C - Then finally actually hit the API to get it

  Given this configuration, when requesting data when it's not present at all, the request will travel
  all the way to the end and then each layer is given a chance to process it back on the way up. Passing
  the object back up is critical to being able to store the result at each level.

  A.then(B).then(C);

   get(callback)    -> A -> B -> C -
                                   |
   callback(object) <- A <- B <- C -

  So in this configuration, when asking for a form object, the memory data source would miss and delegate
  to the indexedDB data source, which would also miss and the API data source would end up providing the
  record from the live API. At that point the object is passed back to the indexedDB where it can be stored
  for the next time. After indexedDB stores it, it's passed to the memory cache so it can also store it. And
  finally the actual original callback is invoked with the object. The next time the object is fetched, it will
  be returned from the memory store. Unless a full page refresh happens, and indexedDB will return it first.

  After the first fetch:

   get(callback)    -> A    B    C
                       |
   callback(object) <- A    B    C

  After a full page refresh

   get(callback)    -> A -> B    C
                            |
   callback(object) <- A <- B    C

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = __importDefault(require("async"));
function noop(...params) {
    params[params.length - 1]();
}
class DataSource {
    constructor() {
        this.sources = [];
    }
    get source() {
        return this.sources[this.sources.length - 1];
    }
    invoke(dataSource, method, params, callback) {
        const invokeCallback = (err, ...objects) => {
            if (err) {
                return callback(err);
            }
            else if (objects[0]) {
                return this.process(dataSource.previous, method, params, objects, callback);
            }
            else if (dataSource.next) {
                return this.invoke(dataSource.next, method, params, callback);
            }
            return callback(new Error('Unhandled request: ' + method));
        };
        const invokeArguments = params.concat([invokeCallback]);
        (dataSource[method] || noop).apply(dataSource, invokeArguments);
    }
    process(dataSource, method, params, objects, callback) {
        if (dataSource == null) {
            return callback.apply(null, [null].concat(objects));
        }
        const processMethod = method + 'Complete';
        const processCallback = (err) => {
            if (err) {
                return callback(err);
            }
            else if (dataSource.previous) {
                return this.process(dataSource.previous, method, params, objects, callback);
            }
            return callback.apply(null, [null].concat(objects));
        };
        const processArguments = params.concat(objects.concat([processCallback]));
        (dataSource[processMethod] || noop).apply(dataSource, processArguments);
        return null;
    }
    add(source) {
        if (this.sources.length) {
            this.sources[this.sources.length - 1].next = source;
            source.previous = this.sources[this.sources.length - 1];
        }
        this.sources.push(source);
        return this;
    }
    prepare(formID, callback) {
        const result = {};
        const tasks = {
            form: (callback) => {
                this.getForm(formID, (err, form) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    result.form = form;
                    result.form.load(this, callback);
                });
            },
            users: (callback) => {
                this.getUsers(null, (err, users) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    result.users = users;
                    callback(err);
                });
            },
            projects: (callback) => {
                this.getProjects(null, (err, projects) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    result.projects = projects;
                    callback(err);
                });
            }
        };
        async_1.default.parallel(tasks, (err) => callback(err, result));
    }
    get root() {
        return this.sources[0];
    }
    getChoiceList(id, callback) {
        this.invoke(this.root, 'getChoiceList', [id], callback);
    }
    getClassificationSet(id, callback) {
        this.invoke(this.root, 'getClassificationSet', [id], callback);
    }
    getForm(id, callback) {
        this.invoke(this.root, 'getForm', [id], callback);
    }
    getUser(id, callback) {
        this.invoke(this.root, 'getUser', [id], callback);
    }
    getRecord(id, form, callback) {
        this.invoke(this.root, 'getRecord', [id, form], callback);
    }
    getRecords(form, params, callback) {
        this.invoke(this.root, 'getRecords', [form, params], callback);
    }
    queryRecords(form, params, callback) {
        this.invoke(this.root, 'queryRecords', [form, params], callback);
    }
    getUsers(params, callback) {
        this.invoke(this.root, 'getUsers', [params], callback);
    }
    getProjects(params, callback) {
        this.invoke(this.root, 'getProjects', [params], callback);
    }
    getProject(id, callback) {
        this.invoke(this.root, 'getProject', [id], callback);
    }
    getChangeset(id, callback) {
        this.invoke(this.root, 'getChangeset', [id], callback);
    }
    getPhoto(id, callback) {
        this.invoke(this.root, 'getPhoto', [id], callback);
    }
    getAttachment(id, callback) {
        this.invoke(this.root, 'getAttachment', [id], callback);
    }
    getAudio(id, callback) {
        this.invoke(this.root, 'getAudio', [id], callback);
    }
    getAudioTrack(id, callback) {
        this.invoke(this.root, 'getAudioTrack', [id], callback);
    }
    getVideo(id, callback) {
        this.invoke(this.root, 'getVideo', [id], callback);
    }
    getVideoTrack(id, callback) {
        this.invoke(this.root, 'getVideoTrack', [id], callback);
    }
    createPhoto(accessKey, file, progress, callback) {
        this.invoke(this.root, 'createPhoto', [accessKey, file, progress], callback);
    }
    createAttachment(accessKey, file, progress, callback) {
        this.invoke(this.root, 'createAttachment', [accessKey, file, progress], callback);
    }
    createVideo(accessKey, file, progress, callback) {
        this.invoke(this.root, 'createVideo', [accessKey, file, progress], callback);
    }
    createAudio(accessKey, file, progress, callback) {
        this.invoke(this.root, 'createAudio', [accessKey, file, progress], callback);
    }
    createSignature(accessKey, file, progress, callback) {
        this.invoke(this.root, 'createSignature', [accessKey, file, progress], callback);
    }
    saveVideoTrack(accessKey, file, progress, callback) {
        this.invoke(this.root, 'saveVideoTrack', [accessKey, file, progress], callback);
    }
    saveAudioTrack(accessKey, file, progress, callback) {
        this.invoke(this.root, 'saveAudioTrack', [accessKey, file, progress], callback);
    }
    saveRecord(record, callback) {
        this.invoke(this.root, 'saveRecord', [record], callback);
    }
    deleteRecord(record, callback) {
        this.invoke(this.root, 'deleteRecord', [record], callback);
    }
}
exports.default = DataSource;
//# sourceMappingURL=data-source.js.map