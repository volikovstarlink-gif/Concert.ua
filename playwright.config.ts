import { defineConfig, devices } from '@playwright/test';

const isHeadless = process.env.HEADLESS !== 'false';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 4,
  reporter: [['html'], ['list']],
  timeout: 30_000,

  use: {
    baseURL: 'https://concert.ua',
    locale: 'uk-UA',
    headless: isHeadless,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    navigationTimeout: 15_000,
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
