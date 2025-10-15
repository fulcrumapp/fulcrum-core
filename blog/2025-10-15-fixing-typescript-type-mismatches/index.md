---
slug: fixing-typescript-type-mismatches
title: Fixing TypeScript Type Mismatches in Parent-Child Classes
authors: [henry]
tags: [typescript, refactoring, types]
date: 2025-10-15
---

# Fixing TypeScript Type Mismatches in Parent-Child Classes

## Problem

The project had TypeScript definitions where child classes didn't properly fulfill parent class interfaces. This prevented using abstract parent types:

```typescript
let feature: Feature;
feature = new Record(); // ❌ Type error!
```

**Error:** `Type 'Record' is not assignable to type 'Feature'`

<!-- truncate -->

## Root Cause

The codebase was JavaScript with auto-generated `.d.ts` files. TypeScript inferred return types as `void` for abstract methods that threw errors:

```javascript
// feature.js
get id() {
  throw new Error('Not implemented'); // TypeScript infers: get id(): void
}
```

Child classes implemented these correctly, but the parent types were wrong, causing mismatches.

## Solution

### Step 1: Convert Parent Classes to TypeScript

Converted `feature.js` → `feature.ts` and `form-value.js` → `form-value.ts` with explicit types:

```typescript
// feature.ts
export default class Feature {
  get id(): string | null {
    return notImplemented();
  }
  
  get hasCoordinate(): boolean {
    return notImplemented();
  }
  
  // ... more methods with proper types
}
```

### Step 2: Fix MediaValue

Added missing `displayValue` getter to `media-value.js`:

```javascript
get displayValue() {
  if (this.isEmpty) return '';
  return this.length === 1 ? '1 Item' : `${this.length} Items`;
}
```

### Step 3: Verification

Created `test-types.ts` to verify all hierarchies:

```typescript
// Feature hierarchy
let feature: Feature;
feature = new Record(null, null); // ✅ Works!
feature = new RepeatableItemValue(null, {}, 0); // ✅ Works!

// FormValue hierarchy  
let formValue: FormValue;
formValue = new TextValue(null, null); // ✅ Works!
```

## Results

| Metric | Before | After |
|--------|--------|-------|
| Type errors | 37+ | 0 ✅ |
| Classes fixed | 3 parents | All hierarchies |
| Can use abstract types | ❌ | ✅ |

## Files Changed

- ✅ `src/feature.js` → `src/feature.ts`
- ✅ `src/values/form-value.js` → `src/values/form-value.ts`
- ✅ `src/values/media-value.js` (added `displayValue`)
- ✅ `.eslintrc` (disabled `no-underscore-dangle`)

## Key Learnings

1. **Explicit types beat inference** - When TypeScript infers from JavaScript, it can get types wrong
2. **Abstract classes need concrete types** - Even if methods throw, they need proper return types
3. **Test your types** - A dedicated type test file catches issues early
4. **Incremental migration works** - Didn't need to convert all 40+ child classes, just the parents

## Verification

Test file: [`test-types.ts`](./test-types.ts)

```bash
node_modules/.bin/tsc --noEmit blog/2025-10-15-fixing-typescript-type-mismatches/test-types.ts
```

Should complete with zero errors.
