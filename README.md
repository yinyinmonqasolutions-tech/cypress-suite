# 🌲 Cypress E2E Test Automation Suite

[![Cypress E2E Tests](https://github.com/yinyinmonqasolutions-tech/cypress-suite/actions/workflows/cypress.yml/badge.svg)](https://github.com/yinyinmonqasolutions-tech/cypress-suite/actions/workflows/cypress.yml)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Cypress](https://img.shields.io/badge/Cypress-15-brightgreen?logo=cypress)
![License](https://img.shields.io/badge/license-ISC-blue)

A professional **End-to-End (E2E) and API Test Automation Suite** built with **Cypress** and **JavaScript**, following the **Page Object Model (POM)** design pattern. Covers UI authentication, product listing, full checkout flows, and REST API testing — with **Mochawesome HTML reports** and a **GitHub Actions CI/CD pipeline** running on Chrome and Firefox.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Cypress Configuration](#cypress-configuration)
- [Custom Commands](#custom-commands)
- [Test Fixtures](#test-fixtures)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Test Credentials](#test-credentials)

---

## 📖 About the Project

This suite automates end-to-end testing of the [SauceDemo](https://www.saucedemo.com/) e-commerce application and REST API testing against [JSONPlaceholder](https://jsonplaceholder.typicode.com/). It is structured around the **Page Object Model** pattern, with reusable custom commands, fixture-driven test data, and a **Mochawesome** HTML report generated after every run.

**Key features:**
- ✅ Page Object Model (POM) — `LoginPage`, `ProductsPage`, `CheckoutPage`
- ✅ UI tests: authentication, product listing, sorting, cart, and full checkout
- ✅ REST API tests: GET, POST, PUT, DELETE, 404, and response time
- ✅ Custom Cypress commands: `loginAndGoToProducts`, `loginViaAPI`, `addToCart`, `apiGet`
- ✅ Fixture-driven test data (`users.json`)
- ✅ Mochawesome HTML reports with embedded screenshots and timestamps
- ✅ Video recording and screenshot-on-failure
- ✅ Flaky test retries (2 retries in CI, 0 in open mode)
- ✅ GitHub Actions CI/CD — runs on both **Chrome** and **Firefox** in parallel
- ✅ Scheduled daily run at 06:00 UTC (13:00 Bangkok time)

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Cypress](https://www.cypress.io/) | 15 | E2E test runner & API testing |
| [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | ES6+ | Scripting language |
| [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) | `^4.0.2` | HTML test reports |
| [mochawesome](https://www.npmjs.com/package/mochawesome) | `^7.1.4` | Report base library |
| [mochawesome-merge](https://www.npmjs.com/package/mochawesome-merge) | `^5.1.1` | Merge multiple JSON reports |
| [mochawesome-report-generator](https://www.npmjs.com/package/mochawesome-report-generator) | `^6.3.2` | Generate final HTML report |
| [@faker-js/faker](https://fakerjs.dev/) | `^10.4.0` | Dynamic fake data generation |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD pipeline |

---

## 📁 Project Structure

```
cypress-suite/
├── .github/
│   └── workflows/
│       └── cypress.yml               # GitHub Actions CI/CD pipeline
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── jsonplaceholder.cy.js # REST API tests (TC-301 to TC-307)
│   │   ├── auth/
│   │   │   └── login.cy.js           # Authentication tests (TC-001 to TC-006)
│   │   └── shop/
│   │       ├── checkout.cy.js        # Checkout flow tests (TC-201 to TC-203)
│   │       └── product-listing.cy.js # Product listing tests (TC-101 to TC-106)
│   ├── fixtures/
│   │   └── users.json                # Test data: users & shipping info
│   ├── pages/
│   │   ├── CheckoutPage.js           # Checkout page object & actions
│   │   ├── LoginPage.js              # Login page object & actions
│   │   └── ProductsPage.js           # Products page object & actions
│   ├── reports/                      # Generated Mochawesome HTML reports
│   ├── screenshots/                  # Screenshots on failure (gitignored)
│   ├── support/
│   │   ├── commands.js               # Custom Cypress commands
│   │   └── e2e.js                    # Global hooks & reporter registration
│   └── videos/                       # Test run videos (gitignored)
├── .gitignore
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Dependencies & npm scripts
└── package-lock.json
```

---

## ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v20 LTS or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yinyinmonqasolutions-tech/cypress-suite.git
cd cypress-suite
```

### 2. Install Dependencies

```bash
npm ci
```

---

## ▶️ Running Tests

All scripts are defined in `package.json`:

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress interactive UI |
| `npm run cy:run` | Run all tests headlessly (default browser) |
| `npm run cy:chrome` | Run all tests in Chrome |
| `npm run cy:report` | Run tests and generate Mochawesome HTML report |
| `npm run cy:smoke` | Run smoke-tagged tests only |

### Run a specific test file

```bash
npx cypress run --spec "cypress/e2e/auth/login.cy.js"
npx cypress run --spec "cypress/e2e/shop/checkout.cy.js"
npx cypress run --spec "cypress/e2e/api/jsonplaceholder.cy.js"
```

### Run on a specific browser

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

### View the HTML Report

After running `npm run cy:report`, open the generated file inside `cypress/reports/`:

```bash
open cypress/reports/index.html_<timestamp>.html
```

---

## 🧪 Test Coverage

### `cypress/e2e/auth/login.cy.js` — Authentication (6 tests)

| Test ID | Description |
|---------|-------------|
| TC-001 | Valid login redirects to Products page |
| TC-002 | Invalid password shows error message |
| TC-003 | Locked-out user sees locked error |
| TC-004 | Empty username shows validation error |
| TC-005 | User can logout and return to login page |
| TC-006 | Login page has correct title ("Swag Labs") |

---

### `cypress/e2e/shop/product-listing.cy.js` — Product Listing (6 tests)

| Test ID | Description |
|---------|-------------|
| TC-101 | Displays 6 products on inventory page |
| TC-102 | Sort by price low-to-high works correctly |
| TC-103 | Sort by price high-to-low works correctly |
| TC-104 | Adding one item increments cart badge to 1 |
| TC-105 | Adding 3 items updates cart badge to 3 |
| TC-106 | Product detail page loads correctly |

---

### `cypress/e2e/shop/checkout.cy.js` — Checkout Flow (3 tests)

| Test ID | Description |
|---------|-------------|
| TC-201 | Complete end-to-end checkout — add item → cart → shipping → order complete |
| TC-202 | Checkout fails when first name is missing |
| TC-203 | Remove item from cart clears the cart badge |

---

### `cypress/e2e/api/jsonplaceholder.cy.js` — REST API Tests (7 tests)

| Test ID | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| TC-301 | GET | `/posts` | Returns 100 posts with correct schema |
| TC-302 | GET | `/posts/1` | Returns the correct single post |
| TC-303 | POST | `/posts` | Creates a new post and returns 201 |
| TC-304 | PUT | `/posts/1` | Updates a post and returns 200 |
| TC-305 | DELETE | `/posts/1` | Deletes a post and returns 200 |
| TC-306 | GET | `/posts/9999` | Non-existent post returns 404 |
| TC-307 | GET | `/posts` | API response time is under 2 seconds |

**Total: 22 tests across 4 spec files**

---

## ⚙️ Cypress Configuration

Key settings in `cypress.config.js`:

| Setting | Value |
|---------|-------|
| `baseUrl` | `https://www.saucedemo.com` |
| `specPattern` | `cypress/e2e/**/*.cy.js` |
| `supportFile` | `cypress/support/e2e.js` |
| `fixturesFolder` | `cypress/fixtures` |
| `defaultCommandTimeout` | `8000ms` |
| `pageLoadTimeout` | `30000ms` |
| `requestTimeout` | `10000ms` |
| `viewportWidth` | `1280` |
| `viewportHeight` | `800` |
| `retries` (CI / run mode) | `2` |
| `retries` (open mode) | `0` |
| `video` | `true` |
| `screenshotOnRunFailure` | `true` |
| `reporter` | `cypress-mochawesome-reporter` |
| `reportDir` | `cypress/reports` |
| `env.api_url` | `https://jsonplaceholder.typicode.com` |

---

## 🔧 Custom Commands

Defined in `cypress/support/commands.js`:

| Command | Usage | Description |
|---------|-------|-------------|
| `cy.loginAndGoToProducts()` | `cy.loginAndGoToProducts()` | Visits `/`, logs in via UI, asserts redirect to `/inventory.html` |
| `cy.loginViaAPI()` | `cy.loginViaAPI()` | Bypasses the UI login — faster for non-login test setup |
| `cy.addToCart(productName)` | `cy.addToCart('Sauce Labs Backpack')` | Finds a product by name and clicks its Add-to-Cart button |
| `cy.assertText(selector, text)` | `cy.assertText('.error', 'Epic sadface')` | Asserts an element contains specific text |
| `cy.apiGet(endpoint)` | `cy.apiGet('/posts')` | Makes a GET request to the configured `api_url` |

---

## 📦 Test Fixtures

**`cypress/fixtures/users.json`** — shared test data used across specs:

```json
{
  "validUser":   { "username": "standard_user",   "password": "secret_sauce" },
  "lockedUser":  { "username": "locked_out_user",  "password": "secret_sauce" },
  "problemUser": { "username": "problem_user",     "password": "secret_sauce" },
  "shipping":    { "firstName": "Yin", "lastName": "Yin", "postalCode": "11100" }
}
```

---

## ⚡ CI/CD with GitHub Actions

The workflow at `.github/workflows/cypress.yml` is named **"Cypress E2E Tests"** and runs on:
- Every **push** to `main`, `master`, or `develop`
- Every **pull request** to `main` or `master`
- **Scheduled daily** at `06:00 UTC` (13:00 Bangkok time)

**Matrix strategy:** runs on both `chrome` and `firefox` in **parallel** (`fail-fast: false` — all browsers run even if one fails).

**Pipeline steps:**

1. **Checkout** — checks out the repository
2. **Setup Node.js 20** — installs Node.js 20 with npm cache
3. **Install dependencies** — runs `npm ci`
4. **Run Cypress tests** — uses `cypress-io/github-action@v6`, waits for `https://www.saucedemo.com` (60s timeout), injects `CYPRESS_USERNAME` and `CYPRESS_PASSWORD` from GitHub Secrets
5. **Upload screenshots** — on failure only; retained for **7 days** (`cypress-screenshots-<browser>`)
6. **Upload videos** — always; retained for **7 days** (`cypress-videos-<browser>`)
7. **Upload HTML report** — always; retained for **14 days** (`mochawesome-report-<browser>`)

### Setting up GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret Name | Value |
|-------------|-------|
| `CYPRESS_USERNAME` | `standard_user` |
| `CYPRESS_PASSWORD` | `secret_sauce` |

---

## 🔑 Test Credentials

SauceDemo built-in test users (all use the same password):

| Username | Password | Used In |
|----------|----------|---------|
| `standard_user` | `secret_sauce` | TC-001, TC-101–TC-106, TC-201–TC-203 |
| `locked_out_user` | `secret_sauce` | TC-003 |
| `problem_user` | `secret_sauce` | Available in `users.json` |

> These are public demo credentials from [SauceDemo](https://www.saucedemo.com/) and are safe to include here.

---

<p align="center">
  Built with ❤️ using <a href="https://www.cypress.io/">Cypress</a> & <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a>
</p>
