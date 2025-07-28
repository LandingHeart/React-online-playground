"""create react task management mvp

Revision ID: 0cd039a2e2b8
Revises: c64a166b50b3
Create Date: 2025-07-28 14:52:52.416508

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0cd039a2e2b8'
down_revision: Union[str, Sequence[str], None] = 'c64a166b50b3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# --- React Task Management MVP Project Data ---
# This data defines the structure and content of the React Task Management application.
initialFiles = {
    "src": {
        "directory": {
            "main.jsx": {
                "file": {
                    "contents": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);"
                }
            },
            "App.jsx": {
                "file": {
                    "contents": "import React, { useState } from 'react';\n\nfunction App() {\n  const [tasks, setTasks] = useState([]);\n  const [newTask, setNewTask] = useState('');\n\n  const addTask = () => {\n    if (newTask.trim() !== '') {\n      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);\n      setNewTask('');\n    }\n  };\n\n  const toggleTask = (id) => {\n    setTasks(\n      tasks.map((task) =>\n        task.id === id ? { ...task, completed: !task.completed } : task\n      )\n    );\n  };\n\n  const deleteTask = (id) => {\n    setTasks(tasks.filter((task) => task.id !== id));\n  };\n\n  return (\n    <div className=\"min-h-[100vh] min-w-[100vw]  bg-gray-900 text-gray-100 font-inter p-4 sm:p-8 flex flex-col items-center justify-center\">\n      <div className=\"bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md\">\n        <h1 className=\"text-4xl font-bold text-purple-400 mb-6 text-center\">Task Manager MVP</h1>\n\n        <div className=\"flex gap-2 mb-6\">\n          <input\n            type=\"text\"\n            className=\"flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500\"\n            placeholder=\"Add a new task...\"\n            value={newTask}\n            onChange={(e) => setNewTask(e.target.value)}\n            onKeyPress={(e) => {\n              if (e.key === 'Enter') {\n                addTask();\n              }\n            }}\n          />\n          <button\n            onClick={addTask}\n            className=\"bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 rounded-lg shadow-md transition-colors duration-200\"\n          >\n            Add Task\n          </button>\n        </div>\n\n        {tasks.length === 0 ? (\n          <p className=\"text-gray-400 text-center\">No tasks yet! Add some above.</p>\n        ) : (\n          <ul className=\"space-y-3\">\n            {tasks.map((task) => (\n              <li\n                key={task.id}\n                className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-all duration-200 ${\n                  task.completed ? 'bg-gray-600 line-through text-gray-400' : 'bg-gray-700 text-white'\n                }`}\n              >\n                <span\n                  className=\"flex-grow cursor-pointer text-left\"\n                  onClick={() => toggleTask(task.id)}\n                >\n                  {task.text}\n                </span>\n                <button\n                  onClick={() => deleteTask(task.id)}\n                  className=\"ml-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded-lg shadow-md transition-colors duration-200\"\n                >\n                  Delete\n                </button>\n              </li>\n            ))}\n          </ul>\n        )}\n      </div>\n    </div>\n  );\n}\n\nexport default App;\n"
                }
            },
            "App.css": {
                "file": {
                    "contents": ""
                }
            },
            "index.css": {
                "file": {
                    "contents": "@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n@import 'tailwindcss/utilities';\n\nbody {\n  font-family: 'Inter', sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n  color-scheme: light dark;\n  background-color: #f3f3f3;\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\n#root {\n margin: 0 auto;\n  text-align: center;\n}\n"
                }
            }
        }
    },
    "package.json": {
        "file": {
            "contents": "{\n  \"name\": \"vite-react-app\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n      \"dev\": \"vite\",\n      \"build\": \"vite build\",\n      \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n      \"react\": \"^18.2.0\",\n      \"react-dom\": \"^18.2.0\",\n      \"tailwindcss\": \"^3.4.4\",\n      \"postcss\": \"^8.4.38\",\n      \"autoprefixer\": \"^10.4.19\"\n  },\n  \"devDependencies\": {\n      \"@vitejs/plugin-react\": \"^4.2.0\",\n      \"vite\": \"^5.0.0\"\n  }\n}"
        }
    },
    "vite.config.js": {
        "file": {
            "contents": "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    headers: {\n      'Cross-Origin-Embedder-Policy': 'require-corp',\n      'Cross-Origin-Opener-Policy': 'same-origin',\n    },\n  },\n});"
        }
    },
    "index.html": {
        "file": {
            "contents": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Task Manager MVP</title>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap\" rel=\"stylesheet\">\n    <script src=\"https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4\"></script>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>"
        }
    },
    "tailwind.config.js": {
        "file": {
            "contents": "/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    \"./index.html\",\n    \"./src/**/*.{js,ts,jsx,tsx}\",\n  ],\n  theme: {\n    extend: {\n      fontFamily: {\n        inter: ['Inter', 'sans-serif'],\n      },\n    },\n  },\n  plugins: [],\n}\n"
        }
    }
}


def upgrade() -> None:
  # Define the table helpers with the CORRECT column names
  projects_table = sa.table('projects',
                            sa.column('id', sa.Integer),
                            # Changed from 'title' to 'name'
                            sa.column('name', sa.String),
                            sa.column('description', sa.String)
                            )
  files_table = sa.table('files',
                         sa.column('id', sa.Integer),
                         # Changed from 'name' to 'path'
                         sa.column('path', sa.String),
                         sa.column('content', sa.String),
                         sa.column('project_id', sa.Integer)
                         )

  # --- Seed Projects Table ---
  op.bulk_insert(projects_table,
                 [
                     # Use 'name' key instead of 'title'
                     {'id': 1, 'name': 'Vite + React Template',
                      'description': 'A starter template for a Vite and React project.'}
                 ]
                 )

  # --- Seed Files Table ---
  files_to_seed = []

  # This loop now correctly assigns to the 'path' key
  for name, data in initialFiles.items():
    if 'file' in data:
      files_to_seed.append(
          {'path': name, 'content': data['file']['contents'], 'project_id': 1})
    elif 'directory' in data:
      for sub_name, sub_data in data['directory'].items():
        if 'file' in sub_data:
          files_to_seed.append(
              {'path': f"src/{sub_name}", 'content': sub_data['file']['contents'], 'project_id': 1})

  if files_to_seed:
    op.bulk_insert(files_table, files_to_seed)


def downgrade() -> None:
  # The downgrade logic remains the same
  op.execute("DELETE FROM files WHERE project_id = 1")
  op.execute("DELETE FROM projects WHERE id = 1")
