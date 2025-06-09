import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  testDir: './e2e',
  timeout: 30 * 1000,
});