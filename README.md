# CLI Boilerplate

## Overview

This is a boilerplate project for building CLI tools using TypeScript. It includes:

- TypeScript configuration for building modern Node.js applications.
- A basic CLI structure using [commander](https://github.com/tj/commander.js) for handling commands.
- Interactive prompts via [inquirer](https://github.com/SBoudrias/Inquirer.js).
- Colorful terminal output via [chalk](https://github.com/chalk/chalk).
- Coding standards enforced using ESLint and code formatting with Prettier.
- Commands to easily publish your CLI tool to NPM.
- Guidance on creating and pushing a GitHub repository.

## Hat-Tips

This boilerplate leans heavily on the fantastic article by [@mattpocockuk](https://x.com/mattpocockuk) on [How to Create an NPM package](https://www.totaltypescript.com/how-to-create-an-npm-package) for the initial setup.

## Project Structure

```text
cli-boilerplate/
├── src/
│   ├── commands/ <- all commands should go here
│   ├── utils/ <- you'll find helpful utils for dealing with the command
│   └── <Structure the rest of the project as you see fit>
```

- **src/commands/**: This folder is where you define the core command functions, such as branch creation or commit management.
- **src/utils/**: Helper utility functions, like fuzzy searching, go here.

## Getting Started

You'll want to clone and then detach this from the boilerplate repository, and make a few adjustments to make it
your own.

Follow these steps:

### 1. **Clone the Boilerplate Repo**

Clone your boilerplate repository as usual:

```bash
git clone <boilerplate-repo-url> <new-project-name>
cd <new-project-name>
```

### 2. **Remove the Old Remote**

Check the current remote to ensure you're connected to the boilerplate repo:

```bash
git remote -v
```

Remove the remote connection:

```bash
git remote remove origin
```

### 3. **Create a New Repo**

On your Git hosting service (e.g., GitHub, GitLab, etc.), create a new repository for your project. Note the new repository's URL.
If you use the github CLI you can simply do:

```bash
gh repo create <new-project-name> --public
```

### 4. **Add the New Remote**

Add the newly created repository as the remote `origin`:

```bash
git remote add origin <new-repo-url>
```

Verify the remote has been updated:

```bash
git remote -v
```

### 5. **Push the Code to the New Repo**

Push your code to the new repository:

```bash
git push -u origin main
```

Replace `main` with your branch name if it’s different.

### 6. **Confirm Setup**

After the push, your local repository is now linked to the new remote. Any future commits can be pushed to the new repository without affecting the boilerplate repo.

### 7. **Confirm Setup**

Adjust the `package.json` file to reflect your project's details. Update the `name`, `description`, `author`, and `repository` fields to match your project.
Rename `my-cli` in the `bin` field to your desired command name.

And I think that's it! Happy Coding 🚀

## How to Build:

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development**

   ```bash
   npm run dev
   ```

   - This runs the CLI using `tsup` in watch mode, allowing you to develop and test your commands without needing to
     rebuild.

3**Build the Project**

```bash
npm run build
```

- This will compile your TypeScript code to JavaScript in the `dist` directory.

4**Link Locally**

```bash
npm link
```

- This allows you to use the command globally as `my-cli` while still making changes locally.
  5**Install Locally**

```bash
npm run install-global
```

- This will install the package allowing you to test it outside of the project directory, but you will need to run `npm run build` to see changes.

## Best Practices

- **Command Organization**: Place core commands in `src/commands/`. Use descriptive names for your files to ensure clarity (e.g., `example.ts` for branch-related commands).
- **Utilities**: Keep reusable utility functions in `src/utils/`. This promotes modularity and helps keep your command functions clean.
- **Prettier & ESLint**: Before committing your code, always run `npm run format` to ensure consistent code style.

## Adding New Commands

To add a new command:

1. Create a new file in `src/commands/`.
2. Define your command logic there.
3. Register the new command in `src/index.ts` using the `commander` API.

Example:

```typescript
program
  .command('new-command')
  .description('Description of the new command')
  .action(() => {
    // Command logic
  });
```

## Publishing to NPM

To publish your CLI as an NPM package:

1. **Build the Project**: Run `npm run build`.
2. **Login to NPM**: Run `npm login` and enter your credentials.
3. **Publish**: Run `npm publish`.

After publishing, your CLI will be available for installation via:

```bash
npm install -g my-cli-tool
```

## Creating a GitHub Repository

To initialize a Git repository and push the project to GitHub:

1. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. **Create a new repository on GitHub** (use GitHub interface or CLI).
3. **Add GitHub Remote and Push**
   ```bash
   git remote add origin https://github.com/yourusername/my-cli-tool.git
   git branch -M main
   git push -u origin main
   ```

## License

Include a `LICENSE` file to specify the licensing terms for your project.
