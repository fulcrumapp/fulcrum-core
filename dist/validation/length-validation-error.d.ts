export default class LengthValidationError extends ElementValidationError {
    type: string | undefined;
    get message(): any;
    get isAtLeastError(): boolean;
    get isAtMostError(): boolean;
    get isBetweenError(): boolean;
    get isExactlyError(): boolean;
    get textElementMessage(): any;
    get photoElementMessage(): any;
    get videoElementMessage(): any;
    get audioElementMessage(): any;
    get attachmentElementMessage(): any;
    get choiceElementMessage(): any;
    get repeatableElementMessage(): any;
    messageWithFormats(singularFormat: any, pluralFormat: any, length: any): any;
}
import ElementValidationError from './element-validation-error';
