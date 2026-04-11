import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        include: [
            'tests/**/*.{test,spec}.ts'
        ],
        setupFiles: ['./tests/setup.ts'],
        coverage: {
            reporter: ['text', 'html']
        }
    }
});