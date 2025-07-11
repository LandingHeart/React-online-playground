"""seed files and projects table

Revision ID: 8542655d6650
Revises: c36639629048
Create Date: 2025-07-10 21:14:44.378258

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

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
                    "contents": "import React, { useState } from 'react';\nimport './App.css';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className=\"app-container\">\n      <h1>Hello Vite + React!</h1>\n      <p>This is running in a WebContainer.</p>\n      <button onClick={() => setCount((count) => count + 1)}>\n        Count is {count}\n      </button>\n    </div>\n  );\n}\n\nexport default App;"
                }
            },
            "App.css": {
                "file": {
                    "contents": ".app-container {\n  text-align: center;\n  margin-top: 5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}"
                }
            },
            "index.css": {
                "file": {
                    "contents": "body {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n}"
                }
            }
        }
    },
    "package.json": {
        "file": {
            "contents": "{\n  \"name\": \"vite-react-app\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n      \"dev\": \"vite\",\n      \"build\": \"vite build\",\n      \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n      \"react\": \"^18.2.0\",\n      \"react-dom\": \"^18.2.0\"\n  },\n  \"devDependencies\": {\n      \"@vitejs/plugin-react\": \"^4.2.0\",\n      \"vite\": \"^5.0.0\"\n  }\n}"
        }
    },
    "vite.config.js": {
        "file": {
            "contents": "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    headers: {\n      'Cross-Origin-Embedder-Policy': 'require-corp',\n      'Cross-Origin-Opener-Policy': 'same-origin',\n    },\n  },\n});"
        }
    },
    "index.html": {
        "file": {
            "contents": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>"
        }
    }
}

# revision identifiers, used by Alembic.
revision: str = '8542655d6650'
down_revision: Union[str, Sequence[str], None] = 'c36639629048'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


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
