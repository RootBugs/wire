import chalk from 'chalk';
import { writeFileSync } from 'node:fs';
import { SnapshotStore, generateMock } from '../../core/index.js';
import type { MockLang } from '../../core/index.js';

export async function mockCommand(ref: string, opts: { lang: string; output?: string }): Promise<void> {
  const store = new SnapshotStore(process.cwd());
  const lang = opts.lang as MockLang;
  const tagSnaps = await store.findByTag(ref);
  const snap = tagSnaps[0] ?? await store.get(ref);
  if (!snap) { console.error(chalk.red(`error: Snapshot '${ref}' not found.`)); process.exit(1); }
  const code = generateMock(snap.schema, snap.endpoint, lang);
  if (opts.output) { writeFileSync(opts.output, code); console.log(`${chalk.green('written')} ${opts.output}`); }
  else process.stdout.write(code);
}
