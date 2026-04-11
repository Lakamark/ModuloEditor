import type {EditorDomInitializationResult} from "./EditorDomInitializationResult";

export interface EditorDomInitializer {
    initialize(textarea: HTMLTextAreaElement): EditorDomInitializationResult;
}
