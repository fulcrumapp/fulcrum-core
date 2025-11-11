# Versioning and Release Strategy

This document outlines the versioning, commit conventions, and release process for `fulcrum-core`.

---

## 🔢 Semantic Versioning

We follow [Semantic Versioning (SemVer)](https://semver.org/). Version numbers follow the `MAJOR.MINOR.PATCH` format.
- **MAJOR**: Breaking changes (none planned).
- **MINOR**: Backward-compatible new features.
- **PATCH**: Backward-compatible bug fixes.

---

## 📝 Commit Message Convention

We use the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages are used by our CI/CD pipeline to automatically determine version bumps and generate changelogs.

### Format
`<type>(<scope>): <subject>`

### Common Types
- `feat`: A new feature (triggers a **minor** release).
- `fix`: A bug fix (triggers a **patch** release).
- `perf`: A code change that improves performance (triggers a **patch** release).
- `docs`: Documentation-only changes (no release).
- `test`: Adding or correcting tests (no release).
- `refactor`: A code change that neither fixes a bug nor adds a feature (no release).
- `chore`: Changes to the build process or auxiliary tools (no release).

### Examples
```bash
# Triggers a patch release (e.g., 1.6.0 → 1.6.1)
git commit -m "fix: resolve type inference issue in FormModel"

# Triggers a minor release (e.g., 1.6.0 → 1.7.0)
git commit -m "feat: add TypeScript types export"
```

---

## 🚢 Release Process

Releases are fully automated by our CI/CD pipeline.

1.  **Merge to `main`**: A pull request is merged into the `main` branch.
2.  **CI Takes Over**: The CI pipeline automatically:
    -   Analyzes commit messages since the last release to determine the new version.
    -   Updates the `version` in `package.json`.
    -   Builds the project.
    -   Publishes the package to GitHub Packages.
    -   Creates a new GitHub release with automatically generated release notes.

**Important**: Never manually update the version in `package.json` or create version tags. The CI pipeline manages this process.

---

## 📅 Version Support

We provide support for recent versions of the library:
- **Current Version**: Receives active support, including new features and bug fixes.
- **Previous Versions**: Receive critical bug and security fixes only.

We recommend staying on the latest version to get the best support and features.
