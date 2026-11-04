# Documentation

Human-facing documentation for this project. Agent/tooling conventions live in
the repo-root [`AGENTS.md`](../AGENTS.md); this folder holds longer-form docs and
decision records.

## Layout

| Path              | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `architecture.md` | High-level overview of the stack and how pieces fit.   |
| `adr/`            | Architecture Decision Records — one file per decision. |

## Adding an ADR

Copy the numbering of the latest file in `adr/`, increment it, and record the
context, decision and consequences. ADRs are append-only: supersede rather than
rewrite.
