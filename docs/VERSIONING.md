# Versioning Strategy

This document describes the versioning and release strategy for fulcrum-core.

---

## 🔢 Semantic Versioning

We follow [Semantic Versioning 2.0.0](https://semver.org/):

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Breaking changes (API changes that break existing code)
- **MINOR**: New features (backward compatible additions)
- **PATCH**: Bug fixes (backward compatible fixes)

---

## 📅 Release Timeline

### Current: v1.5.x
- Original codebase
- ActiveRecord pattern
- Mixed JS/TS

### Phase 1: v1.6.0 (October 2025)
**Changes**: Library configuration  
**Type**: MINOR (additive only)

```
✨ NEW:
- Configured for GitHub Packages
- TypeScript declarations properly exposed
- dist/ removed from Git

✅ UNCHANGED:
- All existing APIs work the same
- No breaking changes
- Zero migration needed
```

### Phase 2: v1.7.0 (November 2025)
**Changes**: TypeScript types export  
**Type**: MINOR (additive only)

```
✨ NEW:
- Types exported via 'fulcrum-core/types'
- Complete type definitions
- IntelliSense support

✅ UNCHANGED:
- All existing APIs work the same
- No breaking changes
```

### Phase 3: v1.8.0 (December 2025)
**Changes**: Modern API with models/services  
**Type**: MINOR (additive only)

```
✨ NEW:
- Modern API via 'fulcrum-core/modern'
- Separated models and services
- Full TypeScript implementation

✅ UNCHANGED:
- Original API works the same
- No breaking changes
- Both APIs coexist
```

### Phase 4: v1.9.0 (January 2026)
**Changes**: DX improvements  
**Type**: MINOR (additive only)

```
✨ NEW:
- Builders and utilities
- Test helpers
- Enhanced documentation

✅ UNCHANGED:
- Both APIs work the same
```

### Phase 5: v1.10.0 (February 2026)
**Changes**: Optimization  
**Type**: MINOR (additive only)

```
✨ NEW:
- Optimized bundle size
- Performance improvements
- Enhanced test coverage

✅ UNCHANGED:
- Both APIs work the same
```

---

## 🚀 Future Versions

### v1.x.x (2026+)
- Iterative improvements
- New features in modern API
- Bug fixes in both APIs
- Performance enhancements
- **NO breaking changes**

### v2.0.0+ (Years later, if ever)
- Both APIs continue to coexist
- NO plans to remove original API
- Deprecation only if absolutely necessary
- Clear migration path if needed

---

## 🔄 Version Compatibility

### Backward Compatibility Matrix

| Version | Original API | Modern API | Types |
|---------|-------------|------------|-------|
| v1.5.x | ✅ | ❌ | ❌ |
| v1.6.x | ✅ | ❌ | ❌ |
| v1.7.x | ✅ | ❌ | ✅ |
| v1.8.x | ✅ | ✅ | ✅ |
| v1.9.x | ✅ | ✅ | ✅ |
| v1.10.x | ✅ | ✅ | ✅ |
| v2.0.x | ✅ | ✅ | ✅ |

**Key**: ✅ Available | ❌ Not available

---

## 📦 Release Process

### 1. Development
- Work on feature branch
- Write tests
- Update documentation
- Code review

### 2. Pre-release
- Run full test suite
- Build dist/
- Verify package contents
- Test in consuming project

### 3. Version Bump
```bash
# Patch release (bug fix)
npm version patch

# Minor release (new feature)
npm version minor

# Major release (breaking change)
npm version major
```

### 4. Publish
```bash
# Build
npm run build

# Publish to GitHub Packages
npm publish
```

### 5. Announcement
- Update changelog
- Announce in Slack
- Update documentation
- Create GitHub release

---

## 🏷️ Version Tags

### Git Tags
```bash
v1.6.0  # Phase 1 complete
v1.7.0  # Phase 2 complete
v1.8.0  # Phase 3 complete
v1.9.0  # Phase 4 complete
v1.10.0 # Phase 5 complete
```

### npm dist-tags
```bash
latest   # Stable release
next     # Pre-release
beta     # Beta testing
```

---

## 🔒 Deprecation Policy

### NO Deprecations Planned

The original API will **NOT** be deprecated. Both APIs will coexist indefinitely.

### If Deprecation Ever Needed (unlikely)

1. **Announce** 6 months in advance
2. **Deprecation Warning** in console
3. **Migration Guide** provided
4. **Support Period** of 12+ months
5. **Clear Timeline** communicated

---

## 📊 Version Support

| Version | Status | Support End |
|---------|--------|-------------|
| v1.10.x | Current | Active |
| v1.9.x | Previous | Bug fixes only |
| v1.8.x | Previous | Bug fixes only |
| v1.7.x | Old | Security fixes only |
| v1.6.x | Old | Security fixes only |
| v1.5.x | Legacy | End of life |

**Support Duration**: 
- Current version: Full support
- Previous 2 versions: Bug fixes
- Older versions: Security fixes only

---

## 🆙 Upgrade Guide

### From v1.5.x to v1.6.x
```bash
# Update package
npm install fulcrum-core@latest

# Update .npmrc
@fulcrumapp:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

# No code changes needed ✅
```

### From v1.6.x to v1.7.x
```bash
# Update package
npm install fulcrum-core@latest

# Optionally use types
import type { FormAttributes } from 'fulcrum-core/types';

# No code changes needed ✅
```

### From v1.7.x to v1.8.x
```bash
# Update package
npm install fulcrum-core@latest

# Optionally use modern API
import { FormModel } from 'fulcrum-core/modern';

# Original API still works ✅
```

---

## 📝 Changelog

See [CHANGELOG.md](../CHANGELOG.md) for detailed version history.

---

## 🎯 Versioning Principles

1. **No Breaking Changes**: Original API is sacred
2. **Additive Only**: Only add, never remove
3. **Semantic Versioning**: Follow SemVer strictly
4. **Clear Communication**: Announce changes early
5. **Long-term Support**: Support older versions
6. **Migration Paths**: Always provide upgrade guides
