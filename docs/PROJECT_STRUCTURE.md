# Project Structure

This document outlines the final directory structure of `fulcrum-core` after the modernization.

---

## 📂 Directory Layout

```
fulcrum-core/
├── src/
│   ├── form.js              # Original API (untouched)
│   ├── record.js            # Original API (untouched)
│   ├── elements/            # Original API (untouched)
│   │
│   ├── models/              # ✨ NEW: Pure TypeScript models
│   │   ├── form-model.ts
│   │   └── record-model.ts
│   │
│   ├── services/            # ✨ NEW: Separated business logic
│   │   ├── form-service.ts
│   │   └── record-service.ts
│   │
│   ├── types/               # ✨ NEW: TypeScript types and interfaces
│   │   └── api-attributes.ts
│   │
│   ├── index.js             # Original API entry point
│   ├── modern.ts            # Modern API entry point
│   └── types.ts             # Types-only entry point
│
├── dist/                    # Build output (not versioned)
│
├── test/
│   ├── (existing tests)     # Tests for original API
│   ├── models/              # ✨ NEW: Tests for new models
│   └── services/            # ✨ NEW: Tests for new services
│
├── docs/
│   ├── OVERVIEW.md
│   ├── PHASE_1.md
│   ├── ... (phase documents)
│   ├── PROJECT_STRUCTURE.md
│   ├── USAGE_PATTERNS.md
│   └── VERSIONING.md
│
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 📦 Package Exports

The `package.json` `exports` field allows consumers to import from different entry points:

### Original API
The default entry point provides the original, backward-compatible API.
```javascript
import { Form, Record } from 'fulcrum-core';
```

### Modern API
The `/modern` entry point provides the new, TypeScript-first API with separated models and services.
```typescript
import { FormModel, FormService } from 'fulcrum-core/modern';
```

### Types Only
The `/types` entry point exports only TypeScript definitions, adding no runtime code.
```typescript
import type { FormAttributes } from 'fulcrum-core/types';
```

