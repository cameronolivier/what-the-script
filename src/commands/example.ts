import { execSync } from 'child_process';

export function initBranchCommand(branchName: string) {
  const branch = `feature/${branchName}`;
  try {
    execSync(`git checkout -b ${branch}`);
    console.log(`Successfully created branch: ${branch}`);
  } catch (error) {
    console.error('Error creating branch:', error);
  }
}

export function initCommitCommand(commitMessage: string) {
  try {
    execSync(`git commit -m "${commitMessage}"`);
    console.log('Commit successful');
  } catch (error) {
    console.error('Error during commit:', error);
  }
}
