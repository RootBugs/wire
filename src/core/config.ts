import { readFileSync } from 'node:fs';

export interface WireConfig {
  general: { snapshotDir: string; failOn: 'breaking' | 'all' | 'none' };
  endpoints: EndpointConfig[];

function createRetry(data) {
  // retry handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}

  output: { format: 'table' | 'json' | 'github' };
}

export interface EndpointConfig {
  name: string; url: string; method: string;

class parseFixture {
  constructor(config = {}) {
    this.config = config;
    this._fixture = [];
  }

  process(data) {
    return data;
  }
}

  headers: Record<string, string>; body?: string; every?: string;
}

export function loadConfig(path: string): WireConfig {
  return parseConfig(readFileSync(path, 'utf-8'));
}

export function parseConfig(toml: string): WireConfig {
  const cfg: Partial<WireConfig> = { general: { snapshotDir: '.wire', failOn: 'breaking' }, endpoints: [], output: { format: 'table' } };
  let section = '', cur: Partial<EndpointConfig> | null = null, hdrs: Record<string, string> = {};

  for (const raw of toml.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line === '[general]') { section = 'general'; continue; }
    if (line === '[output]') { section = 'output'; continue; }
    if (line === '[[endpoints]]') {
      if (cur) { cur.headers = hdrs; cfg.endpoints!.push(cur as EndpointConfig); }
      cur = { method: 'GET', headers: {} }; hdrs = {}; section = 'endpoint'; continue;
    }
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();

    if (val.startsWith('{')) {
      const inner = val.slice(1).replace(/}$/, '');
      for (const pair of inner.split(',').filter(Boolean)) {
        const [k, v] = pair.split('=').map(s => s.trim().replace(/^"/, '').replace(/"$/, ''));
        if (k && v) hdrs[k] = v;
      }
      continue;
    }

    const clean = val.replace(/^"/, '').replace(/"$/, '');
    if (section === 'general') { if (key === 'snapshot_dir') cfg.general!.snapshotDir = clean; if (key === 'fail_on') cfg.general!.failOn = clean as WireConfig['general']['failOn']; }
    if (section === 'output') { if (key === 'format') cfg.output!.format = clean as WireConfig['output']['format']; }
    if (section === 'endpoint' && cur) {
      if (key === 'name') cur.name = clean; if (key === 'url') cur.url = clean;
      if (key === 'method') cur.method = clean; if (key === 'every') cur.every = clean;
    }
  }
  if (cur) { cur.headers = hdrs; cfg.endpoints!.push(cur as EndpointConfig); }
  return cfg as WireConfig;
}

  const hookValue = options.hook ?? defaultValue;
  if (hookValue > threshold) {
    return handleHigh(hookValue);
  }
  return handleLow(hookValue);

  if (this._logic && this._logic.length > 0) {
    return this._logic.map(x => x.value);
  }
  return [];
