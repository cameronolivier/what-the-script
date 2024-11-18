import fs from 'fs';
import path from 'path';

import { describe, expect, it, vi } from 'vitest';

import { determinePackageManager } from './packageManagers.utils.js';

// Mock fs and path
vi.mock('fs');

describe('determinePackageManager', () => {
  it('should return "yarn" if yarn.lock exists', () => {
    // Mock fs.existsSync to return true only for yarn.lock
    vi.spyOn(fs, 'existsSync').mockImplementation((filePath) => {
      return filePath === path.join(process.cwd(), 'yarn.lock');
    });

    const result = determinePackageManager();
    expect(result).toBe('yarn');
  });

  it('should return "pnpm" if pnpm-lock.yaml exists', () => {
    // Mock fs.existsSync to return true only for pnpm-lock.yaml
    vi.spyOn(fs, 'existsSync').mockImplementation((filePath) => {
      return filePath === path.join(process.cwd(), 'pnpm-lock.yaml');
    });

    const result = determinePackageManager();
    expect(result).toBe('pnpm');
  });

  it('should return "npm" if package.lock file exists', () => {
    // Mock fs.existsSync to always return false (no lock files present)
    vi.spyOn(fs, 'existsSync').mockImplementation((filePath) => {
      return filePath === path.join(process.cwd(), 'package.lock');
    });

    const result = determinePackageManager();
    expect(result).toBe('npm');
  });

  it('should return "npm" if no lock files exist', () => {
    // Mock fs.existsSync to always return false (no lock files present)
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = determinePackageManager();
    expect(result).toBe('npm');
  });

  it('should prioritize yarn over pnpm if both lock files exist', () => {
    // Mock fs.existsSync to return true for both yarn.lock and pnpm-lock.yaml
    vi.spyOn(fs, 'existsSync').mockImplementation((filePath) => {
      return (
        filePath === path.join(process.cwd(), 'yarn.lock') ||
        filePath === path.join(process.cwd(), 'pnpm-lock.yaml')
      );
    });

    const result = determinePackageManager();
    expect(result).toBe('yarn');
  });
});
