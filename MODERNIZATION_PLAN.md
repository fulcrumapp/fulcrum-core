# Modernization Plan - fulcrum-core

**Date**: October 16, 2025  
**Branch**: poc/setup  
**Goal**: Transform fulcrum-core into a modern, maintainable, and reusable TypeScript library

---

## 📋 Identified Problems

### 1. **Dist in repository** ✅ CRITICAL
- The `dist/` directory is versioned (708 files)
- Makes PR reviews extremely difficult
- Unnecessarily increases repository size
- Doesn't follow library development best practices

### 2. **Inadequate library configuration** ✅ CRITICAL
- No publication configuration (exports, types)
- Missing `types` field in package.json
- No ESM + CommonJS support (CommonJS only)
- Missing documentation for library usage

### 3. **Mixed models and services** ⚠️ IMPORTANT
- ActiveRecord pattern (classes with persistence logic)
- Example: `Form.load()`, `Record.save()` mix model + service
- Difficult to test and reuse
- Can't use types without bringing data access dependencies

### 4. **Lack of complete TypeScript types** ⚠️ IMPORTANT
- Mixed JS/TS codebase
- Each consumer creates their own partial types
- No consistently exported types
- Re-writing utilities in every project

---

## 🎯 Plan Goals

1. **Modern and maintainable library**
2. **Clear separation of concerns** (Models vs Services)
3. **Complete TypeScript** with exportable types
4. **Backward compatibility** during transition
5. **Improved Developer Experience** for consumers

---

## 📅 Implementation Plan (5 Phases)

### **PHASE 1: Basic Library Configuration** 🟢 START IMMEDIATELY
**Estimated duration**: 1-2 days  
**Risk**: Low  
**Impact**: High (immediate DX improvement)

#### Tasks:
1. **Exclude dist from repository**
   - [ ] Add `/dist` to `.gitignore`
   - [ ] Remove dist from Git history (optional, can be done later)
   - [ ] Update CI/CD to build dist in pipeline

2. **Improve package.json**
   - [ ] Add `types` field pointing to declarations
   - [ ] Configure `exports` for dual package (ESM + CommonJS)
   - [ ] Add `files` field (only include dist in publish)
   - [ ] Update script `prepublish` → `prepublishOnly`
   - [ ] Add `prepare` script for Git installation

3. **Build configuration**
   - [ ] Update tsconfig.json for dual output
   - [ ] Create tsconfig.esm.json for ESM build
   - [ ] Update build scripts
   - [ ] Configure .npmignore appropriately

**Deliverables**:
- Updated `.gitignore`
- `package.json` with modern configuration
- Functional build pipeline
- Basic usage documentation

---

### **FASE 2: Crear Tipos TypeScript (Sin tocar código existente)** �
**Duración estimada**: 3-5 días  
**Riesgo**: Bajo  
**Impacto**: Alto (habilita IntelliSense inmediatamente)

#### Objetivo:
Crear SOLO las definiciones de tipos TypeScript que describen las entidades existentes, sin cambiar ningún código .js

#### Tareas:
1. **Crear archivo de tipos centralizados**
   - [ ] Crear `/src/types/api-attributes.ts`
   - [ ] Definir `FormAttributes` (basado en form.js)
   - [ ] Definir `RecordAttributes` (basado en record.js)
   - [ ] Definir `FeatureAttributes` (basado en feature.ts)
   - [ ] Definir todos los `*ElementAttributes`
   - [ ] Definir todos los `*ValueAttributes`

2. **Crear tipos de configuración**
   - [ ] `DataSourceConfig`
   - [ ] `ValidationConfig`
   - [ ] `LoadOptions`, `SaveOptions`, etc.

3. **Exportar para uso externo**
   - [ ] Crear `/src/types.ts` como entry point
   - [ ] Configurar en package.json exports
   - [ ] ⚠️ NINGÚN archivo .js es modificado

**Entregables**:
- Archivo `types.ts` exportable
- IntelliSense disponible vía `import type from 'fulcrum-core/types'`
- Documentación de tipos con TSDoc
- CERO cambios en código existente

**Ejemplo de uso inmediato**:
```typescript
// Otros repos ahora pueden hacer:
import type { FormAttributes, RecordAttributes } from 'fulcrum-core/types';

interface MyData {
  form: FormAttributes;  // ✅ tipos oficiales, sin custom partials
  records: RecordAttributes[];
}
```

---

### **PHASE 3: Create Pure TypeScript Models (New code in parallel)** 🟡
**Estimated duration**: 2-3 weeks  
**Risk**: Low (additive strategy)  
**Impact**: High (improves architecture)

