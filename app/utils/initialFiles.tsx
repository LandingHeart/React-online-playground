import { FileSystemTree } from "./fileTypes";

export const initialFiles: FileSystemTree = {
  src: {
    directory: {
      "main.jsx": {
        file: {
          contents: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
        }
      },
      "App.jsx": {
        file: {
          contents: `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <h1>Hello Vite + React!</h1>
      <p>This is running in a WebContainer.</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </button>
    </div>
  );
}

export default App;`
        }
      },
      "App.css": {
        file: {
          contents: `.app-container {
  text-align: center;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}`
        }
      },
      "index.css": {
        file: {
          contents: `body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}`
        }
      }
    }
  },
  "package.json": {
    file: {
      contents: `{
	"name": "vite-react-app",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
			"dev": "vite",
			"build": "vite build",
			"preview": "vite preview"
	},
	"dependencies": {
			"react": "^18.2.0",
			"react-dom": "^18.2.0"
	},
	"devDependencies": {
			"@vitejs/plugin-react": "^4.2.0",
			"vite": "^5.0.0"
	}
}`
    }
  },
  "vite.config.js": {
    file: {
      contents: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
});`
    }
  },
  "index.html": {
    file: {
      contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
    }
  }
};
