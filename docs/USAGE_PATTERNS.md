# Usage Patterns

`fulcrum-core` offers two APIs that coexist: the original API for backward compatibility and a new, modern API for TypeScript-first development. You can use them separately or together.

---

## 1. Original API (Default)

This is the classic API that remains fully functional. Use it to maintain existing code with minimal changes.

**Use Case**: Maintaining existing applications.

```javascript
import { Form, Record } from 'fulcrum-core';

// Create and load a form using the ActiveRecord-style pattern
const form = new Form(attributes);
await form.load(dataSource);

// All original methods work as before
console.log(form.name);
```

-   **Pros**: No migration effort, familiar patterns.
-   **Cons**: Lacks clear separation of concerns, less testable.

---

## 2. Modern API

The modern API provides pure, TypeScript-first models and services, promoting a clean architecture.

**Use Case**: New projects or refactoring existing features.

```typescript
import { FormModel, FormService } from 'fulcrum-core/modern';
import type { FormAttributes } from 'fulcrum-core/types';

// Create a pure data model
const form = new FormModel(attributes);

// Use a service to perform actions
await FormService.load(form, dataSource);

console.log(form.name); // Full TypeScript support
```

-   **Pros**: Strong typing, separation of concerns, improved testability.
-   **Cons**: Requires adopting a new pattern.

---

## 3. Types Only

For applications that only need to reference `fulcrum-core` types without any of its runtime logic, you can import just the types.

**Use Case**: Building applications or services that interact with Fulcrum data but have their own logic.

```typescript
// Import only types (zero runtime code)
import type { FormAttributes, RecordAttributes } from 'fulcrum-core/types';

// Use types to define interfaces and function signatures
interface MyData {
  form: FormAttributes;
  records: RecordAttributes[];
}

function processForm(form: FormAttributes) {
  console.log(form.name); // Provides type safety
}
```

-   **Pros**: Zero runtime overhead, enables type safety for any Fulcrum-related data.
-   **Cons**: Provides no functionality; you must implement all logic.

---

## Migration Strategy: Mixing Both APIs

The recommended approach for modernization is to adopt the new APIs incrementally.

1.  **Add Types**: Start by adding types to your existing code for immediate type-safety benefits.
2.  **Use Modern API for New Features**: Write all new code using the modern API.
3.  **Refactor Incrementally**: Gradually refactor existing features to use the modern API as time permits.

This approach allows you to improve your codebase without a disruptive, large-scale rewrite.