#### Goal:
Create NEW TypeScript implementations of existing classes, with separation of concerns (model vs service), as completely parallel code.

#### Migration strategy (ADDITIVE - Non-Breaking):

```
Before (ActiveRecord) - STAYS INTACT:
  // src/form.js - NOT TOUCHED
  class Form {
    load(dataSource, callback) { ... }  // ✅ still works the same
  }
  
  // import { Form } from 'fulcrum-core';  ✅ STILL WORKS

New (Separated) - ADDED:
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

#### Tasks:
1. **Create pure models layer IN PARALLEL**
   - [ ] Create `/src/models/` (new folder)
   - [ ] Implement `FormModel` (TypeScript class based on form.js but NEW)
     - Constructor with `FormAttributes` (from PHASE 2)
     - Only properties, getters, transformation methods
     - NO `load()`, `save()`, etc. methods
   - [ ] Implement `RecordModel` (TypeScript class based on record.js but NEW)
     - Constructor with `RecordAttributes`
     - Only data, no persistence logic
   - [ ] Implement `FeatureModel`, `UserModel`, `ProjectModel`, etc.
   - [ ] Implement all `*ElementModel`
   - [ ] Implement all `*ValueModel`
   - [ ] ⚠️ Original files (.js) are NOT TOUCHED

2. **Create services layer IN PARALLEL**
   - [ ] Create `/src/services/` (new folder)
   - [ ] `FormService.load(form, dataSource)` → logic extracted from original form.js
   - [ ] `RecordService.save(record, dataSource)` → logic extracted from original record.js
   - [ ] `ValidationService.validate(feature)` → validation logic
   - [ ] Dependency injection for DataSource

3. **Separate exports (DO NOT break existing imports)**
   - [ ] `index.js` CONTINUES EXPORTING the same (100% compatible)
   - [ ] Create `modern.ts` → exports FormModel, RecordModel, *Service
   - [ ] `types.ts` already exists from PHASE 2
   - [ ] Configure `package.json` exports
   - [ ] ⚠️ ZERO breaking changes in existing imports

4. **Testing and documentation**
   - [ ] Tests for new models
   - [ ] Tests for new services
   - [ ] Modern API usage examples
   - [ ] Side-by-side comparison with original API

**Deliverables**:
- New TypeScript classes with separation of concerns
- Independent and testable services
- Existing API 100% functional (untouched)
- Modern API available via `fulcrum-core/modern`
- Progressive adoption guide

**Result example**:
```typescript
// ✅ ORIGINAL API (no changes)
import { Form } from 'fulcrum-core';
const form = new Form(attrs);
await form.load(dataSource); // still works

