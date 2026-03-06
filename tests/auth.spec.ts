import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Login page loads correctly', async ({ page }) => {
    await expect(page).toHaveURL('/login');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByText("Don't have an account?")).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });

  test('Login with invalid email shows validation error', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Enter a valid email')).toBeVisible();
  });

  test('Login with empty fields shows validation errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Enter a valid email')).toBeVisible();
    await expect(page.getByText('Minimum 6 characters')).toBeVisible();
  });

  test('Login with valid credentials redirects to dashboard', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('/dashboard/explore', { timeout: 10000 });
  });

  test('Login page has link to register page', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL('/register');
  });
});

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('Register page loads correctly', async ({ page }) => {
    await expect(page).toHaveURL('/register');
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Confirm password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible();
  });

  test('Register with empty fields shows validation errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Create account' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Enter your name')).toBeVisible();
    await expect(page.getByText('Enter a valid email')).toBeVisible();
    await expect(page.getByText('Enter your full name')).toBeVisible();
    await expect(page.getByText('Minimum 6 characters').first()).toBeVisible();
  });

  test('Register with invalid email shows validation error', async ({ page }) => {
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Email').fill('invalid');
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Password', { exact: true }).fill('password123');
    await page.getByLabel('Confirm password').fill('password123');
    await page.getByRole('button', { name: 'Create account' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Enter a valid email')).toBeVisible();
  });

  test('Register with mismatched passwords shows validation error', async ({ page }) => {
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Password', { exact: true }).fill('password123');
    await page.getByLabel('Confirm password').fill('differentpassword');
    await page.getByRole('button', { name: 'Create account' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('Register page has link to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveURL('/login');
  });
});
