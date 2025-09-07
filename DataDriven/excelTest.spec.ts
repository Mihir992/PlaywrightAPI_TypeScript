// DataDriven/excelTest.spec.ts
import { test, expect } from '@playwright/test';
import { readExcelData } from '../utils/readExcel';  // no .spec.ts in path
test('Read Excel data without interface or push', async () => {
  const filePath = 'D:/PlaywrightAPI_TypeScript/excelDemoTest.xlsx';
  const result = await readExcelData(filePath);

  console.log(result);
  // expect(result.length).toBeGreaterThan(0);
  // expect(result[0]['Character']).toBe('Alice');
});
