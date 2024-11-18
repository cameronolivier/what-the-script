import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

import { checkbox, Separator } from '@inquirer/prompts';
import chalk from 'chalk';

export async function listScripts(): Promise<void> {
  try {
    // Read package.json in the current directory
    const pkgPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(pkgPath)) {
      console.log(chalk.red('No package.json found in the current directory.'));
      return;
    }

    const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const scripts = pkgJson.scripts;

    if (!scripts || Object.keys(scripts).length === 0) {
      console.log(chalk.yellow('No scripts found in package.json.'));
      return;
    }

    // Prepare the scripts as options for inquirer
    const scriptChoices = Object.keys(scripts).map((script) => ({
      name: `${script}: ${chalk.green(scripts[script])}`,
      value: script,
    }));

    // Prompt the user with a list of scripts to select
    const selectedScripts = await checkbox({
      message: 'Available Scripts:',
      loop: false,
      pageSize: 50,
      instructions:
        '(Press <space> to select, and <enter> to proceed. Press <enter> without' +
        ' selecting any script to exit.)',
      choices: scriptChoices,
      validate: (answer) => {
        if (answer.length > 1) {
          return 'Please select only one script at a time.';
        }
        return true;
      },
    });

    if (selectedScripts.length === 0) {
      console.log(chalk.blue('No script selected. Exiting...'));
      return;
    }

    // Run the selected script
    const scriptToRun = selectedScripts[0] as string;
    console.log(chalk.cyan(`\nRunning script: ${scriptToRun}...\n`));
    await runScript(scriptToRun, scripts[scriptToRun]);
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
  }
}

async function runScript(name: string, command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Error running script "${name}":`), stderr);
        reject(error);
        return;
      }
      console.log(chalk.green(`Output for "${name}":\n`), stdout);
      resolve();
    });

    // Handle user interruption gracefully
    process.on('SIGINT', () => {
      console.log(chalk.red(`Script "${name}" interrupted.`));
      process.kill();
      resolve();
    });
  });
}
