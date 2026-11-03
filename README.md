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

Validation, release and publication jobs use GitHub-hosted `ubuntu-latest`
runners. npm trusted publishing does not support self-hosted runners. Fork
approval settings are configured separately in GitHub and must be verified
before relying on them.

Do not manually change the root `package.json` version. GitHub Actions creates
the version-only commit on `main` after validation, with `[skip ci]`, then
creates a tag that starts publication. PR, merge-queue and main validation
compare the version with the event's base commit and fail if it changes;
revert only that field if the check fails.

Release versioning uses the highest stable tag and the changes since its
common ancestor. The baseline is the greatest of the highest stable tag, the
tested commit's stable `package.json` version, and release-commit versions in
the examined history. With no stable tag, all commit messages in its history
determine the bump. Reconcile existing registry versions before the first
release; a missing or invalid version fails.

The GitHub App needs permission to bypass the rules protecting `main` and
create release tags. Tagging, recovery and publication require a
GitHub-signed commit, regardless of the App author. Protect branch and tag
access to control who can create releases. Release writes
are queued; if a newer merge advances
`main`, the newer validated run releases the combined changes. If tag creation
fails after the version commit, the original CI run can recover it if its code
supports recovery. Otherwise, a newer validated run warns and supersedes the
untagged version without automatically publishing it.

Configure the CI check as required and protect workflow changes with trusted
review: a PR can otherwise alter or remove its own workflow check.