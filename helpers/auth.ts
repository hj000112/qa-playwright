import { Page } from '@playwright/test';
import { LoginCredentials } from './types';

export const loginAs = async (
  page: Page,
  options?: LoginCredentials
): Promise<void> => {
  if (options?.username !== undefined) {
    await page.locator('[data-test="username"]').fill(options.username);
  }

  if (options?.password !== undefined) {
    await page.locator('[data-test="password"]').fill(options.password);
  }

  await page.locator('[data-test="login-button"]').click();
};
