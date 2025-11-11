# Code Quality Standards

This document outlines the code quality standards for `fulcrum-core`. All contributions must adhere to these standards to ensure a high-quality, maintainable codebase.

---

## 📋 Quality Requirements

All code must pass the following automated quality gates:

1.  **ESLint**: Code must be free of ESLint errors and warnings.
    - **Check**: `yarn lint`

2.  **Testing & Coverage**: All new features and fixes must include tests.
    - **Check**: `yarn test`
    - **Coverage Targets**:
        - New Code: ≥ 85%
        - Models & Services: ≥ 90%

3.  **SonarQube**: Code must be clean of SonarQube issues.
    - No new bugs, vulnerabilities, or code smells.

4.  **CodeQL**: The codebase must be free of CodeQL security alerts.
    - All critical and high-severity alerts must be fixed before merging.

5.  **Dependency Health**: Dependencies must be kept up-to-date and secure.
    - No abandoned or insecure packages.
    - **Check**: `yarn audit` and `npx depcheck`

---

## 🛠️ Tools & Automation

### Pre-commit Hooks
We use `husky` and `lint-staged` to enforce standards before committing. These hooks automatically format code and run checks.

### Continuous Integration (CI)
Every pull request triggers a CI pipeline that runs a comprehensive suite of checks, including:
- ESLint
- TypeScript compilation
- Unit tests and code coverage
- SonarQube and CodeQL analysis
- Dependency audit

A PR cannot be merged unless all CI checks pass.

---

## 📝 Exception Process

If a requirement cannot be met, the exception must be documented in the pull request with a clear justification and a plan for remediation. Technical debt should be tracked with a corresponding ticket.
