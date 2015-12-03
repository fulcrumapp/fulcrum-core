/* eslint no-invalid-this: 0*/
/* eslint guard-for-in: 0*/

const ExcludedClassProperties = ['__super__'];
const ExcludedPrototypeProperties = ['constructor', 'extended'];

export default class Mixin {
  static includeInto(constructor) {
    this.extend(constructor.prototype);

    for (let name in this) {
      if (ExcludedClassProperties.indexOf(name) === -1) {
        if (!constructor.hasOwnProperty(name)) {
          const descriptor = Object.getOwnPropertyDescriptor(constructor, name);

          Object.defineProperty(constructor, name, descriptor);
        }
      }
    }

    if (this.included) {
      this.included(constructor);
    }
  }

  static extend(object) {
    for (let name of Object.getOwnPropertyNames(this.prototype)) {
      if (ExcludedPrototypeProperties.indexOf(name) === -1) {
        if (!object.hasOwnProperty(name)) {
          const descriptor = Object.getOwnPropertyDescriptor(this.prototype, name);

          Object.defineProperty(object, name, descriptor);
        }
      }
    }

    if (this.prototype.extended) {
      this.prototype.extended(object);
    }
  }

  constructor() {
    if (this.extended) {
      this.extended();
    }
  }
}

for (let name in Mixin) {
  if (Mixin.hasOwnProperty(name)) {
    ExcludedClassProperties.push(name);
  }
}
