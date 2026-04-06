# ModuloEditor
Modular Markdown editor with plugins and textarea support.

> ⚠️ This project is in early alpha. The API is not stable yet. Do not use in production.

## Features (planned)
- Modular architecture
- Plugin API
- Interchangeable editor input
- Interchangeable preview output
- Safe HTML rendering
- Textarea form integration
- Toolbar extensions
- Command system

## HTML structure
```html
<div class="mo-editor" data-mo-editor>
    <!-- Header editor -->
    <div class="mo-editor__header" data-mo-editor-header>
        <div class="mo-editor__toolbar" data-mo-editor-toolbar></div>
    </div>
    
    <!-- Body editor -->
    <div class="mo-editor__body" data-mo-editor-body>
        <div class="mo-editor__input" data-mo-editor-input></div>
        <div class="mo-editor__preview" data-mo-editor-preview></div>
    </div>
    
    <!-- Footer editor -->
    <div class="mo-editor__footer" data-mo-editor-footer>
        <div class="mo-editor__status" data-mo-editor-status></div>
    </div>
    
    <!-- Hidden textarea for a classic form submitted -->
    <textarea id="content" name="content" hidden data-mo-editor-textarea></textarea>
</div>
```

## Goals
ModuloEditor is designed to be:
* extensible
* framework-agnostic
* safe by default
* plugin driven
* form friendly
* TypeScript first

## Development

Install dependencies
```bash
npm install
```
## Run the playground
```bash
npm run dev
```

## Run tests
```bash
npm run test
```
## Run test in watch mode
```bash
npm run test:watch
```

## Status
Early development — core architecture in progress.

## License
MIT