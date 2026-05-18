import { useEffect, useRef } from 'react';

import {
    type EditorPlugin, type EditorPreset,
    ModuloEditor as CoreEditor,
    StarterKitPreset,
} from '../index';

export interface ModuloEditorProps {
    className?: string;
    name?: string;
    value?: string;

    /**
     * Called whenever the editor value changes.
     *
     * This callback is triggered on every input update.
     *
     * Add a debounce in your application if needed
     * for autosave or expensive operations.
     */
    onChange?: (value: string) => void;
    plugins?: readonly EditorPlugin[];
    presets?: readonly EditorPreset[];
}

export function ModuloEditor({className, name, value, onChange, plugins = [], presets = []}: ModuloEditorProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    const editorRef = useRef<CoreEditor | null>(null);


    useEffect(() => {
        if (!rootRef.current || editorRef.current) {
            return;
        }

        const builder = CoreEditor.create(rootRef.current);

        const resolvedPresets =
            presets.length > 0 ? presets : [new StarterKitPreset()];

        for (const preset of resolvedPresets) {
            builder.usePreset(preset);
        }

        const editor = builder
            .withPlugins(plugins)
            .build();

        editor.init();

        if (value) {
            editor.setValue(value);
        }

        const unsubscribe = editor.onChange((nextValue) => {
            onChange?.(nextValue);
        });

        editorRef.current = editor;

        return () => {
            unsubscribe();
            editor.destroy();
            editorRef.current = null;
        };
    }, []);

    return (
        <div ref={rootRef} className={className} data-mo-editor>
            <div data-mo-editor-header></div>

            <div data-mo-editor-toolbar></div>

            <div data-mo-editor-body>
                <div data-mo-editor-input></div>
                <div data-mo-editor-preview></div>
            </div>

            <div data-mo-editor-footer></div>
            <div data-mo-editor-status></div>

            <textarea
                name={name}
                data-mo-editor-textarea
                hidden
                readOnly
                defaultValue={value ?? ''}
            />
        </div>
    );
}