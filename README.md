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

Do not manually change the root `package.json` version. GitHub Actions creates
the version-only commit on `main` after validation, with `[skip ci]`, then
creates a tag that starts publication. PR, merge-queue and main validation
compare the version with the event's base commit and fail if it changes;
revert only that field if the check fails.

The GitHub App needs permission to bypass the rules protecting `main` and
create release tags. Tagging, recovery and publication require a
GitHub-signed commit authored by `fulcrum-ci-public[bot]`. Release writes
are queued; if a newer merge advances
`main`, the newer validated run releases the combined changes. If tag creation
fails after the version commit, rerun the original main CI workflow to recover
the tag before releasing newer changes.

Configure the CI check as required and protect workflow changes with trusted
review: a PR can otherwise alter or remove its own workflow check.