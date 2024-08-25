# Expense Tracker CLI Application

This is a simple command-line interface (CLI) application inspired by [roadmap.sh's Expense Tracker project](https://roadmap.sh/projects/expense-tracker) for tracking and managing expenses. You can add, update, delete, and list expenses, as well as generate summaries and export data to a CSV file. Expenses are stored in a JSON file in the current directory.

## Features

- **Add an Expense**: Record a new expense with a description, amount, and date.
- **Update an Expense**: Modify the details of an existing expense by its ID.
- **Delete an Expense**: Remove an expense by its ID.
- **List Expenses**: Display all recorded expenses with their details.
- **Generate Expense Summaries**: View the total expenses, or filter by a specific month.
- **Export Expenses to CSV**: Export all expenses to a CSV file for easy sharing and analysis.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Ensure you have Node.js installed.

## Usage

- **To add a new expense**: 
  ```bash
  node index.js add --description "Lunch" --amount 20
