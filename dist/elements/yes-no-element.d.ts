export default class YesNoElement extends TextualElement {
    positiveChoice: Choice;
    negativeChoice: Choice;
    neutralChoice: Choice;
    neutralEnabled: boolean;
    toJSON(): {
        positive: {
            label: any;
            value: any;
        };
        negative: {
            label: any;
            value: any;
        };
        neutral: {
            label: any;
            value: any;
        };
        neutral_enabled: boolean;
        default_previous_value: boolean;
        type: any;
        key: any;
        label: any;
        description: any;
        required: boolean;
        disabled: boolean;
        hidden: boolean;
        data_name: any;
        default_value: any;
        visible_conditions_type: any;
        visible_conditions_behavior: any;
        visible_conditions: {
            field_key: any;
            operator: any;
            value: any;
        }[] | null;
        required_conditions_type: any;
        required_conditions: {
            field_key: any;
            operator: any;
            value: any;
        }[] | null;
    };
}
import TextualElement from "./textual-element";
import Choice from "./choice";
