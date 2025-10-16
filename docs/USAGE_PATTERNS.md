# Usage Patterns - API Coexistence

This document describes the different ways to use fulcrum-core, showing how both original and modern APIs coexist.

---

## 📚 Table of Contents

1. [Option 1: Original API](#option-1-original-api)
2. [Option 2: Modern API](#option-2-modern-api)
3. [Option 3: Types Only](#option-3-types-only)
4. [Option 4: Mix Both](#option-4-mix-both)
5. [Migration Guide](#migration-guide)

---

## Option 1: Original API

**Status**: ✅ Still works the same  
**Use when**: Existing code, no changes needed

### Installation
```bash
# .npmrc configuration
@fulcrumapp:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

# Install
npm install fulcrum-core
```

### Usage
```javascript
import { Form, Record } from 'fulcrum-core';

// Create and load form (ActiveRecord pattern)
const form = new Form(attributes);
await form.load(dataSource);

// Create and save record
const record = new Record(attrs, form);
await record.save(dataSource);

// Everything works exactly as before
console.log(form.name);
console.log(record.id);
```

**✅ Advantages**:
- No code changes needed
- Familiar API
- Works with existing tests
- Zero migration effort

**⚠️ Considerations**:
- Mixed concerns (model + service)
- Harder to test in isolation
- No TypeScript benefits

---

## Option 2: Modern API

**Status**: ✨ Available in v1.6+  
**Use when**: New projects or refactoring

### Installation
```bash
# Same as Option 1
npm install fulcrum-core
```

### Usage
```typescript
import { 
  FormModel, 
  RecordModel,
  FormService,
  RecordService 
} from 'fulcrum-core/modern';

// Create pure model
const form = new FormModel(attributes);

// Load via service
await FormService.load(form, dataSource);

// Create record
const record = new RecordModel(attrs, form);

// Save via service
await RecordService.save(record, dataSource);

// Full TypeScript support
console.log(form.name); // ✅ IntelliSense
console.log(record.id); // ✅ Type safety
```

**✅ Advantages**:
- Separated concerns
- Easy to test
- Full TypeScript
- Better architecture

**⚠️ Considerations**:
- Different API pattern
- Requires code changes
- Learning curve

---

## Option 3: Types Only

**Status**: ✨ Available in v1.6+  
**Use when**: Need types without runtime code

### Installation
```bash
# Same as above
npm install fulcrum-core
```

### Usage
```typescript
// Import ONLY types (no runtime code)
import type { 
  FormAttributes, 
  RecordAttributes,
  ElementAttributes,
  ValueAttributes,
  FormModel,
  RecordModel
} from 'fulcrum-core/types';

// Use in your application
interface MyData {
  form: FormAttributes;
  records: RecordAttributes[];
}

function processForm(form: FormModel) {
  console.log(form.name); // ✅ Type checking
  // No fulcrum-core runtime code included
}

// Works with any data source
const data: FormAttributes = await fetch('/api/form');
```

**✅ Advantages**:
- Zero runtime overhead
- Complete type safety
- No coupling to fulcrum-core runtime
- Smallest bundle size

**⚠️ Considerations**:
- Types only, no functionality
- Must implement logic yourself

---

## Option 4: Mix Both

**Status**: ✨ Recommended for migration  
**Use when**: Gradual adoption

### Usage
```typescript
// Mix original and modern APIs
import { Form } from 'fulcrum-core';           // original
import { RecordModel } from 'fulcrum-core/modern'; // modern
import type { FormAttributes } from 'fulcrum-core/types'; // types

// Use original API for forms
const form = new Form(attributes);
await form.load(dataSource);

// Use modern API for records
const record = new RecordModel(attrs, form);
await RecordService.save(record, dataSource);

// Use types for new code
function createForm(attrs: FormAttributes) {
  return new Form(attrs);
}
```

**✅ Advantages**:
- Gradual migration
- No pressure to refactor everything
- Adopt modern patterns incrementally
- Total flexibility

**⚠️ Considerations**:
- Mixed patterns in codebase
- Need to understand both APIs

---

## Migration Guide

### Step 1: Install Types (No code changes)
```typescript
// Add types to existing code
import { Form } from 'fulcrum-core';
import type { FormAttributes } from 'fulcrum-core/types';

function loadForm(attrs: FormAttributes) {
  const form = new Form(attrs);
  return form.load(dataSource);
}
```

### Step 2: Use Modern API for New Features
```typescript
// New features use modern API
import { FormModel, FormService } from 'fulcrum-core/modern';

async function createNewForm(attrs: FormAttributes) {
  const form = new FormModel(attrs);
  await FormService.load(form, dataSource);
  return form;
}
```

### Step 3: Refactor Incrementally
```typescript
// Refactor one module at a time
// Before
class MyComponent {
  async loadForm() {
    const form = new Form(attrs);
    await form.load(dataSource);
  }
}

// After
class MyComponent {
  async loadForm() {
    const form = new FormModel(attrs);
    await FormService.load(form, dataSource);
  }
}
```

### Step 4: Full Migration (Optional)
```typescript
// Eventually migrate everything (optional)
import { 
  FormModel, 
  RecordModel,
  FormService,
  RecordService 
} from 'fulcrum-core/modern';

// All code uses modern API
// But original API still works if needed
```

---

## Comparison Table

| Feature | Original API | Modern API | Types Only |
|---------|-------------|------------|------------|
| **Separation of Concerns** | ❌ Mixed | ✅ Separated | N/A |
| **TypeScript Support** | ⚠️ Partial | ✅ Full | ✅ Full |
| **Breaking Changes** | ✅ None | ✅ None | ✅ None |
| **Testing** | ⚠️ Harder | ✅ Easy | N/A |
| **Bundle Size** | Standard | Standard | ✅ Zero |
| **Learning Curve** | ✅ None | ⚠️ New pattern | ✅ Minimal |
| **Migration Effort** | ✅ Zero | ⚠️ Some work | ✅ Minimal |

---

## Recommendations

### For Existing Projects
1. Start with **Types Only** (zero risk)
2. Use **Modern API** for new features
3. Mix both during transition
4. No need to refactor everything

### For New Projects
1. Use **Modern API** from the start
2. Import types separately
3. Better architecture
4. Future-proof

### For Libraries
1. Use **Types Only** if possible
2. No runtime dependencies
3. Smallest footprint
4. Maximum compatibility

---

## 🆘 Need Help?

- Check the [Migration Guide](#migration-guide)
- Review [Phase Documentation](./README.md)
- Ask in Slack #fulcrum-core
- Open an issue on GitHub