// ✨ NEW API (available but optional)
import { FormModel, FormService } from 'fulcrum-core/modern';
const form = new FormModel(attrs);
await FormService.load(form, dataSource); // new pattern
```

---

### **PHASE 4: DX and Utilities Improvement** 🟢
**Estimated duration**: 1 week  
**Risk**: Low  
**Impact**: Medium (quality of life)

#### Tasks:
1. **Type helpers and utilities**
   - [ ] Create exportable utility types
   - [ ] Partial types for each entity
   - [ ] Type guards for runtime checking
   - [ ] Branded types where applicable

2. **Builders and factories**
   - [ ] FormBuilder for fluent construction
   - [ ] RecordBuilder
   - [ ] Test helpers/fixtures

3. **Documentation**
   - [ ] Updated README with examples
   - [ ] Detailed migration guide
   - [ ] API documentation (TypeDoc)
   - [ ] Common usage examples

4. **Tooling**
   - [ ] Prettier configured
   - [ ] ESLint updated
   - [ ] Husky for pre-commit hooks
   - [ ] Commitlint

**Deliverables**:
- Reusable utilities
- Complete documentation
- Modern tooling
- Usage examples

---

### **PHASE 5: Optimization and Cleanup** 🟢
**Estimated duration**: 1 week  
**Risk**: Low  
**Impact**: Medium (performance and size)

#### Tasks:
1. **Tree-shaking optimization**
   - [ ] Analyze bundle size
   - [ ] Optimize exports
   - [ ] Remove dead code

2. **Performance**
   - [ ] Identify bottlenecks
   - [ ] Optimize hot paths
   - [ ] Benchmarks

3. **Testing**
   - [ ] 80%+ coverage
   - [ ] Integration tests
   - [ ] Performance tests

4. **Deprecation plan**
   - [ ] Plan legacy API removal (if ever needed)
   - [ ] Versioning strategy
   - [ ] Communication plan

**Deliverables**:
- Optimized library
- Comprehensive tests
- Clear deprecation plan (if needed)

---

## 📊 Final Project Structure

```
fulcrum-core/
├── src/
│   ├── form.js              # ✅ INTACT - Original API still works
│   ├── record.js            # ✅ INTACT - Original API still works
│   ├── feature.ts           # ✅ INTACT - Original API still works
│   ├── user.js              # ✅ INTACT - Original API still works
│   ├── project.js           # ✅ INTACT - Original API still works
│   ├── elements/            # ✅ INTACT - Original API still works
│   ├── values/              # ✅ INTACT - Original API still works
│   ├── utils/               # ✅ INTACT - migrate to TS gradually
│   ├── validation/          # ✅ INTACT - migrate to TS gradually
│   │
│   ├── models/              # ✨ NEW: Pure TypeScript models
│   │   ├── form-model.ts    # Based on form.js but no dependencies
│   │   ├── record-model.ts  # Based on record.js but no dependencies
│   │   ├── feature-model.ts # Based on feature.ts but no dependencies
│   │   ├── user-model.ts
│   │   ├── project-model.ts
│   │   ├── elements/        # All elements with -model suffix
│   │   └── values/          # All values with -model suffix
│   │
│   ├── services/            # ✨ NEW: Separated business logic
│   │   ├── form-service.ts
│   │   ├── record-service.ts
│   │   ├── validation-service.ts
│   │   └── data-sources/
│   │
│   ├── types/               # ✨ NEW: TypeScript types and interfaces
│   │   ├── api-attributes.ts   # FormAttributes, RecordAttributes, etc.
│   │   ├── config.ts
│   │   ├── helpers.ts          # Type helpers and utilities
│   │   └── index.ts
│   │
│   ├── index.js             # ✅ ORIGINAL EXPORT - NOT TOUCHED
│   ├── modern.ts            # ✨ NEW: Modern API export
│   └── types.ts             # ✨ NEW: Types-only export
│
├── dist/                    # ⛔ NOT VERSIONED (generated in CI)
├── test/
│   ├── (existing tests)     # ✅ STILL WORK
│   └── models/              # ✨ NEW: Tests for new models
│
├── docs/
│   ├── ADOPTION.md          # ✨ NEW: Adoption guide (optional)
│   └── API_MODERN.md        # ✨ NEW: Modern API documentation
│
├── .gitignore               # ✅ UPDATED
├── package.json             # ✅ UPDATED (multiple exports)
├── tsconfig.json            # ✅ UPDATED
├── tsconfig.esm.json        # ✨ NEW
└── README.md                # ✅ UPDATED (document both APIs)
```

---

## 🔄 Versioning Strategy

### Semantic Versioning (NO Breaking Changes)

- **v1.6.0**: Add modern API (ADDITIVE)
  - NEW: Pure TypeScript models in `/models`
  - NEW: Services in `/services`
  - NEW: Entry point `fulcrum-core/modern`
  - NEW: Entry point `fulcrum-core/types`
  - ✅ Original API 100% intact
  
- **v1.x.x**: Iterative improvements
  - New features in modern API
  - Bug fixes in both APIs
  - More TypeScript models and services
  - Performance improvements
  
- **v2.0.0+**: Future (years later, if ever)
  - Both APIs continue to coexist
  - NO plans to remove original API
  - Deprecation only if absolutely necessary

---

## 🎓 Usage Patterns (API Coexistence)

### Option 1: Original API (v1.x) - ✅ STILL WORKS THE SAME
```typescript
// Existing code does NOT need changes
import { Form, Record } from 'fulcrum-core';

const form = new Form(attributes);
await form.load(dataSource); // ✅ still works perfectly

const record = new Record(attrs, form);
await record.save(dataSource); // ✅ still works perfectly

// ⚠️ NOTHING BREAKS, NOTHING NEEDS TO CHANGE
```

### Option 2: Modern API (v1.6+) - ✨ NEW, OPTIONAL
```typescript
// For new projects or gradual adoption
import { FormModel, RecordModel } from 'fulcrum-core/modern';
import { FormService, RecordService } from 'fulcrum-core/modern';

const form = new FormModel(attributes); // ✨ Pure TypeScript
await FormService.load(form, dataSource); // ✨ Separated logic

const record = new RecordModel(attrs, form);
await RecordService.save(record, dataSource);

