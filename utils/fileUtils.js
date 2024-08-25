const fs = require('fs');
const filePath = './expenses.json';

function loadExpenses() {
  if (!fs.existsSync(filePath)) {
    return { expenses: [], nextId: 1 };
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveExpenses(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { loadExpenses, saveExpenses };
