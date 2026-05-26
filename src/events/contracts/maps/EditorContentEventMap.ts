/**
 * Content synchronization events emitted by ModuloEditor.
 */
export interface EditorContentEventMap {

    /**
     * Fired before content synchronization.
     */
    'content:before-change': {
        readonly value: string;
        readonly source:
            | 'input'
            | 'programmatic'
            | 'command';
    };

    /**
     * Fired after content synchronization.
     */
    'content:change': {
        readonly value: string;
        readonly html: string;
        readonly source:
            | 'input'
            | 'programmatic'
            | 'command';
    };
}