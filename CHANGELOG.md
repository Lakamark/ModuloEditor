# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog
and this project adheres to Semantic Versioning.

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
- Add new test fakes (input, output, markdown)

### Refactor
- Reorganize commands into:
    - contracts
    - registry
    - builtin
- Reorganize markdown into:
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

### 🗑 Removed
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