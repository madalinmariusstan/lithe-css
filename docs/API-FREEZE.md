# API compatibility policy

Lithe CSS 0.0.1 is an initial public alpha. The current API is documented and tested, but it is not frozen.

## Public surface

- published bundle paths;
- classes and modifiers listed in `public-api.json`;
- public semantic tokens;
- interactive `data-*` attributes;
- canonical component markup documented in the reference files.

## Internal surface

The following may change without notice during alpha development:

- source-file organization;
- private custom properties not listed in the manifest;
- internal JavaScript functions;
- demo-only classes;
- generated formatting and minification output.

## Breaking changes

A breaking public change must be recorded in the changelog and include a migration note when practical. The API will be frozen only when the project reaches a later pre-release milestone.
