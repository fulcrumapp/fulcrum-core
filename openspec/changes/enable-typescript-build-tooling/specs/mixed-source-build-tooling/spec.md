## ADDED Requirements

### Requirement: Mixed-source compilation preserves the package contract

The build SHALL compile JavaScript and TypeScript sources under `src/` to
CommonJS output in `dist/`, including declaration files and source maps.
JavaScript typechecking SHALL remain disabled, and TypeScript strict checking
SHALL remain enabled.

#### Scenario: Build the existing mixed-source repository

- **WHEN** a developer runs `yarn build`
- **THEN** the build succeeds and produces `dist/index.js`, `dist/index.d.ts`,
  and source maps without requiring any JavaScript source conversion

#### Scenario: A TypeScript source contains a type error

- **WHEN** a developer runs `yarn build` with a TypeScript type error
- **THEN** the command fails without emitting new build artifacts

### Requirement: Typechecking does not emit artifacts

The typecheck command SHALL validate the configured source project without
emitting JavaScript, declarations, source maps, or build-info files.

#### Scenario: Typecheck a clean checkout

- **WHEN** a developer runs `yarn typecheck` without an existing `dist/`
- **THEN** types are checked without creating `dist/` or a build-info file

### Requirement: CI validates mixed-source tooling

CI SHALL run typechecking and compilation before the existing unit tests.
Linting SHALL explicitly include `.js` and `.ts` files recursively under `src/`.

#### Scenario: Validate a tooling change

- **WHEN** CI runs the unit-test command
- **THEN** dependency installation, typechecking, compilation, and the existing
  tests must all succeed

#### Scenario: Lint a nested TypeScript source

- **WHEN** a developer runs `yarn lint`
- **THEN** nested TypeScript files and existing JavaScript sources are linted
