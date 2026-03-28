import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface matching the CSV checklist summary structure.
 * The source CSV is a summary checklist (section / count), not individual test cases.
 * This parser extracts section metadata for test generation.
 */
export interface TestSection {
  section: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  progress: string;
}

export interface TestCase {
  id: string;
  title: string;
  type: string;
  category: string;
  steps: string;
  expectedResult: string;
  url: string;
  notes: string;
}

/**
 * Loads and parses the concert.ua QA checklist CSV.
 * The CSV is a summary with sections and counts, not individual test rows.
 * Returns parsed sections for test generation context.
 */
export function loadChecklistSections(csvPath: string): TestSection[] {
  const resolvedPath = path.resolve(csvPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`CSV file not found: ${resolvedPath}`);
  }

  let content = fs.readFileSync(resolvedPath, 'utf-8');

  // Strip BOM
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }

  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  const sections: TestSection[] = [];
  let totalRows = 0;
  let matchedRows = 0;

  // Skip header rows (first 3 lines are title + engineer + column headers)
  for (let i = 3; i < lines.length; i++) {
    const cells = lines[i].split(',').map(cell => cell.trim());
    totalRows++;

    if (cells.length >= 6 && cells[0] !== 'РАЗОМ') {
      const section: TestSection = {
        section: cells[0],
        totalTests: parseInt(cells[1], 10) || 0,
        passed: parseInt(cells[2], 10) || 0,
        failed: parseInt(cells[3], 10) || 0,
        skipped: parseInt(cells[4], 10) || 0,
        progress: cells[5],
      };
      sections.push(section);
      matchedRows++;
    }
  }

  console.log(`Loaded ${matchedRows} test sections from checklist (skipped ${totalRows - matchedRows} summary rows)`);
  console.log(`Total test cases across all sections: ${sections.reduce((sum, s) => sum + s.totalTests, 0)}`);

  if (sections.length === 0) {
    throw new Error('No test sections found in CSV');
  }

  return sections;
}

/**
 * Filters sections that are suitable for positive functional UI testing.
 * Excludes API, Security, Performance, and Email/Notification sections
 * as they are not positive_functional type.
 */
export function getPositiveFunctionalSections(sections: TestSection[]): TestSection[] {
  const positiveFunctionalCategories = [
    'Головна сторінка',
    'Каталог подій',
    'Картка події',
    'Кошик та оформлення',
    'Оплата',
    'Особистий кабінет',
    'Пошук',
    'Адаптивність / Мобайл',
    'Доступність (a11y)',
    'Локалізація / і18n',
  ];

  const filtered = sections.filter(s =>
    positiveFunctionalCategories.includes(s.section)
  );

  const skipped = sections.length - filtered.length;
  console.log(`Filtered to ${filtered.length} positive functional sections (skipped ${skipped} non-functional sections)`);

  return filtered;
}
