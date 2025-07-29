BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> c64a166b50b3

CREATE TABLE items (
    id SERIAL NOT NULL, 
    name VARCHAR, 
    description VARCHAR, 
    PRIMARY KEY (id)
);

CREATE INDEX ix_items_id ON items (id);

CREATE INDEX ix_items_name ON items (name);

CREATE INDEX ix_items_description ON items (description);

CREATE TABLE projects (
    id SERIAL NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    description TEXT, 
    user_id INTEGER, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
    updated_at TIMESTAMP WITH TIME ZONE, 
    PRIMARY KEY (id)
);

CREATE INDEX ix_projects_id ON projects (id);

CREATE TABLE files (
    id SERIAL NOT NULL, 
    project_id INTEGER NOT NULL, 
    path VARCHAR(255) NOT NULL, 
    content TEXT NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
    updated_at TIMESTAMP WITH TIME ZONE, 
    PRIMARY KEY (id), 
    FOREIGN KEY(project_id) REFERENCES projects (id)
);

CREATE INDEX ix_files_id ON files (id);

INSERT INTO alembic_version (version_num) VALUES ('c64a166b50b3') RETURNING alembic_version.version_num;

-- Running upgrade c64a166b50b3 -> 0cd039a2e2b8

INSERT INTO projects (id, name, description) VALUES (1, 'Vite + React Template', 'A starter template for a Vite and React project.');

INSERT INTO files (path, content, project_id) VALUES ('src/main.jsx', 'import React from ''react'';
import ReactDOM from ''react-dom/client'';
import App from ''./App.jsx'';
import ''./index.css'';

ReactDOM.createRoot(document.getElementById(''root'')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);', 1);

INSERT INTO files (path, content, project_id) VALUES ('src/App.jsx', 'import React, { useState } from ''react'';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('''');

  const addTask = () => {
    if (newTask.trim() !== '''') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('''');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-[100vh] min-w-[100vw]  bg-gray-900 text-gray-100 font-inter p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-purple-400 mb-6 text-center">Task Manager MVP</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === ''Enter'') {
                addTask();
              }
            }}
          />
          <button
            onClick={addTask}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 rounded-lg shadow-md transition-colors duration-200"
          >
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet! Add some above.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-all duration-200 ${
                  task.completed ? ''bg-gray-600 line-through text-gray-400'' : ''bg-gray-700 text-white''
                }`}
              >
                <span
                  className="flex-grow cursor-pointer text-left"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded-lg shadow-md transition-colors duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
', 1);

INSERT INTO files (path, content, project_id) VALUES ('src/App.css', '', 1);

INSERT INTO files (path, content, project_id) VALUES ('src/index.css', '@import ''tailwindcss/base'';
@import ''tailwindcss/components'';
@import ''tailwindcss/utilities'';

body {
  font-family: ''Inter'', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  background-color: #f3f3f3;
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#root {
 margin: 0 auto;
  text-align: center;
}
', 1);

INSERT INTO files (path, content, project_id) VALUES ('package.json', '{
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
      "react-dom": "^18.2.0",
      "tailwindcss": "^3.4.4",
      "postcss": "^8.4.38",
      "autoprefixer": "^10.4.19"
  },
  "devDependencies": {
      "@vitejs/plugin-react": "^4.2.0",
      "vite": "^5.0.0"
  }
}', 1);

INSERT INTO files (path, content, project_id) VALUES ('vite.config.js', 'import { defineConfig } from ''vite'';
import react from ''@vitejs/plugin-react'';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      ''Cross-Origin-Embedder-Policy'': ''require-corp'',
      ''Cross-Origin-Opener-Policy'': ''same-origin'',
    },
  },
});', 1);

INSERT INTO files (path, content, project_id) VALUES ('index.html', '<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task Manager MVP</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>', 1);

INSERT INTO files (path, content, project_id) VALUES ('tailwind.config.js', '/** @type {import(''tailwindcss'').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: [''Inter'', ''sans-serif''],
      },
    },
  },
  plugins: [],
}
', 1);

UPDATE alembic_version SET version_num='0cd039a2e2b8' WHERE alembic_version.version_num = 'c64a166b50b3';

COMMIT;

