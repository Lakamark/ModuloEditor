import { useEffect, useRef } from 'react';

import type {
    EditorDomInitializer,
    EditorPlugin,
    EditorPreset,
    ModuloEditorBuilder,
} from '../index';

import { ModuloEditor as CoreEditor } from '../core';

import {
    StarterKitPreset,
} from '../index';

import type { EditorCssClassMap } from "../dom/contracts";

export interface ModuloEditorProps {
    className?: string;
    classes?: EditorCssClassMap;
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
    domInitializer?: EditorDomInitializer;
}

export function ModuloEditor(
    {
        className,
        classes,
        name,
        value,
        onChange,
        plugins = [],
        presets = [],
        domInitializer,
    }: ModuloEditorProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<ModuloEditorBuilder | null>(null);

    useEffect(() => {
        if (!rootRef.current || editorRef.current) {
            return undefined;
        }

        const builder = CoreEditor.create(rootRef.current);

        if (domInitializer) {
            builder.withDomInitializer(domInitializer);
        }

        const resolvedPresets =
            presets.length > 0 ? presets : [new StarterKitPreset()];

        for (const preset of resolvedPresets) {
            builder.usePreset(preset);
        }

        const editor = builder
            .withPlugins(plugins)
            .build();

        editor.init();

        if (value !== undefined) {
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

    useEffect(() => {
        const editor = editorRef.current;

        if (!editor || value === undefined) {
            return;
        }

        if (editor.getValue() !== value) {
            editor.setValue(value);
        }

    }, [value]);

    return (
        <div
            ref={rootRef}
            className={[className, classes?.root].filter(Boolean).join(' ')}
            data-mo-editor
        >

            <div className={classes?.header} data-mo-editor-header />

            <div className={classes?.toolbar} data-mo-editor-toolbar />

            <div className={classes?.body} data-mo-editor-body>
                <div className={classes?.input} data-mo-editor-input/>
                <div className={classes?.preview} data-mo-editor-preview/>
            </div>

            <div  className={classes?.footer} data-mo-editor-footer />
            <div className={classes?.status} data-mo-editor-status />

            <textarea
                name={name}
                className={classes?.textarea}
                data-mo-editor-textarea
                hidden
                readOnly
                defaultValue={value ?? ''}
            />
        </div>
    );
}