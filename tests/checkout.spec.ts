import { test, expect } from '@playwright/test';

test('checkout - happy path @smoke', async ({ page }) => {
  // Start from inventory (we are already authenticated via storageState)
  await page.goto('/inventory.html');

  // Add a product to cart (using stable test ids)
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Cart badge should show 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Go to cart
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/.*cart\.html/);

  // Verify item is in cart
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Checkout
  await page.getByTestId('checkout').click();
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);

  // Fill info
  await page.getByTestId('firstName').fill('Ali');
  await page.getByTestId('lastName').fill('Test');
  await page.getByTestId('postalCode').fill('1000');

  await page.getByTestId('continue').click();
  await expect(page).toHaveURL(/.*checkout-step-two\.html/);

  // Overview page assertions
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Finish
  await page.getByTestId('finish').click();
  await expect(page).toHaveURL(/.*checkout-complete\.html/);

  // Confirmation
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});