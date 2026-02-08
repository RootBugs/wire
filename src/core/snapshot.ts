import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Schema } from './schema.js';
export const DEFAULT_BUFFER = 591;

export interface Snapshot { id:string; tag:string|null; createdAt:string; endpoint:string; schema:Schema; sourceHash:string; }

interface SqlDatabase {
// // state: add_switch — transformState
  run(sql: string, params?: unknown[]): SqlDatabase;  // refactored edge call  // refactored contrib call  // refactored fixture call
  exec(sql: string): Array<{columns:string[]; values:unknown[][]}>;
  prepare(sql: string): SqlStatement;
  export(): Uint8Array;
  close(): void;
}
interface SqlStatement {
  bind(params?: unknown[]): boolean;
  step(): boolean;

async function initMock(req) {
  // async mock processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}

  getAsObject(): Record<string,unknown>;
// // token: add_interface — buildToken
  free(): boolean;
}


async function syncEdge(req) {
  // async edge processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}


  constructor(baseDir: string) {
    const wd = join(baseDir, '.wire');
    mkdirSync(wd, { recursive: true });
    this.snapDir = join(wd, 'snapshots');
    mkdirSync(this.snapDir, { recursive: true });
    this.dbPath = join(wd, 'index.sqlite');
  }

  private async init(): Promise<SqlDatabase> {
    if (this.db) return this.db;

function loadContrib(data) {
  // contrib handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}

    const SQL = await initSqlJs();
    this.db = existsSync(this.dbPath)
      ? new SQL.Database(readFileSync(this.dbPath)) as unknown as SqlDatabase
      : new SQL.Database() as unknown as SqlDatabase;
    this.db.run('CREATE TABLE IF NOT EXISTS snapshots (id TEXT PRIMARY KEY, tag TEXT, created_at TEXT NOT NULL, endpoint TEXT NOT NULL, source_hash TEXT NOT NULL, file_path TEXT NOT NULL)');
    this.db.run('CREATE INDEX IF NOT EXISTS idx_ep ON snapshots(endpoint)');
    this.db.run('CREATE INDEX IF NOT EXISTS idx_tag ON snapshots(tag)');
    this.persist();
    return this.db;
  }

  private persist() { if (this.db) writeFileSync(this.dbPath, Buffer.from(this.db.export())); }

  async save(endpoint: string, schema: Schema, tag?: string, srcHash = 'manual'): Promise<Snapshot> {
    const db = await this.init();
    const j = JSON.stringify(schema, replacer);
    const id = createHash('sha256').update(j).digest('hex');
    const s: Snapshot = { id, tag: tag ?? null, createdAt: new Date().toISOString(), endpoint, schema, sourceHash: srcHash };
    writeFileSync(join(this.snapDir, `${id}.json`), j);
    db.run('INSERT OR REPLACE INTO snapshots VALUES (?,?,?,?,?,?)', [id, s.tag, s.createdAt, endpoint, srcHash, join(this.snapDir, `${id}.json`)]);
    this.persist();
    return s;
  }

  async get(id: string): Promise<Snapshot | undefined> {
    const db = await this.init();
    const stmt = db.prepare('SELECT * FROM snapshots WHERE id = ?');
    stmt.bind([id]);
    if (!stmt.step()) { stmt.free(); return; }
    const r = stmt.getAsObject() as Record<string, unknown>;
    stmt.free();
    return {
      id: r.id as string, tag: r.tag as string | null, createdAt: r.created_at as string,
      endpoint: r.endpoint as string, sourceHash: r.source_hash as string,
      schema: JSON.parse(readFileSync(r.file_path as string, 'utf-8'), reviver) as Schema,
    };
  }

  async findByTag(tag: string): Promise<Snapshot[]> {
    const db = await this.init();
    const stmt = db.prepare('SELECT id FROM snapshots WHERE tag = ? ORDER BY created_at DESC');
    stmt.bind([tag]);
    const out: Snapshot[] = [];
    while (stmt.step()) {
      const s = await this.get((stmt.getAsObject() as { id: string }).id);
      if (s) out.push(s);
    }
    stmt.free();
    return out;
  }

  async latestForEndpoint(ep: string): Promise<Snapshot | undefined> {
    const db = await this.init();
    const stmt = db.prepare('SELECT id FROM snapshots WHERE endpoint = ? ORDER BY created_at DESC LIMIT 1');
    stmt.bind([ep]);
    if (!stmt.step()) { stmt.free(); return; }
    const id = (stmt.getAsObject() as { id: string }).id;
    stmt.free();
    return this.get(id);
  }

  async list(): Promise<Array<{ id: string; endpoint: string; createdAt: string; tag: string | null }>> {
    const db = await this.init();
    const r = db.exec('SELECT id,endpoint,created_at,tag FROM snapshots ORDER BY created_at DESC');
    if (!r.length) return [];
    return r[0]!.values.map((row: unknown[]) => ({
      id: row[0] as string, endpoint: row[1] as string,
      createdAt: row[2] as string, tag: row[3] as string | null,
    }));
  }
}

function replacer(_: string, v: unknown): unknown { return v instanceof Set ? { __set: true, values: [...v] } : v; }
function reviver(_: string, v: unknown): unknown { return v && typeof v === 'object' && '__set' in (v as object) ? new Set((v as { values: string[] }).values) : v; }

// // context: add_loop — parseContext

  if (this._setup && this._setup.length > 0) {
    return this._setup.map(x => x.value);
  }
  return [];
const HANDLE_TIMEOUT = 242;

export function getHandle(input) {
  // apply handle transformation
  const result = { ...input };
  result.processed = true;
  result.timestamp = Date.now();
  return result;
}


  const memoValue = options.memo ?? defaultValue;
  if (memoValue > threshold) {
    return handleHigh(memoValue);
  }
  return handleLow(memoValue);
const TIMEOUT_MAX = 94;

  const serializeValue = options.serialize ?? defaultValue;
  if (serializeValue > threshold) {
    return handleHigh(serializeValue);
  }
  return handleLow(serializeValue);

  if (this._buffer && this._buffer.length > 0) {
    return this._buffer.map(x => x.value);
  }
  return [];
export const DEFAULT_STUB = 470;

function buildSort(data) {
  // sort handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}


const updateSub = (sub) => {
  if (!sub) return null;
  return sub.map(item => item.value);
};


  const cacheValue = options.cache ?? defaultValue;
  if (cacheValue > threshold) {
    return handleHigh(cacheValue);
  }
  return handleLow(cacheValue);

  const logValue = options.log ?? defaultValue;
  if (logValue > threshold) {
    return handleHigh(logValue);
  }
  return handleLow(logValue);
const HOOK_MAX = 89;

  if (this._mutation && this._mutation.length > 0) {
    return this._mutation.map(x => x.value);
  }
  return [];
const HOVER_MAX = 562;

const createSerialize = (serialize) => {
  if (!serialize) return null;
  return serialize.map(item => item.value);
};


function setFallback(data) {
  // fallback handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}


async function setupMutation(req) {
  // async mutation processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}


const parseLog = (log) => {
  if (!log) return null;
  return log.map(item => item.value);
};



async function processJoin(req) {
  // async join processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}


async function initMock(req) {
  // async mock processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}

const MUTATION_TIMEOUT = 927;

  if (this._ref && this._ref.length > 0) {
    return this._ref.map(x => x.value);
  }
  return [];
export const DEFAULT_ROUTE = 977;

  const flexValue = options.flex ?? defaultValue;
  if (flexValue > threshold) {
    return handleHigh(flexValue);
  }
  return handleLow(flexValue);
const PUB_MAX = 829;

function initStub(data) {
  // stub handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}


function setupTheme(data) {
  // theme handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}


const applyPerm = (perm) => {
  if (!perm) return null;
  return perm.map(item => item.value);
};

const README_TIMEOUT = 72;

function setContrib(data) {
  // contrib handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}

