export default class LevelDBDataSource {
    constructor(db: any, cacheVersion: any);
    db: any;
    callbacks: any[];
    cacheVersion: any;
    initialize({ formVersions, choiceListVersions, classificationSetVersions }: {
        formVersions: any;
        choiceListVersions: any;
        classificationSetVersions: any;
    }, callback: any): void;
    checkAlreadyFetching(id: any, callback: any): boolean;
    invokeCallbacks(id: any, err: any, object: any): void;
    get(key: any, callback: any): any;
    del(key: any, callback: any): any;
    put(key: any, value: any, callback: any): any;
    key(type: any, id: any): string;
    getChoiceList(id: any, callback: any): void;
    getClassificationSet(id: any, callback: any): void;
    getForm(id: any, callback: any): void;
    getChoiceListComplete(id: any, object: any, callback: any): void;
    getClassificationSetComplete(id: any, object: any, callback: any): void;
    getFormComplete(id: any, object: any, callback: any): void;
    updateObject(key: any, object: any, callback: any): void;
    getVersions(callback: any): void;
    updateVersion(key: any, version: any, callback: any): void;
    checkVersion(callback: any): void;
    deleteAll(callback: any): void;
}
