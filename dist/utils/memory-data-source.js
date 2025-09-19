"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryDataSource {
    constructor(name) {
        this.cache = {};
        this.projects = null;
        this.users = null;
        this.photos = {};
        this.audio = {};
        this.videos = {};
        this.tracks = {};
        this.sketches = {};
    }
    getChoiceList(id, callback) {
        return callback(null, this.cache[id]);
    }
    getClassificationSet(id, callback) {
        return callback(null, this.cache[id]);
    }
    getForm(id, callback) {
        return callback(null, this.cache[id]);
    }
    getRecord(id, form, callback) {
        return callback(null, this.cache[id]);
    }
    getUsers(params, callback) {
        return callback(null, this.users);
    }
    getUser(id, callback) {
        return callback(null, this.cache[id]);
    }
    getProjects(params, callback) {
        return callback(null, this.projects);
    }
    getPhoto(id, callback) {
        return callback(null, this.photos[id]);
    }
    getAttachment(id, callback) {
        return callback(null, this.photos[id]);
    }
    getAudio(id, callback) {
        return callback(null, this.audio[id]);
    }
    getAudioTrack(id, callback) {
        return callback(null, this.tracks[id]);
    }
    getVideo(id, callback) {
        return callback(null, this.videos[id]);
    }
    getVideoTrack(id, callback) {
        return callback(null, this.tracks[id]);
    }
    getSketch(id, callback) {
        return callback(null, this.sketches[id]);
    }
    getChoiceListComplete(id, object, callback) {
        this.cache[id] = object;
        callback();
    }
    getClassificationSetComplete(id, object, callback) {
        this.cache[id] = object;
        callback();
    }
    getFormComplete(id, object, callback) {
        this.cache[id] = object;
        callback();
    }
    getRecordComplete(id, form, object, callback) {
        this.cache[id] = object;
        callback();
    }
    getUserComplete(id, object, callback) {
        this.cache[id] = object;
        callback();
    }
    getUsersComplete(params, object, callback) {
        this.users = object;
        callback();
    }
    getProjectsComplete(params, object, callback) {
        this.projects = object;
        callback();
    }
    getPhotoComplete(id, object, callback) {
        if (object.processed) {
            this.photos[id] = object;
        }
        callback();
    }
    getAttachmentComplete(id, object, callback) {
        if (object.processed) {
            this.attachments[id] = object;
        }
        callback();
    }
    getAudioComplete(id, object, callback) {
        if (object.processed) {
            this.audio[id] = object;
        }
        callback();
    }
    getAudioTrackComplete(id, object, callback) {
        this.tracks[id] = object;
        callback();
    }
    getVideoComplete(id, object, callback) {
        if (object.processed) {
            this.videos[id] = object;
        }
        callback();
    }
    getVideoTrackComplete(id, object, callback) {
        this.tracks[id] = object;
        callback();
    }
    getSketchComplete(id, object, callback) {
        if (object.processed) {
            this.sketches[id] = object;
        }
        callback();
    }
}
exports.default = MemoryDataSource;
//# sourceMappingURL=memory-data-source.js.map