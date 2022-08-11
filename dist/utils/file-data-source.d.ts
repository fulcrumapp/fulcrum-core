export default class FileDataSource {
    constructor(root: any);
    root: any;
    json(jsonPath: any): any;
    getChoiceList(id: any, callback: any): any;
    getClassificationSet(id: any, callback: any): any;
    getForm(id: any, callback: any): any;
    getUsers(params: any, callback: any): any;
    getProjects(params: any, callback: any): any;
}
