# ModuloEditor

Modular Markdown editor with plugins and textarea support.

> ⚠️ This project is in early alpha. The API is not stable yet. Do not use in production.

📚 Documentation: https://lakamark.github.io/modulo-editor-docs/

## Install

```bash
npm i @lakamark/modulo-editor
```
## Quick start
```ts
import { ModuloEditor } from "@lakamark/modulo-editor";

ModuloEditor
  .create('[data-mo-editor]')
  .build()
  .init();
```