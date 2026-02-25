# Playwright E2E - SauceDemo (QA Automation Portfolio)

End-to-end test automation project using **Playwright + TypeScript** against the public demo app **SauceDemo**.
Focus: stable locators, cross-browser runs, auth via storageState, and CI-ready reporting.

## ✅ Tech Stack
- Playwright Test
- TypeScript
- Node.js
- Cross-browser: Chromium / Firefox / WebKit

## ✅ What’s Covered
### Smoke (Critical Flows)
- Login (happy path) `@smoke`
- Checkout (happy path) `@smoke`

### Regression
- Login negative (invalid credentials)

## 📦 Project Structure
- `tests/login.spec.ts` - login tests
- `tests/checkout.spec.ts` - checkout tests
- `tests/helpers/` - small helpers (no heavy POM)
- `tests/data/` - test data
- `tests/global-setup.ts` - creates per-browser storageState
- `playwright.config.ts` - config (CI-friendly retries, trace/video on failure)

## ▶️ How to Run Locally

### Install
```bash
npm ci
npx playwright install
```

### Run all tests
```bash
npx playwright test
```

### Run smoke only
```bash
npx playwright test -g "@smoke"
```

### Run WebKit only
```bash
npx playwright test --project=webkit
```

## 📊 Reports / Trace / Video

### After a run:
```bash
npx playwright show-report
```

### Config is set to:
```bash
trace: retain-on-failure
video: retain-on-failure
screenshot: only-on-failure
```

Artifacts are stored under test-results/ and HTML report under playwright-report/.

## 🧪 Debugging
```bash
npx playwright test --debug
```

# Notes
Auth is handled using storageState generated per browser via globalSetup, to ensure cross-browser stabilit