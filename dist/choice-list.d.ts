export default class ChoiceList {
    constructor(attributes: any);
    updateFromAPIAttributes(attrs: any): void;
    _id: any;
    _name: any;
    _description: any;
    _choicesJSON: any;
    _version: any;
    _createdAt: Date | null | undefined;
    _updatedAt: Date | null | undefined;
    get id(): any;
    get name(): any;
    get description(): any;
    get version(): any;
    get createdAt(): Date | null | undefined;
    get updatedAt(): Date | null | undefined;
    get choices(): any[];
    _choices: any[] | undefined;
    toJSON(): {
        id: any;
        name: any;
        description: any;
        choices: any;
        version: any;
        created_at: any;
        updated_at: any;
    };
}
