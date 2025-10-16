/**
 * Type Compatibility Test Suite
 * 
 * Verifies that child classes properly fulfill their parent class interfaces.
 * This prevents type mismatches where abstract parent types cannot be used.
 * 
 * Usage: node_modules/.bin/tsc --noEmit blog/2025-10-15-fixing-typescript-type-mismatches/test-types.ts
 * 
 * See: index.md for details
 */

import Feature from '../../dist/feature';
import Record from '../../dist/record';
import RepeatableItemValue from '../../dist/values/repeatable-item-value';
import Element from '../../dist/elements/element';
import TextualElement from '../../dist/elements/textual-element';
import MediaElement from '../../dist/elements/media-element';
import ContainerElement from '../../dist/elements/container-element';
import BooleanElement from '../../dist/elements/boolean-element';
import FormValue from '../../dist/values/form-value';
import TextualValue from '../../dist/values/textual-value';
import MediaValue from '../../dist/values/media-value';
import BooleanValue from '../../dist/values/boolean-value';
import TextElement from '../../dist/elements/text-element';
import DateElement from '../../dist/elements/date-element';
import TimeElement from '../../dist/elements/time-element';
import ChoiceElement from '../../dist/elements/choice-element';
import ClassificationElement from '../../dist/elements/classification-element';
import PhotoElement from '../../dist/elements/photo-element';
import VideoElement from '../../dist/elements/video-element';
import AudioElement from '../../dist/elements/audio-element';
import SignatureElement from '../../dist/elements/signature-element';
import RepeatableElement from '../../dist/elements/repeatable-element';
import AddressElement from '../../dist/elements/address-element';
import TextValue from '../../dist/values/text-value';
import DateValue from '../../dist/values/date-value';
import TimeValue from '../../dist/values/time-value';
import ChoiceValue from '../../dist/values/choice-value';
import ClassificationValue from '../../dist/values/classification-value';
import PhotoValue from '../../dist/values/photo-value';
import CheckboxValue from '../../dist/values/checkbox-value';

// Feature Hierarchy
let feature: Feature;
feature = new Record(null, null);
feature = new RepeatableItemValue(null, {}, 0);

// Element Hierarchy
let element: Element;
element = new TextualElement(null, {});
element = new MediaElement(null, {});
element = new ContainerElement(null, {});
element = new BooleanElement(null, {});
element = new TextElement(null, {});
element = new DateElement(null, {});
element = new TimeElement(null, {});
element = new ChoiceElement(null, {});
element = new ClassificationElement(null, {});
element = new PhotoElement(null, {});
element = new VideoElement(null, {});
element = new AudioElement(null, {});
element = new SignatureElement(null, {});
element = new RepeatableElement(null, {});
element = new AddressElement(null, {});

// TextualElement Hierarchy
let textualElement: TextualElement;
textualElement = new TextElement(null, {});
textualElement = new DateElement(null, {});
textualElement = new TimeElement(null, {});

// MediaElement Hierarchy
let mediaElement: MediaElement;
mediaElement = new PhotoElement(null, {});
mediaElement = new VideoElement(null, {});
mediaElement = new AudioElement(null, {});

// ContainerElement Hierarchy
let containerElement: ContainerElement;
containerElement = new RepeatableElement(null, {});

// FormValue Hierarchy
let formValue: FormValue;
formValue = new TextualValue(null, null);
formValue = new MediaValue(null, null);
formValue = new BooleanValue(null, null);
formValue = new TextValue(null, null);
formValue = new DateValue(null, null);
formValue = new TimeValue(null, null);
formValue = new ChoiceValue(null, null);
formValue = new ClassificationValue(null, null);
formValue = new PhotoValue(null, null);
formValue = new CheckboxValue(null, null);

// TextualValue Hierarchy
let textualValue: TextualValue;
textualValue = new TextValue(null, null);
textualValue = new DateValue(null, null);
textualValue = new TimeValue(null, null);

// MediaValue Hierarchy
let mediaValue: MediaValue;
mediaValue = new PhotoValue(null, null);

// BooleanValue Hierarchy
let booleanValue: BooleanValue;
booleanValue = new CheckboxValue(null, null);
