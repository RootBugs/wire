# 🔌 Wire — Universal API Diff Engine

**Stop getting burned by undocumented API changes.**

Wire records API responses, infers their JSON schemas, and diffs them over time. Integrate it into your CI/CD pipeline to catch breaking changes *before* they hit production.

## Why Wire

Every senior dev has been paged at 3AM because Stripe/GitHub/Slack silently changed a response field. Existing tools are language-specific (VCR.py, nock) and don't do schema diffing. Wire is:

- **Language-agnostic** — works with any HTTP API
- **Schema-aware** — tracks types, enums, nullability, optionality
- **CI-ready** — GitHub Actions annotations, structured JSON output
- **Mock generator** — spit out TypeScript interfaces, Python dataclasses, Rust structs from snapshots

## Quick Start

```bash
pip install wire-api
```

```bash
# Record an API endpoint
wire record github.repos --url https://api.github.com/repos/effestier/wire --tag v1

# Diff against last snapshot — CI mode
wire diff github.repos --against v1
# exit 0 = no changes
# exit 1 = breaking changes
# exit 2 = non-breaking changes

# Generate type-safe mocks
wire mock v1 --lang ts --output github_repos.ts
wire mock v1 --lang py --output github_repos.py
wire mock v1 --lang rust --output github_repos.rs
```

## Configuration

Create `wire.config.toml`:

```toml
[general]
snapshot_dir = ".wire"
fail_on = "breaking"  # breaking | all | none

[[endpoint]]
name = "github.repos"
url = "https://api.github.com/repos/{owner}/{repo}"
method = "GET"
headers = { Authorization = "token ${GITHUB_TOKEN}" }

[[endpoint]]
name = "stripe.charges"
url = "https://api.stripe.com/v1/charges"
method = "GET"
every = "6h"

[output]
format = "table"  # table | json | github
```

```bash
# Full CI check — record all endpoints and diff
wire check --strict
```

## CLI

```
wire record <endpoint>     Record API responses and infer schemas
wire diff <endpoint>       Diff against a snapshot
wire snapshot <endpoint>   Save current schema state
wire mock <snapshot>       Generate type-safe mocks
wire list                  List all snapshots
wire check                 Run full CI check from config
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0    | No changes detected |
| 1    | Breaking changes found |
| 2    | Non-breaking changes only |

## Breaking vs Non-Breaking

| Change | Classification |
|--------|---------------|
| Field removed | **BREAKING** |
| Field added | non-breaking |
| Type changed (e.g. int → str) | **BREAKING** |
| int → float | non-breaking |
| Required → Optional | non-breaking |
| Optional → Required | **BREAKING** |
| Enum value removed | **BREAKING** |
| Enum value added | non-breaking |

## License

MIT
