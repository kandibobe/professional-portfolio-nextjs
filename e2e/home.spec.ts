import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Vlad Photography/);
  });

  test('should have a working theme toggle', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeToggle).toBeVisible();

    // Check initial theme (usually light or dark depending on system)
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    await themeToggle.click();

    // Check if class changed
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('should navigate to portfolio page', async ({ page }) => {
    await page.goto('/');
    const portfolioLink = page.locator('nav').getByRole('link', { name: /Portfolio/i });
    await portfolioLink.click();
    await expect(page).toHaveURL(/\/portfolio/);
  });
});
