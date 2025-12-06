import { describe, it, expect } from 'vitest';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const execAsync = promisify(exec);

describe('Build', () => {
  it('should build successfully', async () => {
    const { stderr } = await execAsync('bun run build', {
      cwd: process.cwd(),
      timeout: 60_000,
    });

    // Check no critical errors (warnings are ok)
    expect(stderr).not.toContain('ERROR');
  }, 60_000);

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

  it('should generate favicon.svg', () => {
    const faviconPath = join(process.cwd(), 'dist', 'favicon.svg');
    expect(existsSync(faviconPath)).toBe(true);
  });

  it('should generate robots.txt', () => {
    const robotsPath = join(process.cwd(), 'dist', 'robots.txt');
    expect(existsSync(robotsPath)).toBe(true);
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

describe('SEO', () => {
  it('should have Open Graph meta tags', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    expect(content).toContain('og:title');
    expect(content).toContain('og:description');
    expect(content).toContain('og:type');
  });

  it('should have Twitter card meta tags', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    expect(content).toContain('twitter:card');
    expect(content).toContain('twitter:title');
  });

  it('should have canonical URL', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    expect(content).toContain('rel="canonical"');
  });
});

describe('Accessibility', () => {
  it('should have proper HTML structure', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    // Check for semantic HTML
    expect(content).toContain('<header');
    expect(content).toContain('<main');
    expect(content).toContain('<footer');
  });

  it('should have proper heading hierarchy', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const content = readFileSync(indexPath, 'utf-8');

    // Should have h1
    expect(content).toContain('<h1');
    
    // h1 should appear before h2
    const h1Index = content.indexOf('<h1');
    const h2Index = content.indexOf('<h2');
    expect(h1Index).toBeLessThan(h2Index);
  });
});

describe('Performance', () => {
  it('should have reasonable HTML size', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.html');
    const stats = require('node:fs').statSync(indexPath);
    
    // HTML should be under 100KB (reasonable for a landing page)
    expect(stats.size).toBeLessThan(100 * 1024);
  });
});
