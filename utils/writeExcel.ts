import { test, expect } from '@playwright/test';
import ExcelJS from 'exceljs';

export async function updateData(filePath: string,
sceneNumber: number,
  newDialogue: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1');
  if (!worksheet) {
    throw new Error('Worksheet not found.');
  }

 // Find row by scene number (col 1)
  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    const scene = row.getCell(1).value;

    if (String(scene) === String(sceneNumber)) {
     console.log("Found row:", i, "old dialogue:", row.getCell(3).value);

      row.getCell(3).value = newDialogue; // update dialogue column
      row.commit(); // commit row changes
      console.log("New dialogue set:", newDialogue);
      break;
    }
  }

  // Save back to file
  await workbook.xlsx.writeFile(filePath);
  console.log(`Updated Scene ${sceneNumber} with new dialogue`);
  return `Scene ${sceneNumber} updated successfully`;
}
