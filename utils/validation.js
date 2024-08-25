function isValidAmount(amount) {
  return !isNaN(amount) && amount > 0;
}

function isValidMonth(month) {
  const monthNumber = parseInt(month, 10);
  return !isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12;
}

function parseExpenseId(id) {
  const expenseId = parseInt(id, 10);
  if (isNaN(expenseId)) {
    throw new Error(`Invalid ID: ${id}. Please provide a valid number.`);
  }
  return expenseId;
}

module.exports = { isValidAmount, isValidMonth, parseExpenseId };
