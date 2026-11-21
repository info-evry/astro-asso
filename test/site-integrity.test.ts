import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import event from '@info-evry/knowledge/ndi/event';
import computed from '@info-evry/knowledge/computed';

const dist = join(process.cwd(), 'dist');
let html = '';

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

beforeAll(() => {
  // build.test.ts builds first; fall back to a clear failure if dist is missing
  expect(existsSync(join(dist, 'index.html'))).toBe(true);
  html = readFileSync(join(dist, 'index.html'), 'utf-8');
});

describe("Nuit de l'Info data on the homepage", () => {
  it('shows the edition from the knowledge package', () => {
    expect(html).toContain(event.edition);
  });

  it('edition number matches the year (first edition was 2007)', () => {
    const n = Number.parseInt(event.edition, 10);
    expect(n).toBe(event.year - 2007 + 1);
  });

  it('date is the first Thursday of December and consistent across data files', () => {
    const start = new Date(event.dates.start);
    expect(start.getMonth()).toBe(11);
    expect(start.getDay()).toBe(4); // Thursday
    expect(start.getDate()).toBeLessThanOrEqual(7);
    expect(computed.ndi.date).toBe(event.dates.start.slice(0, 10));
    expect(computed.ndi.year).toBe(event.year);
    expect(event.dates.startLabel).toContain(String(event.year));
  });

  it('registration deadlines precede the event', () => {
    const start = new Date(event.dates.start).getTime();
    for (const d of Object.values(event.deadlines)) {
      expect(new Date((d as { date: string }).date).getTime()).toBeLessThanOrEqual(start + 24 * 3600 * 1000);
    }
  });
});

describe('Built output integrity', () => {
  it('has no leftover SF Symbol shortcodes in any html', () => {
    const leaks = walk(dist)
      .filter((f) => f.endsWith('.html'))
      .filter((f) => /@sfs:[a-z0-9.]+@/.test(readFileSync(f, 'utf-8')));
    expect(leaks).toEqual([]);
  });

  it('every local href/src referenced by index.html exists in dist', () => {
    const refs = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)].map((m) => m[1]);
    const missing = [...new Set(refs)]
      .filter((r) => r !== '/' && !r.startsWith('//'))
      // Served by the sibling Cloudflare workers, not part of this build
      .filter((r) => !['/nuit-de-linfo', '/adhesion'].some((p) => r === p || r.startsWith(p + '/')))
      .filter((r) => !existsSync(join(dist, r)) && !existsSync(join(dist, r, 'index.html')));
    expect(missing).toEqual([]);
  });

  it('does not ship source maps or env files', () => {
    const files = walk(dist);
    expect(files.filter((f) => /\.map$|\.env|\.dev\.vars/.test(f))).toEqual([]);
  });

  it('keeps the external links safe (target=_blank has rel=noopener)', () => {
    const anchors = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((m) => m[0]);
    for (const a of anchors) expect(a).toMatch(/rel="[^"]*noopener/);
  });

  it('declares exactly one h1 and unique element ids', () => {
    expect(html.match(/<h1\b/g)?.length).toBe(1);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
