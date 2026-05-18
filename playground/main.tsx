import ReactDOM from 'react-dom/client';

import { ModuloEditor } from '../src/react';
import {
    BoldToolbarPlugin,
    HeadingToolbarPlugin,
    ItalicToolbarPlugin
} from "../src";

function App() {
    return (
        <main>
            <h1>ModuloEditor React</h1>

            <form onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(
                    event.currentTarget
                );

                console.log(
                    formData.get('content')
                );
            }}>
                <ModuloEditor
                    name="content"
                    value="# Hello World"
                    plugins={[
                        new BoldToolbarPlugin(),
                        new ItalicToolbarPlugin(),
                        new HeadingToolbarPlugin(1),
                        new HeadingToolbarPlugin(2),
                        new HeadingToolbarPlugin(3),
                    ]}
                    onChange={(value) => {
                        console.log('ModuloEditor value:', value);
                        // Add a debounce for optimization in your app.
                    }}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </main>
    );
}

ReactDOM.createRoot(
    document.getElementById('app')!
).render(<App />);