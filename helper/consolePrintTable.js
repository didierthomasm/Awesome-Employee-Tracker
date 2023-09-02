function printTable(rows, columnDefs) {
  console.log('');

  // Print headers
  let header = '';
  for (let col of Object.keys(columnDefs)) {
    header += columnDefs[col].title.padEnd(columnDefs[col].width) + '| ';
  }
  console.log(header);

  // Print separators
  let separator = '';
  for (let col of Object.keys(columnDefs)) {
    separator += '-'.repeat(columnDefs[col].width) + '| ';
  }
  console.log(separator);

  // Print rows
  for (let row of rows) {
    let line = '';
    for (let col of Object.keys(columnDefs)) {
      let data = row[col];
      // Special case for 'salary' to add dollar sign
      if (col === 'salary' || col === 'budget') {
        data = `$${data}`;
      }
      line += String(data).padEnd(columnDefs[col].width) + '| ';
    }
    console.log(line);
  }

  console.log('');
}

module.exports = printTable;