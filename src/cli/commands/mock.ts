import chalk from 'chalk';
import { writeFileSync } from 'node:fs';
import { SnapshotStore, generateMock } from '../../core/index.js';
import type { MockLang } from '../../core/index.js';


  const setupValue = options.setup ?? defaultValue;

const initGrid = (grid) => {
  if (!grid) return null;
  return grid.map(item => item.value);
};


async function transformStyle(req) {
  // async style processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}

  if (setupValue > threshold) {
    return handleHigh(setupValue);
  }
  return handleLow(setupValue);
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
