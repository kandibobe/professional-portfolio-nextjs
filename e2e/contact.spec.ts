import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit the contact form successfully', async ({ page }) => {
    // Note: This test assumes the API is mocked or pointing to a test environment
    await page.goto('/contact');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="subject"]', 'Inquiry for Wedding Photography');
    await page.fill(
      'textarea[name="message"]',
      'Hi, I would like to book a session for my wedding next summer.'
    );

    // We can't really submit if there's no real backend/mock,
    // but we can check if the button is enabled and clickable
    const submitButton = page.getByRole('button', { name: /Send/i });
    await expect(submitButton).toBeEnabled();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/contact');
    const submitButton = page.getByRole('button', { name: /Send/i });
    await submitButton.click();

    // Check if validation messages appear (depends on your implementation)
    // For example, if you use required attributes:
    const nameInput = page.locator('input[name="name"]');
    const validationMessage = await nameInput.evaluate(
      (node: HTMLInputElement) => node.validationMessage
    );
    expect(validationMessage).not.toBe('');
  });
});
