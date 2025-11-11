# Contributing to fulcrum-core

Thank you for contributing to fulcrum-core! This guide will help you understand our development workflow and standards.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and yarn
- Git
- GitHub access with appropriate permissions

### Setup
```bash
# Clone the repository
git clone git@github.com:fulcrumapp/fulcrum-core.git
cd fulcrum-core

# Install dependencies
yarn install

# Run tests
yarn test

# Build the project
yarn build
```

---

## 🔄 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes
- Follow the [Code Standards](./docs/CODE_STANDARDS.md)
- Write tests for new features
- Update documentation as needed
- Follow the coding style (see below)

### 3. Test Your Changes
```bash
# Run tests
yarn test

# Run linting
yarn lint

# Check TypeScript compilation
yarn build
```

### 4. Commit Your Changes

**IMPORTANT**: Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# Feature (minor version bump)
git commit -m "feat: add new TypeScript types for RecordModel"

# Bug fix (patch version bump)
git commit -m "fix: resolve validation error in FormModel"

# Documentation (no version bump)
git commit -m "docs: update README with installation steps"

# Other changes (no version bump)
git commit -m "chore: update dependencies"
git commit -m "test: add unit tests for FormService"
git commit -m "refactor: simplify validation logic"
```

See [VERSIONING.md](./docs/VERSIONING.md#-commit-message-convention) for complete commit message guidelines.

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub.

---

## ⚠️ CRITICAL: Version Management

### DO NOT Manually Update Version

**❌ NEVER do this:**
```json
{
  "name": "fulcrum-core",
  "version": "1.7.0"  // ❌ DO NOT manually change this
}
```

**✅ The CI automatically handles versioning:**
- Version is determined by commit messages (conventional commits)
- Version in package.json is updated by CI during release
- Manual version changes will be overwritten by CI

**Why?** Our CI/CD pipeline uses automated semantic versioning based on commit messages. Manual version changes will cause conflicts and deployment issues.

---

## 📋 Code Quality Standards

All contributions must meet these standards (see [CODE_STANDARDS.md](./docs/CODE_STANDARDS.md) for details):

### Before Submitting PR
- [ ] All tests pass (`yarn test`)
- [ ] No ESLint errors (`yarn lint`)
- [ ] Code builds successfully (`yarn build`)
- [ ] New code has tests (80%+ coverage)
- [ ] Documentation updated if needed
- [ ] Conventional commit messages used

### CI Checks
Your PR must pass these automated checks:
- ✅ ESLint (zero errors/warnings)
- ✅ TypeScript compilation
- ✅ Unit tests (all passing)
- ✅ Code coverage (meets thresholds)
- ✅ SonarQube analysis
- ✅ CodeQL security scan
- ✅ Dependency audit

---

## 🎨 Code Style

### TypeScript/JavaScript
- Use TypeScript for new code
- Follow existing code style
- Use meaningful variable names
- Add JSDoc/TSDoc comments for public APIs
- Keep functions small and focused

### Example
```typescript
/**
 * Loads a form from the data source
 * @param form - The form model to load
 * @param dataSource - The data source to load from
 * @returns Promise that resolves when form is loaded
 */
async function loadForm(form: FormModel, dataSource: DataSource): Promise<void> {
  // Implementation
}
```

### Formatting
We use Prettier and ESLint for code formatting:
```bash
# Auto-fix formatting issues
yarn lint --fix
```

---

## 🧪 Testing

### Writing Tests
```typescript
import { FormModel } from '../src/models/form-model';

describe('FormModel', () => {
  it('should create instance with attributes', () => {
    const attrs = { name: 'Test Form', id: '123' };
    const form = new FormModel(attrs);
    
    expect(form.name).toBe('Test Form');
    expect(form.id).toBe('123');
  });
});
```

### Running Tests
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

### Coverage Requirements
- New code: 85%+ coverage
- Models: 90%+ coverage
- Services: 90%+ coverage
- Utilities: 85%+ coverage

---

## 📚 Documentation

### What to Document
- Public APIs (classes, functions, interfaces)
- Configuration options
- Usage examples
- Breaking changes (in PR description)

### Where to Document
- **Code**: JSDoc/TSDoc comments
- **README.md**: Installation and basic usage
- **docs/**: Detailed guides and plans
- **PR Description**: Changes and rationale

---

## 🔍 Pull Request Process

### PR Checklist
- [ ] Branch is up to date with main
- [ ] All CI checks pass
- [ ] Code reviewed by at least one team member
- [ ] No merge conflicts
- [ ] Documentation updated
- [ ] Breaking changes clearly documented (if any)

### PR Title
Use conventional commit format:
```
feat: add TypeScript types for all models
fix: resolve memory leak in FormService
docs: update modernization plan
```

### PR Description Template
```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix (patch)
- [ ] New feature (minor)
- [ ] Breaking change (major)
- [ ] Documentation update

## Testing
How was this tested?

## Quality Checklist
- [ ] Tests pass
- [ ] ESLint clean
- [ ] Coverage maintained/improved
- [ ] Documentation updated

## Related Issues
Closes #123
```

---

## 🚢 Release Process

**For Maintainers Only**

Releases are automated via CI. See [VERSIONING.md](./docs/VERSIONING.md#-release-process) for details.

**Summary:**
1. Merge PR to main
2. CI automatically determines version from commits
3. CI builds, tests, and publishes
4. CI creates GitHub release with notes

**DO NOT**:
- Manually update version in package.json
- Manually create version tags
- Manually publish to GitHub Packages

---

## 🎯 Modernization Phases

This project is undergoing modernization. See [docs/](./docs/) for the complete plan.

### Key Principles
1. **Zero Breaking Changes** - Original API stays intact
2. **Additive Strategy** - Only add, never remove
3. **Quality First** - All code meets Fulcrum standards

### Current Status
- ✅ Phase 1: Library Configuration (Complete)
- 🔄 Phase 2: TypeScript Types (In Progress)
- 📅 Phase 3-5: Planned

---

## ❓ Questions?

- **Code Standards**: See [docs/CODE_STANDARDS.md](./docs/CODE_STANDARDS.md)
- **Versioning**: See [docs/VERSIONING.md](./docs/VERSIONING.md)
- **Architecture**: See [docs/OVERVIEW.md](./docs/OVERVIEW.md)
- **Slack**: #fulcrum-core channel
- **Issues**: GitHub Issues

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to fulcrum-core! 🎉
