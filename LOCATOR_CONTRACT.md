# Locator Contract

This is the governance agreement between QA (automation) and the application
development teams, covering every real Brivo application as it comes online.
At the scale the existing EEN Robot Framework suite operates at (1800+
locators across 35+ suites), uncoordinated `data-testid` renames, removals,
or component rebuilds are the single largest source of automation breakage.
This document exists to prevent that category of failure before it happens,
not to clean it up after.

## 1. The one contracted selector type

`data-testid` is the **only** selector type automation is allowed to treat as
stable, contracted API between an application and its test suite.

- `@class` / CSS class selectors are **prohibited** as primary locators.
  Classes change for styling reasons that have nothing to do with test
  stability, and a class rename silently breaks every test using it.
- `text()` / visible-text selectors are **prohibited** as primary locators.
  Copy changes (i18n, rebranding, a PM editing a button label) are routine
  and should never be a test-breaking change.
- `aria-label` / role-based selectors are acceptable **only** for third-party
  surfaces automation does not control (see the one documented exception
  below). Every real Brivo application must expose `data-testid`.

### The one exception: third-party demo apps

The demo apps used to prove this framework today (Gmail, Calendar, Sheets,
Docs, Drive, Slides, Chat — all `*.google.com`) are not ours to add
`data-testid` to. `packages/ui-components/src/AppLauncher.ts` and the demo
apps' locator files intentionally use `aria-label`/role selectors instead.
This exception applies **only** to those stand-in apps. Eagle Eye Networks
(EEN) and every other real Brivo application must follow the `data-testid`
rule with no exception.

## 2. Locator naming convention

Every exported locator key is suffixed to communicate what kind of query it
is at a glance — this becomes essential once a single app's locator file
grows past a couple dozen entries:

| Suffix | Meaning | Example |
|---|---|---|
| `_L` | Static locator — single element, safe to use in Playwright's strict mode | `LOGIN_BUTTON_L = '[data-testid="login-button"]'` |
| `_LT` | Template locator — parameterized at runtime, interpolate before use | `CAMERA_ROW_LT = '[data-testid="camera-{id}-row"]'` |
| `_SL` | Scope locator — used as a parent container to scope child queries, not clicked/asserted on directly | `FILTER_PANEL_SL = '[data-testid="filter-panel"]'` |

```ts
const CAMERAS_TABLE_RESULTS_COUNT_L = '[data-testid="cameras-table-results-count"]';
const CAMERAS_TABLE_DEVICE_NAME_LT = '[data-testid="cameras-table-device-{id}-name"]';
const CAMERAS_FILTER_STATUS_DROPDOWN_SL = '[data-testid="cameras-filter-status"]';
```

## 3. Forbidden list for the development team

Without a linked automation PR, the development team must not:

1. Rename an existing `data-testid` value.
2. Remove a `data-testid` from an element still exercised by a test.
3. Move a `data-testid` to a different element (even if visually similar).
4. Duplicate a `data-testid` value onto a second element on the same page.

Any of the above requires the dev PR to link the companion automation PR
that updates the affected locator file(s) in the same release.

## 4. Mandatory merge order

```
component library  →  application  →  automation
```

A shared component's `data-testid` contract lands first. The application
consuming that component merges second, once the component's contract is
stable. Automation's locator update merges last, against the already-landed
application change — never speculatively ahead of it.

## 5. CI enforcement path

- **Today (advisory):** this document is the enforcement mechanism. Locator
  changes are caught in PR review, not by a CI gate.
- **Target (hard gate):** once applications expose `data-testid` consistently,
  add a CI check that fails a dev-team PR when it removes/renames a
  `data-testid` string still referenced by any locator file in this repo
  (a simple grep-diff is sufficient — no runtime test execution required).

## 6. Where locators live

Every app owns its own locator files under `apps/<app>/src/pages/locators/`.
Shared, cross-app widgets (the app launcher, dialogs, data tables) live in
`packages/ui-components` and are scoped by `BaseComponent`'s root locator,
so a single `data-testid` collision in page-specific content can't leak into
a shared component's queries.
