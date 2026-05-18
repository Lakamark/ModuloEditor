# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog
and this project adheres to Semantic Versioning.

## [0.5.0-alpha.1]

### Added
- Added an initial React wrapper for ModuloEditor.
- Added support for React editor lifecycle management.
- Added React `value` and `onChange` integration support.
- Added support for custom presets and plugins in the React wrapper.
- Added React playground integration for development testing.

### Changed
- Improved editor integration coverage and DOM contract validation.
- Improved preset and starter kit integration behavior.

### Fixed
- Fixed starter kit DOM fixture inconsistencies in integration tests.
- Fixed Markdown rendering integration edge cases.

## [0.3.1-alpha.3]

### Added
- Added integration tests for editor presets and starter kits.
- Added coverage for preset ordering and repeated preset application.
- Added Markdown rendering integration tests.

### Changed
- Clarified the default editor DOM contract.
- Improved editor diagnostic and DOM resolution error messages.

### Fixed
- Fixed incomplete DOM fixtures in integration tests.
- Fixed starter kit integration expectations for textarea bridge elements.

## 0.3.0-alpha.3

- add minimal base editor layout
- split editor / preview grid
- scrollable editor and preview
- configurable DOM initializer classes
- improved textarea sizing
- base.css available for consumers
---

## 0.3.0-alpha.2

### fix
- stabilize module index exports
- fix broken import paths
- fix test helper imports
- normalize internal barrels

## 0.3.0-alpha.1

### Added

- add `EditorDomInitializer` contract
- add `DefaultEditorDomInitializer`
- support initialization from textarea
- add `fromTextarea()` builder method
- add `withDomInitializer()` builder method
- add automatic textareaBridge mounting
- support `ModuloEditor.create()` without root

### Changed

- improve `DefaultModuloEditorBuilder` DOM resolution
- root resolution now prioritizes textarea initializer
- builder now resolves textarea via initializer result

### Internal

- add `resolveTextareaElement()` helper
- add DOM initializer tests
- improve builder test coverage
---

## 0.2.0-alpha.2

### Fixed
- Builder no longer requires explicit document
- Default document fallback now used

### Added
- ModuloEditorBuilder integration tests
- validation tests for required builder dependencies

### Internal
- improve builder stability
- align builder behavior with ModuloEditor defaults

---
## 0.2.0-alpha.1

### Added
- add fluent editor API via `ModuloEditor.create()`
- introduce `ModuloEditorBuilder`
- add default builder-based editor initialization

### Changed
- refactor toolbar plugins to use `EditorPluginApi.slots`
- simplify default editor setup
- improve developer experience and playground setup

### Security
- escape HTML in `PlainTextMarkdownParser`
- prevent raw HTML injection in preview

### Tests
- update plugin tests to use slots API
- add builder tests
- update DOM integration tests
---

## [0.1.0-alpha.1] - 2026-04-08

### Breaking Changes
- Major project restructuring
- Import paths have changed
- Internal architecture reorganized
- Playground temporarily removed
- Commands moved to new registry system
- Plugins moved to new architecture

### Added
- Introduce `ModuloEditor` core orchestrator
- Add command registry system
- Add command context architecture
- Add plugin architecture foundation
- Add DOM resolver system
- Add textarea bridge system
- Add hidden textarea bridge
- Add builtin commands factory
- Add editor input state concept
- Add barrel exports across modules
- Add new test fakes (input, output, Markdown)

### Refactor
- Reorganize commands into:
    - contracts
    - registry
    - builtin
- Reorganize Markdown into:
    - contracts
    - parser
    - sanitizers
- Reorganize plugins into:
    - contracts
    - toolbar
    - buttons
- Move `EditorInputState` to input layer
- Normalize adapter naming (Input / Output)
- Simplify imports
- Clean internal structure

### Tests
- Update tests to match new architecture
- Add new fakes for editor input/output
- Add command registry tests
- Add bold command tests

### Removed
- Temporary remove playground compatibility
- Remove legacy command execution flow

---

## [0.0.0] - Initial development

### Added
- Initial editor architecture
- Markdown parser prototype
- Preview renderer
- Basic editor input adapter
- Early command system
- Initial tests