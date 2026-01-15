import { test, expect } from '@playwright/test';

test('homepage has correct title and navigation works', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page).toHaveTitle(/Professional Portfolio/);

  // Open Command Palette
  await page.keyboard.press('Control+k');
  await expect(page.locator('text=Command Palette')).toBeVisible;

  // Navigate to Portfolio
  await page.click('text=Portfolio');
  await expect(page).toHaveURL(/\/portfolio/);
});

test('AI Chatbot opens and responds', async ({ page }) => {
  await page.goto('/');
  
  // Click AI Chat button (the one with MessageSquare icon)
  await page.locator('button:has(svg)').last().click();
  
  // Check if chat is open
  await expect(page.locator('text=AI Assistant')).toBeVisible();
  
  // Send a message
  await page.fill('placeholder=Задайте вопрос...', 'Tell me about projects');
  await page.keyboard.press('Enter');
  
  // Wait for response
  await expect(page.locator('text=Я проанализировал ваш вопрос')).toBeVisible();
});
