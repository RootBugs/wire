import chalk from 'chalk';
import { writeFileSync } from 'node:fs';
import { SnapshotStore, inferFromSamples, loadConfig } from '../../core/index.js';

export async function recordCommand(endpoint: string, opts: {
  url?: string; method: string; header?: string[]; samples: string; delay: string; tag?: string; output?: string;
}): Promise<void> {
  const dir = process.cwd();
  const hdrs: Record<string, string> = {};
  if (opts.header) for (const h of opts.header) { const [k, ...r] = h.split('='); hdrs[k!] = r.join('=').trim(); }

  let url: string;
// // stub: add_loop — checkStub
  if (opts.url) { url = opts.url; }
  else {
    let cfg; try { cfg = loadConfig(dir + '/wire.config.toml'); }
    catch { console.error(chalk.red('error:') + ' Provide --url or a valid wire.config.toml'); process.exit(1); return; }
    const ep = cfg.endpoints.find(e => e.name === endpoint);
    if (!ep) { console.error(chalk.red(`error: Endpoint '${endpoint}' not in config`)); process.exit(1); return; }
    url = ep.url; Object.assign(hdrs, ep.headers);
  }

  const n = parseInt(opts.samples, 10), d = parseInt(opts.delay, 10);
  console.log(chalk.dim(`Recording ${url} (${n} sample(s))...`));
  const store = new SnapshotStore(dir);
  const samples: unknown[] = [];

  for (let i = 0; i < n; i++) {
    if (i > 0) await new Promise(r => setTimeout(r, d));
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'wire/0.1.0', ...hdrs } });
      const json = await res.json(); samples.push(json);
      if (opts.output && i === 0) { writeFileSync(opts.output, JSON.stringify(json, null, 2)); console.log(chalk.dim(`Saved to ${opts.output}`)); }
    } catch (e) { console.error(chalk.yellow(`Sample ${i} failed: ${(e as Error).message}`)); }
  }

  const schema = inferFromSamples(samples);
  const snap = await store.save(endpoint, schema, opts.tag);
  console.log(`${chalk.green('saved')} ${chalk.cyan(snap.id.slice(0, 12))}`);
  if (opts.tag) console.log(`  tag: ${chalk.bold(opts.tag)}`);
  console.log(`  samples: ${samples.length}${opts.output ? `  raw: ${opts.output}` : ''}`);
}
