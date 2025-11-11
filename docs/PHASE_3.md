# Phase 3: Models & Services

**Status**: 📅 Planned

This phase introduces a new, modern API that separates data (Models) from logic (Services), offered in parallel to the existing API.

---

## 🎯 Goal

To refactor the existing ActiveRecord-style classes into pure TypeScript models and stateless services, improving testability and separation of concerns.

---

## ✨ Key Deliverables

-   **Pure TypeScript Models**:
    -   New classes (e.g., `FormModel`, `RecordModel`) will be created in `src/models/`.
    -   These classes will only contain data and related properties or getters, with no persistence logic (e.g., no `.load()` or `.save()` methods).
-   **Stateless Services**:
    -   Logic for fetching, saving, and validating data will be extracted into services (e.g., `FormService`, `RecordService`) in `src/services/`.
-   **New Modern API Entry Point**:
    -   The new models and services will be available via an optional `fulcrum-core/modern` entry point.
    -   The default `fulcrum-core` import will continue to provide the original, unchanged API.

---

## � Usage Example

The new API promotes a cleaner, more explicit pattern, while the original API remains fully functional.

### Original API (Still Works)
```javascript
import { Form } from '@fulcrumapp/fulcrum-core';

const form = new Form(attrs);
await form.load(dataSource); // ActiveRecord-style
```

### New Modern API (Optional)
```typescript
import { FormModel, FormService } from 'fulcrum-core/modern';

const form = new FormModel(attrs);
await FormService.load(form, dataSource); // Service-based
```

---

## � Impact

-   **Improved Architecture**: Clear separation of concerns makes the code easier to understand, test, and maintain.
-   **Enhanced Testability**: Models and services can be tested in isolation.
-   **No Breaking Changes**: The original API remains untouched, allowing for gradual adoption of the new patterns.

