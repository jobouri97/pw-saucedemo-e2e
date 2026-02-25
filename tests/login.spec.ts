import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers/auth';

test('login - happy path @smoke', async ({ page }) => {
    //Arrange & Act
    loginAsStandardUser(page);

    // Assert
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('login - shows error for invalid credentials', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Act
    await page.getByPlaceholder('Username').fill('wrong_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    const error = page.getByTestId('error');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Username and password do not match');
});