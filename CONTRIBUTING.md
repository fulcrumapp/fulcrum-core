# Contributing to fulcrum-core

Thank you for contributing! This guide outlines our development workflow and standards to help you get started.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and yarn
- Git

### Setup
```bash
# 1. Clone the repository
git clone git@github.com:fulcrumapp/fulcrum-core.git
cd fulcrum-core

# 2. Install dependencies
yarn install

# 3. Run tests to verify setup
yarn test
```

---

## 🔄 Development Workflow

### 1. Create a Branch
Create a descriptive branch name based on the feature or fix.
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes
- Write clean, maintainable code.
- Follow the [Code Standards](./docs/CODE_STANDARDS.md).
- Write tests for all new features and bug fixes.

### 3. Test Your Changes
Ensure your changes pass all checks before creating a pull request.
```bash
# Run unit tests
yarn test

# Run linting
yarn lint
```

### 4. Commit Your Changes
We use [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning. Your commit messages **must** follow this format.

**Format**: `<type>(<scope>): <subject>`

- `feat`: A new feature (bumps minor version)
- `fix`: A bug fix (bumps patch version)
- `docs`: Documentation changes
- `test`: Adding or improving tests
- `refactor`: Code refactoring without changing behavior
- `chore`: Build process or dependency updates

**Examples**:
```bash
git commit -m "feat: add new TypeScript types for RecordModel"
git commit -m "fix: resolve validation error in FormModel"
git commit -m "docs: update README with installation steps"
```

### 5. Create a Pull Request
Push your branch and open a pull request on GitHub. Provide a clear description of your changes.

---

## ⚠️ Version Management

**Do not manually update the version in `package.json`**.

Our CI/CD pipeline automatically determines the version number from conventional commit messages and updates `package.json` during the release process. Manual changes will cause conflicts.

---

## 📋 Code Quality

All contributions must meet our quality standards. Before submitting a PR, ensure:
- [ ] All tests pass (`yarn test`).
- [ ] The code is free of linting errors (`yarn lint`).
- [ ] New code has sufficient test coverage.
- [ ] Documentation is updated if necessary.
- [ ] Commit messages follow the conventional commit format.

---

## 📚 Documentation

- **Code**: Add TSDoc comments for all public APIs.
- **Guides**: Update documentation in the `docs/` directory as needed.
- **Pull Request**: Clearly describe the changes and their purpose.

---

## ❓ Questions?

- **Code Standards**: See [docs/CODE_STANDARDS.md](./docs/CODE_STANDARDS.md)
- **Versioning**: See [docs/VERSIONING.md](./docs/VERSIONING.md)
- **Architecture**: See [docs/OVERVIEW.md](./docs/OVERVIEW.md)
- **Slack**: #fulcrum-core channel
- **Issues**: GitHub Issues
