/**
 * Command execution events emitted by ModuloEditor.
 */
export interface EditorCommandEventMap {

    /**
     * Fired before a command is executed.
     */
    'command:before-execute': {

        /**
         * Command name.
         */
        readonly name: string;
    };

    /**
     * Fired after a command has been executed.
     */
    'command:execute': {

        /**
         * Command name.
         */
        readonly name: string;
    };
}