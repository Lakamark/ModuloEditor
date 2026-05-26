/**
 * Core lifecycle events emitted by ModuloEditor.
 *
 * These events describe the initialization and destruction
 * lifecycle of a single editor instance.
 *
 * Lifecycle events are considered stable and may be used by:
 *
 * - plugins
 * - integrations
 * - framework adapters
 * - debugging tools
 * - analytics systems
 * - editor commands
 * - resolved DOM slots
 * - configured CSS class names
 * - editor event bus
 * - command execution helpers
 */
export interface EditorLifecycleEventMap {

    /**
     * Fired before the editor initialization process starts.
     *
     * At this stage:
     *
     * - DOM slots are not yet resolved
     * - plugins are not mounted
     * - adapters are not initialized
     */
    'editor:before-init': {

        /**
         * Event emission timestamp.
         */
        readonly timestamp: number;
    };

    /**
     * Fired after the editor has been fully initialized.
     *
     * At this stage:
     *
     * - DOM slots are resolved
     * - adapters are mounted
     * - plugins are initialized
     * - preview rendering is available
     */
    'editor:init': {

        /**
         * Event emission timestamp.
         */
        readonly timestamp: number;
    };

    /**
     * Fired before the editor destruction process starts.
     *
     * At this stage:
     *
     * - plugins are still mounted
     * - adapters are still active
     * - listeners are still registered
     */
    'editor:before-destroy': {

        /**
         * Event emission timestamp.
         */
        readonly timestamp: number;
    };

    /**
     * Fired after the editor has been fully destroyed.
     *
     * At this stage:
     *
     * - plugins are destroyed
     * - adapters are cleaned up
     * - listeners are removed
     * - internal resources are released
     */
    'editor:destroy': {

        /**
         * Event emission timestamp.
         */
        readonly timestamp: number;
    };
}