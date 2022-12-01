export default class Project {
    constructor(attributes: any);
    updateFromAPIAttributes(attrs: any): void;
    _id: any;
    _name: any;
    _description: any;
    _createdAt: Date | null | undefined;
    _updatedAt: Date | null | undefined;
    get id(): any;
    get name(): any;
    get description(): any;
    get createdAt(): Date | null | undefined;
    get updatedAt(): Date | null | undefined;
}
