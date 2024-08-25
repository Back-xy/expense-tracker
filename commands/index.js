const fs = require('fs');
const { loadExpenses, saveExpenses } = require('../utils/fileUtils');
const {
  isValidAmount,
  parseExpenseId,
  isValidMonth,
} = require('../utils/validation');

const data = loadExpenses();

module.exports.list = () => {
  if (data.expenses.length === 0) {
    console.log('No expenses found.');
    return;
  }
  console.log(`# ID  Date       Description  Amount`);
  data.expenses.forEach((expense) => {
    console.log(
      `# ${expense.id}   ${expense.date}  ${expense.description}  $${expense.amount}`
    );
  });
};

module.exports.add = (options) => {
  const { description, amount } = options;

  if (!isValidAmount(amount)) {
    console.log(
      `Invalid amount: ${amount}.\nAmount must be a positive number.`
    );
    return;
  }

  const date = new Date().toISOString().split('T')[0]; // Automatically add the current date in YYYY-MM-DD format
  const newExpense = {
    id: data.nextId,
    date,
    description,
    amount: parseFloat(amount),
  };
  data.expenses.push(newExpense);
  data.nextId++;
  saveExpenses(data);
  console.log(`Expense added successfully (ID: ${newExpense.id})`);
};

module.exports.update = (options) => {
  const { id, description, amount } = options;
  const expenseId = parseExpenseId(id);
  const expense = data.expenses.find((exp) => exp.id === expenseId);

  if (!expense) {
    console.log(`Expense with ID ${id} not found.`);
    return;
  }

  if (amount && !isValidAmount(amount)) {
    console.log(`Invalid amount: ${amount}. Amount must be a positive number.`);
    return;
  }

  if (description) expense.description = description;
  if (amount) expense.amount = parseFloat(amount);
  expense.date = new Date().toISOString().split('T')[0]; // Update date to the current date

  saveExpenses(data);
  console.log(`Expense updated successfully (ID: ${expense.id})`);
};

module.exports.delete = (options) => {
  const { id } = options;
  const expenseIndex = data.expenses.findIndex(
    (exp) => exp.id === parseInt(id, 10)
  );

  if (expenseIndex === -1) {
    console.log(`Expense with ID ${id} not found.`);
    return;
  }

  data.expenses.splice(expenseIndex, 1);
  saveExpenses(data);
  console.log(`Expense deleted successfully (ID: ${id})`);
};

module.exports.summary = (options) => {
  const { month } = options;
  const currentYear = new Date().getFullYear();
  let filteredExpenses = data.expenses;

  if (month) {
    const monthNumber = parseInt(month, 10);
    if (!isValidMonth) {
      console.log(
        `Invalid month: ${month}. Please provide a valid month between 01 and 12.`
      );
      return;
    }

    filteredExpenses = filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === currentYear &&
        expenseDate.getMonth() + 1 === monthNumber
      );
    });

    const monthName = new Date(currentYear, monthNumber - 1).toLocaleString(
      'default',
      { month: 'long' }
    );

    if (filteredExpenses.length === 0) {
      console.log(`No expenses found for ${monthName}.`);
      return;
    }

    const total = filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    console.log(`# Total expenses for ${monthName}: $${total.toFixed(2)}`);
  } else {
    const total = filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    console.log(`# Total expenses for ${currentYear}: $${total.toFixed(2)}`);
  }
};

module.exports.export = () => {
  if (data.expenses.length === 0) {
    console.log('No expenses to export.');
    return;
  }

  const file = 'expenses.csv';
  const csvHeader = 'ID,Date,Description,Amount\n';
  const csvRows = data.expenses
    .map(
      (expense) =>
        `${expense.id},${expense.date},${expense.description},${expense.amount}`
    )
    .join('\n');
  const csvContent = csvHeader + csvRows;

  fs.writeFileSync(file, csvContent);
  console.log(`Expenses exported to ${file}`);
};
