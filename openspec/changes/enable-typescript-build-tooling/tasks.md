# Tasks

## 1. Tooling

- [x] 1.1 Make typechecking non-emitting and explicitly retain mixed-source compiler settings.
- [x] 1.2 Include JavaScript and TypeScript in linting and add typecheck/build to CI before tests.
- [x] 1.3 Document the tooling contract without converting source files.

## 2. Validation

- [x] 2.1 Verify typechecking creates no build artifacts and the build preserves existing output.
- [x] 2.2 Verify a temporary nested TypeScript file is built and linted and a type error prevents emission.
- [x] 2.3 Run the existing tests, lint, and strict OpenSpec validation.
