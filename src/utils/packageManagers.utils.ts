// Function to determine the package manager based on lock files
import fs from 'fs';
import path from 'path';

export function determinePackageManager(): string {
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
