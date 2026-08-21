## Git workflow

For changes targeting the shared development branch, first start from an up-to-date local `dev` branch, then use this sequence by default:

`verify a clean working tree → switch to dev → fetch origin → fast-forward dev from origin/dev → resolve any local divergence/conflicts → codex/<descriptive-change> → commit → sync the feature branch with origin/dev → push → pull request → CI passes → merge into dev → delete the feature branch`

Do not include unrelated or unknown working-tree changes in a commit. Wait for CI before merging unless the user explicitly authorizes an exception.

Before creating a feature branch, run `git switch dev`, `git fetch origin`, and `git pull --ff-only origin dev`. Do not create the branch until local `dev` matches `origin/dev`; if the branch has diverged, resolve that intentionally and verify the result locally first. Create the branch with `git switch -c codex/<descriptive-change>`.

Before pushing code, fetch `origin` and merge the latest `origin/dev` into the feature branch. Resolve all conflicts locally, run the relevant verification, and only then continue with the push workflow.

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), use it before grep/find or reading files when you need to understand or locate code:

- Prefer `codegraph explore` for code questions and `codegraph node` for a specific source file or symbol.
- If no `.codegraph/` directory exists, skip CodeGraph entirely.
<!-- CODEGRAPH_END -->
