# Fulcrum Core

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

* Node.js 22+
* yarn

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

The build compiles JavaScript and TypeScript from `src/` into CommonJS modules
in `dist/`, with declaration files and source maps. JavaScript remains unchecked
(`allowJs: true`, `checkJs: false`); TypeScript uses strict checking. A build with
type errors fails without emitting new files.

```sh
# Check types without generating build output
yarn typecheck

# Lint JavaScript and TypeScript source files
yarn lint
```

CI runs typechecking and the build before the existing test suite. Source
conversion is separate work; these commands support the current mixed-source
layout without requiring JavaScript files to be converted.

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

## Release

All verison updates are done automatically via CI, please do not change
the version value in package.json manually.