// ✅ Separation of concerns
// ✅ Complete TypeScript
// ✅ Independently testable
```

### Option 3: Types Only (v1.6+) - ✨ NEW, SUPER USEFUL
```typescript
// For projects that only need types without runtime
import type { 
  FormAttributes, 
  RecordAttributes,
  FormModel,
  RecordModel 
} from 'fulcrum-core/types';

function processForm(form: FormModel) {
  // ✅ Complete TypeScript
  // ✅ ZERO runtime code
  // ✅ NO more custom partial types
}

interface MyFormData {
  form: FormAttributes; // ✅ official types
  records: RecordAttributes[];
}
```

### Option 4: Mix Both (Gradual migration)
```typescript
// Use original API for some things, modern for others
import { Form, Record } from 'fulcrum-core'; // original
import { FormModel } from 'fulcrum-core/modern'; // modern
import type { RecordAttributes } from 'fulcrum-core/types'; // types only

// ✅ Total flexibility
// ✅ Migration without pressure
// ✅ Progressive adoption
```

---

## ✅ Success Criteria

### Phase 1
- [ ] dist is not in Git
- [ ] npm publish works correctly
- [ ] CI/CD builds dist automatically

### Phase 2
- [ ] Types exported and available
- [ ] IntelliSense works for all entities
- [ ] TypeScript strict mode without errors for types

### Phase 3
- [ ] New models without DataSource dependencies
- [ ] 100% testable services
- [ ] Original API works without changes (ZERO breaking changes)

### Phase 4
- [ ] Complete documentation
- [ ] Working examples
- [ ] Improved DX (no more custom partial types)

### Phase 5
- [ ] Optimized bundle size (tree-shaking works)
- [ ] 80%+ test coverage for new code
- [ ] Performance benchmarks OK
- [ ] Both APIs working in parallel

---

## 🎯 Current Status

### ✅ Phase 1: COMPLETE (October 16, 2025)

**Completed:**
- ✅ Removed dist/ from version control (708 files)
- ✅ Configured package for GitHub Packages (`@fulcrumapp/fulcrum-core`)
- ✅ Added TypeScript build configuration (`types` field)
- ✅ Created CI/CD workflows (automated testing & publishing)
- ✅ Updated documentation (README with installation guide)

**Changes Made:**
```diff
package.json:
+ "name": "@fulcrumapp/fulcrum-core"
+ "types": "dist/index.d.ts"
+ "publishConfig": { "registry": "https://npm.pkg.github.com" }

.gitignore:
+ dist/

New Files:
+ .github/workflows/ci.yml
+ .github/workflows/publish.yml
+ .npmignore
```

**Impact:**
- 🎉 PRs are now much cleaner (no dist/ changes)
- 🎉 Publishing simplified (GitHub Packages only)
- 🎉 CI/CD automated (tests + publish on release)
- ⚠️ Consumers need one-time update (package name + .npmrc)

### 🔄 Phase 2: In Progress

**Next Steps:**
- [ ] Create TypeScript type definitions
- [ ] Export types via `@fulcrumapp/fulcrum-core/types`
- [ ] Enable IntelliSense for consumers
- [ ] Zero changes to existing .js code

**Estimated Duration:** 3-5 days

### 📅 Upcoming Phases

- **Phase 3:** Separated models/services (2-3 weeks)
- **Phase 4:** DX improvements (1 week)
- **Phase 5:** Optimization (1 week)

---

## 📝 Important Notes

1. **⚠️ ZERO BREAKING CHANGES**: Original code is NOT touched, NOT modified
2. **Additive strategy**: Only ADD, never REMOVE or CHANGE
3. **Permanent coexistence**: Both APIs will coexist indefinitely
4. **No migration pressure**: Modern adoption is optional, not mandatory
5. **TypeScript as a service**: Provide types without forcing refactors
6. **Tests first**: New code 100% tested before merge
7. **Dual documentation**: Maintain docs for both APIs

---

## 🤝 Contribution and Coordination

- **Code reviews**: Easier without dist/
- **Testing**: Each PR must keep tests green
- **Documentation**: Update with each change
- **Communication**: Slack/Email for significant changes

---

## 📚 References

- [TypeScript Library Starter](https://github.com/alexjoverm/typescript-library-starter)
- [Dual Package Hazard](https://nodejs.org/api/packages.html#dual-package-hazard)
- [Active Record vs Data Mapper](https://www.martinfowler.com/eaaCatalog/activeRecord.html)
- [Semantic Versioning](https://semver.org/)

---

**Ready to start? I recommend starting with PHASE 1 today. It's low risk and high impact.**
