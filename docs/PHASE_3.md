# Phase 3: Create Pure TypeScript Models

**Status**: 📅 PLANNED  
**Duration**: 2-3 weeks  
**Risk**: Low (additive strategy)  
**Impact**: High (improves architecture)

---

## 🎯 Goal

Create NEW TypeScript implementations of existing classes, with separation of concerns (model vs service), as completely parallel code.

---

## 🔑 Migration Strategy (ADDITIVE - Non-Breaking)

### Before (ActiveRecord) - STAYS INTACT

```javascript
// src/form.js - NOT TOUCHED
class Form {
  load(dataSource, callback) { ... }  // ✅ still works the same
}

// import { Form } from 'fulcrum-core';  ✅ STILL WORKS
```

### New (Separated) - ADDED

```typescript
// src/models/form.ts - NEW FILE
export class FormModel {
  constructor(attributes: FormAttributes) { ... }  // ✅ data + types only
}

// src/services/form-service.ts - NEW FILE
export class FormService {
  async load(form: FormModel, dataSource: DataSource) { ... }
}

// import { FormModel, FormService } from 'fulcrum-core/modern';  ✅ NEW
```

**⚠️ IMPORTANT**: Existing code is NOT modified. Only new implementations are added.

---

## 📋 Tasks

### 1. Create pure models layer IN PARALLEL
- [ ] Create `/src/models/` (new folder)
- [ ] Implement `FormModel` (TypeScript class based on form.js but NEW)
  - Constructor with `FormAttributes` (from Phase 2)
  - Only properties, getters, transformation methods
  - NO `load()`, `save()`, etc. methods
- [ ] Implement `RecordModel` (TypeScript class based on record.js but NEW)
  - Constructor with `RecordAttributes`
  - Only data, no persistence logic
- [ ] Implement `FeatureModel`, `UserModel`, `ProjectModel`, etc.
- [ ] Implement all `*ElementModel`
- [ ] Implement all `*ValueModel`
- [ ] ⚠️ Original files (.js) are NOT TOUCHED

### 2. Create services layer IN PARALLEL
- [ ] Create `/src/services/` (new folder)
- [ ] `FormService.load(form, dataSource)` → logic extracted from original form.js
- [ ] `RecordService.save(record, dataSource)` → logic extracted from original record.js
- [ ] `ValidationService.validate(feature)` → validation logic
- [ ] Dependency injection for DataSource

### 3. Separate exports (DO NOT break existing imports)
- [ ] `index.js` CONTINUES EXPORTING the same (100% compatible)
- [ ] Create `modern.ts` → exports FormModel, RecordModel, *Service
- [ ] `types.ts` already exists from Phase 2
- [ ] Configure `package.json` exports
- [ ] ⚠️ ZERO breaking changes in existing imports

### 4. Testing and documentation
- [ ] Tests for new models
- [ ] Tests for new services
- [ ] Modern API usage examples
- [ ] Side-by-side comparison with original API

---

## 📦 Deliverables

- New TypeScript classes with separation of concerns
- Independent and testable services
- Existing API 100% functional (untouched)
- Modern API available via `fulcrum-core/modern`
- Progressive adoption guide

---

## 💡 Usage Examples

### Original API (still works)
```javascript
// ✅ ORIGINAL API (no changes)
import { Form } from 'fulcrum-core';

const form = new Form(attrs);
await form.load(dataSource); // still works
```

### New Modern API (available but optional)
```typescript
// ✨ NEW API (available but optional)
import { FormModel, FormService } from 'fulcrum-core/modern';

const form = new FormModel(attrs);
await FormService.load(form, dataSource); // new pattern
```

---

## 📂 File Structure

```
src/
├── form.js              # ✅ INTACT - Original API still works
├── record.js            # ✅ INTACT - Original API still works
├── elements/            # ✅ INTACT - Original API still works
├── values/              # ✅ INTACT - Original API still works
│
├── models/              # ✨ NEW: Pure TypeScript models
│   ├── form-model.ts
│   ├── record-model.ts
│   ├── feature-model.ts
│   ├── elements/
│   └── values/
│
├── services/            # ✨ NEW: Separated business logic
│   ├── form-service.ts
│   ├── record-service.ts
│   ├── validation-service.ts
│   └── data-sources/
│
├── types/               # ✅ EXISTS from Phase 2
│
├── index.js             # ✅ ORIGINAL EXPORT - NOT TOUCHED
├── modern.ts            # ✨ NEW: Modern API export
└── types.ts             # ✅ EXISTS from Phase 2
```

---

## ✅ Success Criteria

### Functionality
- [ ] New models without DataSource dependencies
- [ ] 100% testable services
- [ ] Original API works without changes (ZERO breaking changes)
- [ ] Modern API available and documented
- [ ] Migration guide published

### Code Quality (see [CODE_STANDARDS.md](./CODE_STANDARDS.md))
- [ ] Clean of any ESLint issues
- [ ] 100% clean of SonarQube issues
- [ ] 90%+ test coverage for models and services
- [ ] No abandoned or bespoke dependencies
- [ ] No CodeQL security issues
- [ ] OpenTelemetry instrumentation hooks considered
- [ ] All public APIs have JSDoc/TSDoc documentation

---

## 📈 Expected Impact

### Before Phase 3
- 🔴 ActiveRecord pattern (mixed concerns)
- 🔴 Hard to test in isolation
- 🔴 Can't use models without data access
- 🔴 Limited code reuse

### After Phase 3
- 🟢 Separated models from services
- 🟢 Easy to test
- 🟢 Use models without data layer
- 🟢 Better code organization
- 🟢 Both APIs coexist

---

## ⏭️ Next Steps

After Phase 3 completion:
1. Publish updated package
2. Document migration paths
3. Create usage examples
4. Begin Phase 4 (DX Improvements)
