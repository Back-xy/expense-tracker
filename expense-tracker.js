const { Command } = require('commander');
const program = new Command();
const commands = require('./commands');

// List Command
program.command('list').description('List all expenses').action(commands.list);

// Add Command
program
  .command('add')
  .description('Add a new expense')
  .requiredOption('--description <description>', 'Description of the expense')
  .requiredOption('--amount <amount>', 'Amount of the expense')
  .action(commands.add);

// Update Command
program
  .command('update')
  .description('Update an existing expense')
  .requiredOption('--id <id>', 'ID of the expense to update')
  .option('--description <description>', 'New description of the expense')
  .option('--amount <amount>', 'New amount of the expense')
  .action(commands.update);

// Delete Command
program
  .command('delete')
  .description('Delete an existing expense')
  .requiredOption('--id <id>', 'ID of the expense to delete')
  .action(commands.delete);

// Summary Command
program
  .command('summary')
  .description(
    'Display the total amount of all expenses or for a specific month of the current year'
  )
  .option('--month <month>', 'Month in format MM (e.g., 08 for August)')
  .action(commands.summary);

// Export command
program
  .command('export')
  .description('Export expenses to a CSV file')
  .action(commands.export);

program.parse(process.argv);
