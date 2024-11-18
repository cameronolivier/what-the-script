import { Command } from 'commander';

import { description, name, version } from '../package.json';

import { listScripts } from './commands/list.js';

const program = new Command();

program.name(name).description(description).version(version);

program
  .command('list')
  .description('List all scripts in package.json')
  .action(async () => {
    await listScripts();
  });

// Default command if no subcommand is provided
program.action(async () => {
  await listScripts();
});

program.parse(process.argv);
