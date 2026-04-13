import type {
    DefaultEditorDomInitializerOptions,
    EditorCssClassMap,
    EditorDomInitializationResult,
    EditorDomInitializer
} from "./contracts";
import {
    EDITOR_CSS_CLASSES,
    EDITOR_DOM_ATTRIBUTES
} from "./constants";

/**
 * Creates a div element with the given data attribute.
 *
 * @param attribute The data attribute to assign.
 * @returns A new div element with the given attribute.
 */
function createSlotElement(attribute: string): HTMLDivElement {
    const element = document.createElement("div");
    element.setAttribute(attribute, "");

    return element;
}

/**
 * Applies a class name to an element when provided.
 *
 * @param element The target element.
 * @param className The class name to apply.
 */
function applyClassName(element: HTMLElement, className: string): void {
    if (className === "") {
        return;
    }

    element.className = className;
}

/**
 * Default implementation of EditorDomInitializer.
 *
 * This initializer creates the default editor DOM structure from
 * an existing textarea element.
 *
 * The original textarea is preserved for classic form submission,
 * moved inside the generated editor root, marked with the internal
 * textarea data attribute, and hidden from view.
 *
 * The generated structure relies on stable data attributes for DOM
 * resolution and optional CSS classes for presentation.
 */
export class DefaultEditorDomInitializer implements EditorDomInitializer {
    private readonly classes: Required<EditorCssClassMap>;

    /**
     * Creates a new default DOM initializer.
     *
     * @param options Optional initializer configuration.
     */
    public constructor(options: DefaultEditorDomInitializerOptions = {}) {
        this.classes = {
            ...EDITOR_CSS_CLASSES,
            ...options.classes
        }
    }

    /**
     * Creates the default editor DOM structure from a textarea.
     *
     * The textarea is moved into the generated editor root and kept as the
     * backing textarea for form submission.
     *
     * @param textarea The source textarea used to initialize the editor DOM.
     * @returns The initialized editor root and textarea references.
     */
    public initialize(textarea: HTMLTextAreaElement): EditorDomInitializationResult {
        const root = createSlotElement(EDITOR_DOM_ATTRIBUTES.root);
        const header = createSlotElement(EDITOR_DOM_ATTRIBUTES.header);
        const toolbar = createSlotElement(EDITOR_DOM_ATTRIBUTES.toolbar);
        const body = createSlotElement(EDITOR_DOM_ATTRIBUTES.body);
        const input = createSlotElement(EDITOR_DOM_ATTRIBUTES.input);
        const preview = createSlotElement(EDITOR_DOM_ATTRIBUTES.preview);
        const footer = createSlotElement(EDITOR_DOM_ATTRIBUTES.footer);
        const status = createSlotElement(EDITOR_DOM_ATTRIBUTES.status);

        applyClassName(root, this.classes.root);
        applyClassName(header, this.classes.header);
        applyClassName(toolbar, this.classes.toolbar);
        applyClassName(body, this.classes.body);
        applyClassName(input, this.classes.input);
        applyClassName(preview, this.classes.preview);
        applyClassName(footer, this.classes.footer);
        applyClassName(status, this.classes.status);

        header.append(toolbar);
        body.append(input, preview);
        footer.append(status);

        textarea.hidden = true;
        textarea.setAttribute(EDITOR_DOM_ATTRIBUTES.textarea, "");
        applyClassName(textarea, this.classes.textarea);

        const parent = textarea.parentNode;

        if (parent !== null) {
            parent.insertBefore(root, textarea);
        }

        root.append(header, body, footer, textarea);

        return {
            root,
            textarea
        };
    }
}