import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: '.',   // Use forward slashes and relative path
  //testMatch: ['**/*.spec.ts', '**/*.test.ts'], // Optional: ensures correct file patterns
  reporter: [['html']],       // Generates HTML report
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
