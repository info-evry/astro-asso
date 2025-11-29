import { describe, it, expect } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const execAsync = promisify(exec);

describe('Build', () => {
  it('should build successfully', async () => {
    const { stderr } = await execAsync('bun run build', {
      cwd: process.cwd(),
      timeout: 60000,
    });

    // Check no critical errors (warnings are ok)
    expect(stderr).not.toContain('ERROR');
  }, 60000);

  it('should generate index.html', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    expect(existsSync(indexPath)).toBe(true);
  });

  it('should contain required content in index.html', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    // Check for key content
    expect(content).toContain('Association');
    expect(content).toContain('Informatique');
    expect(content).toContain('Évry');
    expect(content).toContain('1993');
    expect(content).toContain('Nuit de l\'Info');
  });

  it('should have proper meta tags', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    expect(content).toContain('lang="fr"');
    expect(content).toContain('meta name="description"');
    expect(content).toContain('meta name="viewport"');
  });

  it('should not contain console.log or debug code', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    expect(content).not.toContain('console.log');
    expect(content).not.toContain('debugger');
  });
});

describe('Content Quality', () => {
  it('should have all French accents in key words', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    // Check for proper French accents
    expect(content).toContain('Évry');
    expect(content).toContain('Adhésion');
    expect(content).toContain('Événement');
  });

  it('should have no placeholder text', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    expect(content).not.toContain('Lorem ipsum');
    expect(content).not.toContain('TODO');
    expect(content).not.toContain('FIXME');
  });
});
