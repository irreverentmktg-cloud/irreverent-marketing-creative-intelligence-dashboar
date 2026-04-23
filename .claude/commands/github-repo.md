Scaffold a new GitHub repository with standard project structure, README, and configuration files.

## When to Use

Use this skill to quickly spin up a new repo for any project — a new tool in the pipeline, a microservice, a campaign-specific scraper, or any standalone project.

## Steps

1. **Gather repo details**
   Ask the user for (or infer from context):
   - Repository name (kebab-case)
   - Description (1–2 sentences)
   - Project type: `node` | `python` | `next` | `static` | `other`
   - Visibility: `public` | `private` (default: private)
   - GitHub organization or username to create under

2. **Define the file structure**
   Based on project type, define the scaffold:

   **Node.js / Next.js**
   ```
   /src
   /public (Next only)
   .env.example
   .gitignore
   package.json
   README.md
   CLAUDE.md
   ```

   **Python**
   ```
   /src
   /tests
   requirements.txt
   .env.example
   .gitignore
   README.md
   CLAUDE.md
   ```

   **Static**
   ```
   /assets
   index.html
   style.css
   README.md
   ```

3. **Generate file contents**

   **README.md** — Include:
   - Project name and 1-line description
   - Overview section
   - Getting started (install, env vars, run)
   - Key commands / scripts
   - Folder structure

   **CLAUDE.md** — Include:
   - Project purpose
   - Key directories
   - Required environment variables
   - Common tasks and how to run them

   **.gitignore** — Standard for the project type (node_modules, .env, __pycache__, dist, .next, etc.)

   **.env.example** — All required env vars with blank values and comments

   **package.json** (Node) — With name, version, description, scripts (dev, build, start, test)

   **requirements.txt** (Python) — Empty or with specified dependencies

4. **Create the repository on GitHub**
   Use the GitHub MCP tools to:
   - Create the repository (`mcp__github__create_repository`)
   - Create the branch structure (main as default)
   - Push all scaffold files (`mcp__github__push_files`)

5. **Report to user**
   - Display the new repo URL
   - List all files created
   - Show the next steps:
     ```
     git clone [repo-url]
     cd [repo-name]
     cp .env.example .env
     # Fill in your env vars
     ```

## Notes
- Always create a `CLAUDE.md` so Claude has context when working in the new repo
- Private by default — confirm before creating a public repo
- Use descriptive, kebab-case repo names that reflect the project's function
