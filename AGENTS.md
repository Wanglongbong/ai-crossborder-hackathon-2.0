## Git workflow

For changes targeting the shared development branch, use this sequence by default:

`dev → codex/<descriptive-change> → commit → push → pull request → CI passes → merge into dev → delete the feature branch`

Do not include unrelated or unknown working-tree changes in a commit. Wait for CI before merging unless the user explicitly authorizes an exception.

Before pushing code, pull the latest changes from `dev` into the feature branch and check for merge conflicts. Resolve any conflicts and verify the result before continuing with the push workflow.

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), use it before grep/find or reading files when you need to understand or locate code:

- Prefer `codegraph explore` for code questions and `codegraph node` for a specific source file or symbol.
- If no `.codegraph/` directory exists, skip CodeGraph entirely.
<!-- CODEGRAPH_END -->
