export default class LengthValidationError extends ElementValidationError {
    type: string | undefined;
    get message(): string;
    get isAtLeastError(): boolean;
    get isAtMostError(): boolean;
    get isBetweenError(): boolean;
    get isExactlyError(): boolean;
    get textElementMessage(): string;
    get photoElementMessage(): string;
    get videoElementMessage(): string;
    get audioElementMessage(): string;
    get attachmentElementMessage(): string;
    get choiceElementMessage(): string;
    get repeatableElementMessage(): string;
    messageWithFormats(singularFormat: any, pluralFormat: any, length: any): string;
}
import ElementValidationError from "./element-validation-error";
