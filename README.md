# Playwright POM Framework

This project contains beginner-to-intermediate automation test scenarios using Playwright with TypeScript following the Page Object Model (POM) framework approach.

## Automated Test Scenarios

### Login
- Login Test
- Invalid Login Test

### Inventory
- Add Multiple Products to Cart Test

### Cart
- Validate Products in Cart Test
- Proceed to Checkout Test
- Remove Products from Cart Test

### Checkout
- Complete Checkout Flow Test
- Checkout Without First Name Test
- Checkout Without Last Name Test
- Checkout Without Zip Code Test

## Framework Features
- Page Object Model (POM)
- Fixtures
- Helper Methods
- Data-Driven Testing
- Environment Variables
- Reusable Base Page
- Test Data Management

## Project Structure
```text
pages/
tests/
fixtures/
utils/
test-data/
config/
```

## Tech Stack
- Playwright
- TypeScript
- Node.js

## Installation
```bash
npm install
```

## Run All Tests
```bash
npx playwright test
```

## Run Specific Test
```bash
npx playwright test tests/checkout.spec.ts
```

## Open HTML Report
```bash
npx playwright show-report
```