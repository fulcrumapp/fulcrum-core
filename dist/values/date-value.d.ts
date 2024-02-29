export default class DateValue extends TextualValue {
    get isValid(): boolean | null;
    get dateValue(): Date | null;
    get columnValue(): Date | null;
}
import TextualValue from './textual-value';
