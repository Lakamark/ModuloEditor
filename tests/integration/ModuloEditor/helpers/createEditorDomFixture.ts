export function createEditorDomFixture(): HTMLElement {
    document.body.innerHTML = `
    <div data-mo-editor>
      <div data-mo-editor-header></div>
      <div data-mo-editor-toolbar></div>
      <div data-mo-editor-body>
        <textarea data-mo-editor-input></textarea>
        <div data-mo-editor-preview></div>
        <textarea data-mo-editor-textarea name="content"></textarea>
      </div>
      <div data-mo-editor-footer></div>
      <div data-mo-editor-status></div>
    </div>
  `;

    return document.querySelector('[data-mo-editor]') as HTMLElement;
}