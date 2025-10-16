## Fulcrum Core

The JavaScript object model for Fulcrum.

Includes:
* Form schema parsing and definitions
* Record parsing and field value definitions
* Record (and child record) titles
* Address field formatting
* Date/time localization
* Number localization (1.337,00 vs 1,337.00)
* Currency formatting
* Choice and classification set label lookups
* Visibility and requirement conditions
* Required field validations
* Min/max validations
* Pattern validations
* Default values
* Canonical definitions of "emptiness" / blank / length / etc
* JSON serialization for all field types
* Formatting calculation fields
* Full support for record link fields and repeatables

### Setup

```sh
yarn install
```

### Tests

```sh
yarn test
```

### Console

Starts an interactive node terminal with the library available to use

```sh
./console
```

## Installation

This package is published to **GitHub Packages** (not npm).

### Configure npm

Create or update `.npmrc` in your project root:

```
registry=https://npm.pkg.github.com/@fulcrumapp
```

### Authenticate

**Local Development:**
```bash
# Generate a GitHub Personal Access Token with 'read:packages' scope
# Then add to ~/.npmrc:
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

**CI/CD (GitHub Actions):**
```yaml
- name: Configure GitHub Packages
  run: |
    echo "registry=https://npm.pkg.github.com/@fulcrumapp" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc
```

### Install

```bash
yarn add fulcrum-core
# or
npm install fulcrum-core
```

## Usage

```javascript
import { Form, Record } from 'fulcrum-core';

const form = new Form(formAttributes);
const record = new Record(recordAttributes, form);

// Access record data
console.log(record.id);
console.log(record.formValues.get('field_key'));
```

## Development

### Setup

```sh
yarn install
```

### Build

```sh
yarn build
```

### Tests

```sh
yarn test
```

### Lint

```sh
yarn lint
```

### Console

Starts an interactive node terminal with the library available to use:

```sh
./console
```

## Publishing

Publishing is automated via GitHub Actions. When you create a release:

1. Go to **Releases** → **Create a new release**
2. Create a new tag (e.g., `v1.6.0`)
3. Publish the release
4. GitHub Actions will automatically:
   - Run tests
   - Build the project
   - Publish to GitHub Packages

### Manual Publishing (if needed)

```bash
yarn clean && yarn build
# Update version in package.json
git commit -am "chore: bump version to x.x.x"
git tag -a vx.x.x -m "x.x.x"
git push --tags
yarn publish  # Publishes to GitHub Packages
```

## Project Status

This library is undergoing modernization to improve maintainability, TypeScript support, and developer experience. The modernization is split into 5 phases, each adding new capabilities without breaking existing code.

### Current Status (Phase 1 Complete ✅)
- ✅ Configured for GitHub Packages
- ✅ Removed dist/ from version control
- ✅ TypeScript declarations properly exposed
- 🔄 TypeScript types export (Phase 2 - in progress)
- 🔄 Separated models/services (Phase 3 - planned)

## Documentation

### Modernization Docs
- [Overview](./docs/OVERVIEW.md) - Problems, goals, and strategy
- [Phase 1](./docs/PHASE_1.md) - Library Configuration ✅ Complete
- [Phase 2](./docs/PHASE_2.md) - TypeScript Types 🔄 In Progress
- [Phase 3-5](./docs/README.md) - Future phases
- [Usage Patterns](./docs/USAGE_PATTERNS.md) - How to use both APIs
- [Project Structure](./docs/PROJECT_STRUCTURE.md) - Final directory layout
- [Versioning](./docs/VERSIONING.md) - Release strategy

### API Documentation
- [API Docs](http://fulcrumapp.github.io/fulcrum-core/) - Generated documentation
