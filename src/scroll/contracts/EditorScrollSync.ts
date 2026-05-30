/**
 * Synchronizes scrolling between editor surfaces.
 *
 * Implementations may use a simple ratio-based strategy or a more
 * advanced section-based strategy.
 */
export interface EditorScrollSync {
    /**
     * Initializes scroll synchronization.
     */
    init(): void;

    /**
     * Stops scroll synchronization and releases resources.
     */
    destroy(): void;
}