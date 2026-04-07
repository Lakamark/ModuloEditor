import { afterEach, vi } from "vitest";
afterEach(() => {
    document.body.innerHTML = "";

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetModules();
});

export {};