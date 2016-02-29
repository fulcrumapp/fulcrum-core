import ElementValidationError from './element-validation-error';
import {format} from 'util';

const AT_LEAST = 'at-least';
const AT_MOST = 'at-most';
const BETWEEN = 'between';
const EXACTLY = 'exactly';

export default class LengthValidationError extends ElementValidationError {
  constructor(element) {
    super(element);

    if (element.hasMinLength && element.hasMaxLength && element.minLength === element.maxLength) {
      this.type = EXACTLY;
    } else if (element.hasMinLength && element.hasMaxLength) {
      this.type = BETWEEN;
    } else if (element.hasMinLength) {
      this.type = AT_LEAST;
    } else if (element.hasMaxLength) {
      this.type = AT_MOST;
    }
  }

  get message() {
    if (this.element.isTextElement) {
      return this.textElementMessage;
    } else if (this.element.isChoiceElement) {
      return this.choiceElementMessage;
    } else if (this.element.isPhotoElement) {
      return this.photoElementMessage;
    } else if (this.element.isVideoElement) {
      return this.videoElementMessage;
    } else if (this.element.isAudioElement) {
      return this.audioElementMessage;
    } else if (this.element.isRepeatableElement) {
      return this.repeatableElementMessage;
    }

    return '';
  }

  get isAtLeastError() {
    return this.type === AT_LEAST;
  }

  get isAtMostError() {
    return this.type === AT_MOST;
  }

  get isBetweenError() {
    return this.type === BETWEEN;
  }

  get isExactlyError() {
    return this.type === EXACTLY;
  }

  get textElementMessage() {
    if (this.isAtLeastError) {
      return this.messageWithFormats("The field '%s' must have at least 1 character.",
                                     "The field '%s' must have at least %s characters.",
                                     this.element.minLength);
    } else if (this.isAtMostError) {
      return this.messageWithFormats("The field '%s' cannot have more than 1 character.",
                                     "The field '%s' cannot have more than %s characters.",
                                     this.element.maxLength);
    } else if (this.isBetweenError) {
      return format("The field '%s' must have between %s and %s characters.",
                    this.label,
                    this.element.minLength,
                    this.element.maxLength);
    } else if (this.isExactlyError) {
      return this.messageWithFormats("The field '%s' must have exactly 1 character.",
                                     "The field '%s' must have exactly %s characters.",
                                     this.element.minLength);
    }

    return '';
  }

  get photoElementMessage() {
    if (this.isAtLeastError) {
      return this.messageWithFormats("The field '%s' must have at least 1 photo.",
                                     "The field '%s' must have at least %s photos.",
                                     this.element.minLength);
    } else if (this.isAtMostError) {
      return this.messageWithFormats("The field '%s' cannot have more than 1 photo.",
                                     "The field '%s' cannot have more than %s photos.",
                                     this.element.maxLength);
    } else if (this.isBetweenError) {
      return format("The field '%s' must have between %s and %s photos.",
                    this.label,
                    this.element.minLength,
                    this.element.maxLength);
    } else if (this.isExactlyError) {
      return this.messageWithFormats("The field '%s' must have exactly 1 photo.",
                                     "The field '%s' must have exactly %s photos.",
                                     this.element.minLength);
    }

    return '';
  }

  get videoElementMessage() {
    if (this.isAtLeastError) {
      return this.messageWithFormats("The field '%s' must have at least 1 video.",
                                     "The field '%s' must have at least %s videos.",
                                     this.element.minLength);
    } else if (this.isAtMostError) {
      return this.messageWithFormats("The field '%s' cannot have more than 1 video.",
                                     "The field '%s' cannot have more than %s videos.",
                                     this.element.maxLength);
    } else if (this.isBetweenError) {
      return format("The field '%s' must have between %s and %s videos.",
                    this.label,
                    this.element.minLength,
                    this.element.maxLength);
    } else if (this.isExactlyError) {
      return this.messageWithFormats("The field '%s' must have exactly 1 video.",
                                     "The field '%s' must have exactly %s videos.",
                                     this.element.minLength);
    }

    return '';
  }

  get audioElementMessage() {
    if (this.isAtLeastError) {
      return this.messageWithFormats("The field '%s' must have at least 1 audio file.",
                                     "The field '%s' must have at least %s audio files.",
                                     this.element.minLength);
    } else if (this.isAtMostError) {
      return this.messageWithFormats("The field '%s' cannot have more than 1 audio file.",
                                     "The field '%s' cannot have more than %s audio files.",
                                     this.element.maxLength);
    } else if (this.isBetweenError) {
      return format("The field '%s' must have between %s and %s audio files.",
                    this.label,
                    this.element.minLength,
                    this.element.maxLength);
    } else if (this.isExactlyError) {
      return this.messageWithFormats("The field '%s' must have exactly 1 audio file.",
                                     "The field '%s' must have exactly %s audio files.",
                                     this.element.minLength);
    }

    return '';
  }

  get choiceElementMessage() {
    if (this.isAtLeastError) {
      return this.messageWithFormats("The field '%s' must have at least 1 choice.",
                                     "The field '%s' must have at least %s choices.",
                                     this.element.minLength);
    } else if (this.isAtMostError) {
      return this.messageWithFormats("The field '%s' cannot have more than 1 choice.",
                                     "The field '%s' cannot have more than %s choices.",
                                     this.element.maxLength);
    } else if (this.isBetweenError) {
      return format("The field '%s' must have between %s and %s choices.",
                    this.label,
                    this.element.minLength,
                    this.element.maxLength);
    } else if (this.isExactlyError) {
      return this.messageWithFormats("The field '%s' must have exactly 1 choice.",
                                     "The field '%s' must have exactly %s choices.",
                                     this.element.minLength);
    }

    return '';
  }

  get repeatableElementMessage() {
    if (this.isAtLeastError) {
      return this.messageWithFormats("The field '%s' must have at least 1 item.",
                                     "The field '%s' must have at least %s items.",
                                     this.element.minLength);
    } else if (this.isAtMostError) {
      return this.messageWithFormats("The field '%s' cannot have more than 1 item.",
                                     "The field '%s' cannot have more than %s items.",
                                     this.element.maxLength);
    } else if (this.isBetweenError) {
      return format("The field '%s' must have between %s and %s items.",
                    this.label,
                    this.element.minLength,
                    this.element.maxLength);
    } else if (this.isExactlyError) {
      return this.messageWithFormats("The field '%s' must have exactly 1 item.",
                                     "The field '%s' must have exactly %s items.",
                                     this.element.minLength);
    }

    return '';
  }

  messageWithFormats(singularFormat, pluralFormat, length) {
    if (length === 1) {
      return format(singularFormat, this.label, length);
    } else {
      return format(pluralFormat, this.label, length);
    }
  }
}
