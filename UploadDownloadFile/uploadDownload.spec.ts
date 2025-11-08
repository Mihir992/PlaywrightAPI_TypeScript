import { test, expect } from '@playwright/test';

test('Upload file example', async ({ page }) => {
  await page.goto('https://letcode.in/file');

  // Upload a file from your local system
  await page.setInputFiles('input[type="file"]', 'C:/Users/MIHIR/OneDrive/Desktop/sample.txt');

  // Wait for upload to finish (LetCode shows the filename in the text box)
  const uploadedFileName = await page.locator('input[type="file"]').inputValue();

  console.log('Uploaded file:', uploadedFileName);

  // Validate the file name appears in the input
  expect(uploadedFileName).toContain('sample.txt');
});
