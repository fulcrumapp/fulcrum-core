# Code Quality Standards

This document outlines the code quality standards and compliance requirements for the fulcrum-core modernization project.

---

## 🎯 Fulcrum Coding Standards Compliance

All code changes must be compliant with Fulcrum coding standards and pass the following quality gates:

---

## 📋 Quality Requirements

### 1. ESLint Compliance
**Requirement**: Clean of any ESLint issues

- [ ] Zero ESLint errors
- [ ] Zero ESLint warnings (or approved suppressions with justification)
- [ ] Follow existing `.eslintrc` configuration
- [ ] No `eslint-disable` comments without explanation

**Verification**:
```bash
yarn lint
# Must return: All files pass linting
```

**CI/CD**: ESLint checks run automatically on all PRs

---

### 2. SonarQube Compliance
**Requirement**: 100% clean of SonarQube issues

- [ ] No bugs
- [ ] No vulnerabilities
- [ ] No code smells (or approved technical debt)
- [ ] No security hotspots
- [ ] Maintain or improve code quality rating

**Quality Gates**:
- Bugs: 0
- Vulnerabilities: 0
- Code Smells: Minimal (A rating)
- Security Hotspots: 0 or reviewed
- Duplications: < 3%

**Verification**: SonarQube dashboard must show green status

---

### 3. Code Coverage
**Requirement**: Met code coverage requirements

**Targets**:
- Overall coverage: ≥ 80%
- New code coverage: ≥ 85%
- Branch coverage: ≥ 70%

**Per Component**:
- Models: ≥ 90%
- Services: ≥ 90%
- Utilities: ≥ 85%
- Elements: ≥ 80%
- Values: ≥ 80%

**Verification**:
```bash
yarn test --coverage
```

**CI/CD**: Coverage reports generated on all PRs

---

### 4. Dependency Management
**Requirement**: Up to date dependencies with no abandoned packages

#### Dependency Health Checks
- [ ] All dependencies up to date (or documented exceptions)
- [ ] No abandoned packages (last updated > 2 years ago)
- [ ] No bespoke/custom dependencies (or justified and documented)
- [ ] All dependencies have active maintenance
- [ ] Security vulnerabilities addressed

**Tools**:
```bash
# Check for outdated dependencies
yarn outdated

# Check for security vulnerabilities
yarn audit

# Check dependency health
npx depcheck
```

#### Update Strategy
- **Patch updates**: Apply immediately (bug fixes)
- **Minor updates**: Review and apply within 1 sprint
- **Major updates**: Evaluate breaking changes, plan migration

#### Abandoned Package Definition
A package is considered abandoned if:
- Last published > 24 months ago
- No response to issues/PRs > 12 months
- Maintainer explicitly deprecated the package

**Action**: Replace with maintained alternative or fork if critical

---

### 5. CodeQL Security Analysis
**Requirement**: No CodeQL issues

- [ ] No security vulnerabilities
- [ ] No injection flaws
- [ ] No path traversal issues
- [ ] No command injection
- [ ] No SQL injection (if applicable)

**Severity Levels**:
- **Critical**: Must fix before merge
- **High**: Must fix or document exception
- **Medium**: Fix or create issue to track
- **Low**: Review and assess

**Verification**: GitHub Security tab shows no open CodeQL alerts

---

### 6. OpenTelemetry (OTEL) Instrumentation
**Requirement**: Consider OTEL instrumentation for observability

#### Scope
While not mandatory for Phase 1-2, OTEL instrumentation should be considered for:
- Performance monitoring
- Distributed tracing
- Error tracking
- Usage metrics

#### Implementation Phases
- **Phase 1-2**: Not required (focus on library setup)
- **Phase 3**: Consider for services layer
- **Phase 4**: Add instrumentation hooks
- **Phase 5**: Full OTEL integration (optional)

#### Key Metrics to Track (Future)
- Form load time
- Record save time
- Validation duration
- API call latency
- Error rates

**Documentation**: Create instrumentation guide if implemented

---

## 🔍 Quality Gates by Phase

### Phase 1: Library Configuration ✅
- [x] ESLint clean
- [x] No new SonarQube issues
- [x] Existing test coverage maintained
- [x] Dependencies audited
- [x] No CodeQL alerts

### Phase 2: TypeScript Types
- [ ] ESLint clean (TypeScript rules)
- [ ] SonarQube clean
- [ ] 100% type coverage for new types
- [ ] Dependencies up to date
- [ ] No CodeQL issues

### Phase 3: Models & Services
- [ ] ESLint clean
- [ ] SonarQube clean
- [ ] 90%+ coverage for new models/services
- [ ] No abandoned dependencies
- [ ] No CodeQL alerts
- [ ] Consider OTEL hooks

### Phase 4: DX Improvements
- [ ] ESLint clean
- [ ] SonarQube clean
- [ ] 85%+ coverage for utilities
- [ ] All dependencies current
- [ ] No security issues

### Phase 5: Optimization
- [ ] ESLint clean
- [ ] SonarQube A rating
- [ ] 80%+ overall coverage
- [ ] Zero abandoned packages
- [ ] Zero security vulnerabilities
- [ ] OTEL instrumentation evaluated

---

## 🛠️ Tools & Automation

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "yarn test"
    }
  },
  "lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### CI/CD Checks
Every PR must pass:
1. ESLint check
2. TypeScript compilation
3. Unit tests
4. Coverage thresholds
5. SonarQube analysis
6. CodeQL scan
7. Dependency audit

---

## 📊 Compliance Dashboard

### Current Status
| Requirement | Status | Notes |
|------------|--------|-------|
| ESLint | 🟢 Clean | No issues |
| SonarQube | 🟡 Review | Legacy issues documented |
| Code Coverage | 🟢 85% | Meets target |
| Dependencies | 🟢 Current | Last updated: Nov 2025 |
| CodeQL | 🟢 Clean | No alerts |
| OTEL | ⚪ N/A | Phase 3+ consideration |

**Legend**: 🟢 Pass | 🟡 Review Needed | 🔴 Failed | ⚪ Not Applicable

---

## 📝 Exception Process

If unable to meet a requirement:

1. **Document the exception**
   - What: Specific requirement not met
   - Why: Technical or business reason
   - Impact: Risk assessment
   - Plan: Remediation timeline

2. **Get approval**
   - Tech Lead review
   - Document in PR description
   - Add TODO/FIXME with ticket reference

3. **Track technical debt**
   - Create Jira ticket
   - Set remediation timeline
   - Review in sprint planning

---

## 🔄 Continuous Improvement

### Quarterly Reviews
- Evaluate coverage trends
- Review dependency health
- Update ESLint/SonarQube rules
- Assess new security practices

### Annual Updates
- Review and update standards
- Evaluate new tools
- Update CI/CD pipeline
- Refine quality gates

---

## 📚 Resources

- [Fulcrum Coding Standards](link-to-internal-docs)
- [ESLint Configuration](../.eslintrc.js)
- [SonarQube Dashboard](link-to-sonar)
- [CodeQL Documentation](https://codeql.github.com/)
- [OpenTelemetry Docs](https://opentelemetry.io/)
- [Dependency Health Guide](link-to-guide)

---

## ✅ Sign-off Checklist

Before merging any phase:

- [ ] All ESLint issues resolved
- [ ] SonarQube quality gate passed
- [ ] Code coverage targets met
- [ ] Dependencies reviewed and updated
- [ ] No security vulnerabilities
- [ ] CodeQL scan clean
- [ ] OTEL instrumentation considered (Phase 3+)
- [ ] Documentation updated
- [ ] PR approved by tech lead
