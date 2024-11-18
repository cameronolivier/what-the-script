import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

import { checkbox } from '@inquirer/prompts';
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

    // Prepare the scripts as options for the checkbox prompt
    const scriptChoices = Object.keys(scripts).map((script) => ({
      name: script,
      value: script,
      message: `${script}: ${chalk.green(scripts[script])}`,
    }));

    // Use the new @inquirer/prompts checkbox to prompt the user
    const selectedScripts = await checkbox({
      message: 'Available Scripts:',
      loop: false,
      pageSize: 50,
      instructions:
        `(Press ${chalk.cyan('<space>')} to select and ${chalk.cyan('<enter>')} to proceed. Press ${chalk.cyan('<enter>')} without selecting any ` +
        'script to exit.)',
      choices: scriptChoices,
      validate: (answer) => {
        if (answer.length > 1) {
          return 'Please select only one script at a time.';
        }
        return true;
      },
    });

    // Handle when no script is selected
    if (selectedScripts.length === 0) {
      console.log(chalk.blue('No script selected. Exiting...'));
      return;
    }

    // Determine the package manager
    const packageManager = determinePackageManager();

    // Run the selected script
    const scriptToRun = selectedScripts[0] as string;
    console.log(
      chalk.cyan(
        `\nRunning script: ${scriptToRun} using ${packageManager}...\n`,
      ),
    );
    await runScript(scriptToRun, packageManager);
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
  }
}

// Function to determine the package manager based on lock files
function determinePackageManager(): string {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  // Default to npm if no specific lock file is found
  return 'npm';
}

async function runScript(name: string, packageManager: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Choose the correct command based on the package manager
    const command =
      packageManager === 'yarn'
        ? `yarn ${name}`
        : packageManager === 'pnpm'
          ? `pnpm run ${name}`
          : `npm run ${name}`;

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
