# Versioning and Release Strategy

This document outlines the versioning, commit conventions, and release process for `fulcrum-core`.

---

## 🔢 Semantic Versioning

We follow [Semantic Versioning (SemVer)](https://semver.org/). Version numbers use the `MAJOR.MINOR.PATCH` format:
- **MAJOR**: Breaking changes (API incompatibility).
- **MINOR**: New features (backward-compatible).
- **PATCH**: Bug fixes (backward-compatible).

---

## 📝 Commit Message Convention & Version Bump Rules

The CI pipeline analyzes commit messages to automatically determine version bumps. Use these keywords:

| Message Contains | Version Bump | Example |
|-----------------|--------------|---------|
| `major changes` | **Major** (1.0.0 → 2.0.0) | Breaking API changes |
| `breaking changes` | **Minor** (1.0.0 → 1.1.0) | New features |
| No keywords | **Patch** (1.0.0 → 1.0.1) | Bug fixes, improvements |

### Examples

```bash
# Major version bump (breaking changes)
git commit -m "major changes: migrate to @fulcrumapp/fulcrum-core"

# Minor version bump (new features)
git commit -m "breaking changes: add TypeScript types export"

# Patch version bump (bug fixes)
git commit -m "fix: resolve validation error in FormModel"
```

### Important Notes

- The CI reads **all commit messages** in a PR/push, not just the merge commit.
- Keywords are case-insensitive.
- Multiple commits with different keywords use the highest version bump.
- Use `major changes` only for true breaking changes (API incompatibility).
- Use `breaking changes` for new features that remain backward-compatible.

---

## 🚢 Release Process

Releases are fully automated by the CI/CD pipeline:

1. **Merge to `main`**: A pull request is merged.
2. **CI Takes Over**: The pipeline automatically:
   - Analyzes commit messages to determine the version bump.
   - Updates `package.json` with the new version.
   - Builds the project.
   - Publishes to GitHub Packages.
   - Creates a GitHub release with generated release notes.

**Important**: Never manually update the version in `package.json` or create version tags. The CI manages this automatically.

---

## 📅 Version Support

- **Current Version**: Full support (new features and bug fixes).
- **Previous Versions**: Critical bug and security fixes only.

We recommend staying on the latest version for the best support and features.
