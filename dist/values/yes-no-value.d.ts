export default class YesNoValue extends TextualValue {
    get isPositive(): boolean;
    get isNegative(): boolean;
    get isNeutral(): boolean;
}
import TextualValue from './textual-value';
