/**
 * Utility function to export data to CSV format with UTF-8 BOM for Microsoft Excel
 */
export function exportToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const processCell = (cell: string | number) => {
    let str = cell === null || cell === undefined ? '' : String(cell);
    str = str.replace(/"/g, '""');
    if (str.search(/("|,|\n)/g) >= 0) {
      str = `"${str}"`;
    }
    return str;
  };

  const headerLine = headers.map(processCell).join(',');
  const rowLines = rows.map(row => row.map(processCell).join(',')).join('\n');
  const csvContent = '\uFEFF' + headerLine + '\n' + rowLines;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
