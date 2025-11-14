## Fulcrum Core

The JavaScript object model for Fulcrum.

This library provides a comprehensive object model for Fulcrum data, including:
* Form and record parsing
* Record titles and address formatting
* Date, time, and number localization
* Choice and classification set lookups
* Visibility, requirement, and validation rules
* Default values and emptiness definitions
* JSON serialization and calculation fields
* Support for record links and repeatables

## Development

### Prerequisites
- Node.js 16+
- yarn

### Setup

```sh
# Install dependencies
yarn install
```

### Build

```sh
# Build the project
yarn build
```

### Tests

```sh
# Run all tests
yarn test
```

### Console

Starts an interactive node terminal with the library available for use:

```sh
./console
```

## Install

```bash
yarn add @fulcrumapp/fulcrum-core
# or
npm install @fulcrumapp/fulcrum-core
```

## Usage

```javascript
import { Form, Record } from '@fulcrumapp/fulcrum-core';

const form = new Form(formAttributes);
const record = new Record(recordAttributes, form);

// Access record data
console.log(record.id);
console.log(record.formValues.get('field_key').displayValue);
```

## Project Status: Modernization

This library is being modernized to improve maintainability, adopt TypeScript, and enhance the developer experience. The project is split into several phases, adding new capabilities without breaking changes.

- **Phase 1: Library Configuration (Complete)**
- **Phase 2: TypeScript Types (In Progress)**
- **Phase 3-5: Planned**

For more details, see the [Modernization Documentation](./docs/README.md).

## Documentation

- [**Modernization Plan**](./docs/OVERVIEW.md)
- [**Code Standards**](./docs/CODE_STANDARDS.md)
- [**Usage Patterns**](./docs/USAGE_PATTERNS.md)
- [**Versioning Strategy**](./docs/VERSIONING.md)
- [**API Docs**](http://fulcrumapp.github.io/fulcrum-core/) (Generated)
