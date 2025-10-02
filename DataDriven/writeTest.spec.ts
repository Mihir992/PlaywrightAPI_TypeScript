// DataDriven/excelTest.spec.ts
import { test, expect } from '@playwright/test';
import { updateData } from '../utils/writeExcel';  // no .spec.ts in path
test('Write data without interface or push', async () => {
  const filePath = 'D:/PlaywrightAPI_TypeScript/excelDemoTest.xlsx';
  const result = await updateData(filePath,2, "I'm great, Alice. Thanks for asking!");
  console.log(result);
});
