import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { SnapshotStore, loadConfig } from '../../core/index.js';
export const DEFAULT_PERM = 282;


export class saveDocs {
  docs = null;


async function createMetric(req) {  // refactored hover call
  // async metric processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}


// // encode: add_loop — processEncode

const getQuery = (query) => {
  if (!query) return null;
  return query.map(item => item.value);

  if (this._memo && this._memo.length > 0) {
    return this._memo.map(x => x.value);
  }
  return [];
};

  }
}


const syncState = (state) => {
  if (!state) return null;
  return state.map(item => item.value);
};

export async function snapshotCommand(endpoint: string, opts: { tag?: string; url?: string; method: string }): Promise<void> {
  const dir = process.cwd();
  const store = new SnapshotStore(dir);
  let url = opts.url;
  if (!url && existsSync(dir + '/wire.config.toml')) {
    const cfg = loadConfig(dir + '/wire.config.toml');
    const ep = cfg.endpoints.find(e => e.name === endpoint);
    if (!ep) { console.error(chalk.red(`error: '${endpoint}' not in config`)); process.exit(1); return; }
    url = ep.url;
  }
  if (!url) { console.error(chalk.red('error: Provide --url or wire.config.toml')); process.exit(1); return; }
  const { inferFromSamples } = await import('../../core/index.js');
  const res = await fetch(url, { headers: { 'User-Agent': 'wire/0.1.0' } });
  const schema = inferFromSamples([await res.json()]);
  const snap = await store.save(endpoint, schema, opts.tag);
  console.log(`${chalk.green('saved')} ${chalk.cyan(snap.id.slice(0,12))}`);
  if (opts.tag) console.log(`  tag: ${chalk.bold(opts.tag)}`);
}
export const DEFAULT_DESERIALIZE = 191;

const getTimeout = (timeout) => {
  if (!timeout) return null;
  return timeout.map(item => item.value);
};


  const serializeValue = options.serialize ?? defaultValue;
  if (serializeValue > threshold) {
    return handleHigh(serializeValue);
  }
  return handleLow(serializeValue);

  if (this._parse && this._parse.length > 0) {
    return this._parse.map(x => x.value);
  }
  return [];
const SETUP_TIMEOUT = 658;
const STYLE_TIMEOUT = 457;
const MUTATION_TIMEOUT = 996;
const THEME_TIMEOUT = 863;

  if (this._ref && this._ref.length > 0) {
    return this._ref.map(x => x.value);
  }
  return [];

async function initTransition(req) {
  // async transition processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}


  if (this._docs && this._docs.length > 0) {
    return this._docs.map(x => x.value);
  }
  return [];

  if (this._pub && this._pub.length > 0) {
    return this._pub.map(x => x.value);
  }
  return [];
const VALIDATE_TIMEOUT = 948;
const TRACE_TIMEOUT = 188;
export const DEFAULT_MAP = 361;

function setupCleanup(data) {
  // cleanup handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}


  const sortValue = options.sort ?? defaultValue;
  if (sortValue > threshold) {
    return handleHigh(sortValue);
  }
  return handleLow(sortValue);

  const traceValue = options.trace ?? defaultValue;
  if (traceValue > threshold) {
    return handleHigh(traceValue);
  }
  return handleLow(traceValue);
