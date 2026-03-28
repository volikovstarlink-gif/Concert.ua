# Concert.ua — Playwright E2E Test Suite

Automated QA test suite for [concert.ua](https://concert.ua) built with Playwright and TypeScript.

## Overview

This suite contains **105 positive functional tests** across **9 feature groups**, generated from the concert.ua QA checklist (327 total test cases). Only UI-testable positive functional scenarios are automated; API, security, performance, and email/notification tests are excluded.

### Test Coverage

| Feature Group | Tests | Spec File |
|---|---|---|
| Головна сторінка (Home Page) | 15 | `tests/home.spec.ts` |
| Каталог подій (Event Catalog) | 12 | `tests/catalog.spec.ts` |
| Картка події (Event Detail) | 14 | `tests/event.spec.ts` |
| Кошик та оформлення (Cart & Checkout) | 12 | `tests/cart.spec.ts` |
| Оплата (Payment) | 10 | `tests/payment.spec.ts` |
| Особистий кабінет (Account) | 14 | `tests/account.spec.ts` |
| Пошук (Search) | 12 | `tests/search.spec.ts` |
| Адаптивність / Мобайл (Responsive) | 10 | `tests/responsive.spec.ts` |
| Доступність (a11y) | 10 | `tests/accessibility.spec.ts` |
| Локалізація / і18n | 8 | `tests/localization.spec.ts` |

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers (Chrome)
npx playwright install chromium
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `HEADLESS` | `true` | Set to `false` to run tests in headed mode |

## Running Tests

```bash
# Run all tests
npx playwright test

# Run in headed mode
HEADLESS=false npx playwright test --headed

# Run a specific feature
npx playwright test tests/search.spec.ts

# Run a specific test by title
npx playwright test -g "TC-HP-001"

# Run with verbose output
npx playwright test --reporter=list

# Type check (no emit)
npm run typecheck
```

## Viewing Reports

```bash
# Open the HTML report after a test run
npx playwright show-report
```

## Updating Test Cases

1. Replace `test-data/tests.csv` with your updated CSV file
2. The CSV parser (`utils/csv-parser.ts`) reads section summaries from the checklist
3. Test cases are defined in `tests/*.spec.ts` — update or add tests as needed

## Project Structure

```
concert-ua-tests/
├── playwright.config.ts    # Playwright configuration (Chrome only)
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
├── tests/                  # Test spec files (one per feature group)
├── pages/                  # Page Object Model classes
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── SearchPage.ts
│   ├── EventPage.ts
│   ├── CatalogPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── AccountPage.ts
├── fixtures/
│   └── test-fixtures.ts    # Extended Playwright test with page object fixtures
├── utils/
│   ├── csv-parser.ts       # CSV checklist parser
│   └── helpers.ts          # Reusable helpers (cookie banner, language, etc.)
└── test-data/
    └── tests.csv           # Original QA checklist CSV
```

## Assumptions

- Selectors use multiple fallback strategies (data-testid, role, CSS class) since the exact DOM structure of concert.ua may change
- Payment tests do **not** execute real transactions — they only verify page structure
- Tests that depend on cart contents (checkout, payment) verify element existence gracefully since the cart may be empty
- Some assertions use soft checks (`typeof isVisible`) for optional UI elements marked with `TODO` comments
