import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react()
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'ModuloEditor',
            fileName: 'modulo-editor'
        },
        sourcemap: true,
        rolldownOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                }
            }
        }
    }
});