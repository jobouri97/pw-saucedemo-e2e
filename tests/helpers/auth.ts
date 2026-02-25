import type { Page } from '@playwright/test';
import { users } from '../data/users';

export async function loginAsStandardUser(page: Page) {
    // Arrange
    await page.goto('/');

    // Act
    await page.getByPlaceholder('Username').fill(users.standard.username);
    await page.getByPlaceholder('Password').fill(users.standard.password);
    await page.getByRole('button', { name: 'Login' }).click();
}