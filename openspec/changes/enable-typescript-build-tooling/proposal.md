# Proposal

## Why

FLCRM-23394 prepares this mixmatch consumer for future JavaScript-to-TypeScript
conversion. The repository already builds mixed sources with TypeScript, but
typechecking emits artifacts and CI does not validate compilation.

## What Changes

- Make typechecking non-emitting and prevent build output on type errors.
- Keep JavaScript compilation enabled without enabling JavaScript typechecking.
- Explicitly lint both JavaScript and TypeScript sources.
- Run typechecking and compilation before the existing CI tests.
- Document the mixed-source development commands.

## Capabilities

### New Capabilities

- `mixed-source-build-tooling`: Validate and compile mixed JavaScript and
  TypeScript sources without changing runtime behavior.

### Modified Capabilities

None.

## Impact

Only compiler configuration, package scripts, CI, and documentation change.
JavaScript source conversion, dependency updates, and runtime changes are out
of scope. Existing CommonJS output, declarations, source maps, package entry
points, and test discovery remain unchanged.
