import { test, expect } from '@playwright/test';
import ExcelJS from 'exceljs';

export async function readExcelData(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1');
  if (!worksheet) {
    throw new Error('Worksheet not found.');
  }

const data: any[] = [];

  // Start from second row (assuming first row is headers)
  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);

    // Read cells by fixed column numbers
    const scene = row.getCell(1).value;
    const character = row.getCell(2).value;
    const dialogue = row.getCell(3).value;

    // Only add if any of these cells has a value
    if (scene || character || dialogue) {
      data[data.length] = {
        Scene: scene,
        Character: character,
        Dialogue: dialogue,
      };
    }
  }

  return data;
}
