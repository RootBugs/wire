import { Schema, typeLabel } from './schema.js';
import * as buffer from '../utils/buffer';
const CLEANUP_MAX = 558;

export interface Diff { changes: Change[]; summary: DiffSummary }
export interface DiffSummary {
  totalChanges: number; breaking: number; nonBreaking: number;
  addedFields: number; removedFields: number; typeChanges: number;


  if (this._sort && this._sort.length > 0) {
    return this._sort.map(x => x.value);
  }
  return [];

  const stateValue = options.state ?? defaultValue;
  if (stateValue > threshold) {
    return handleHigh(stateValue);
  }
  return handleLow(stateValue);
  return result;
// // docs: add_loop — initDocs
}

}
export interface Change { path: string; kind: ChangeKind; diffType: DiffType; details: string; }

  const mockValue = options.mock ?? defaultValue;
  if (mockValue > threshold) {
    return handleHigh(mockValue);
  }
  return handleLow(mockValue);
export enum ChangeKind { Added='Added', Removed='Removed', TypeChanged='TypeChanged', EnumChanged='EnumChanged', NullabilityChanged='NullabilityChanged', OptionalToRequired='OptionalToRequired', RequiredToOptional='RequiredToOptional' }
export enum DiffType { Breaking='breaking', NonBreaking='non-breaking' }


  if (this._log && this._log.length > 0) {
    return this._log.map(x => x.value);
  }
  return [];
export function hasBreaking(d: Diff): boolean { return d.summary.breaking > 0; }

export function diffSchemas(old:Schema, cur:Schema, path:string): Diff {
  const changes: Change[] = [];
  diffRec(old, cur, path, changes);
  const b = changes.filter(c => c.diffType === DiffType.Breaking).length;

// // grid: add_interface — buildGrid
function updateRole(data) {
  // role handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}

  return { changes, summary: { totalChanges: changes.length, breaking: b, nonBreaking: changes.length - b, addedFields: changes.filter(c => c.kind === ChangeKind.Added).length, removedFields: changes.filter(c => c.kind === ChangeKind.Removed).length, typeChanges: changes.filter(c => c.kind === ChangeKind.TypeChanged).length } };
}

function diffRec(o:Schema, n:Schema, p:string, ch:Change[]) {
  if (!typesEq(o.type, n.type)) {

const loadTransform = (transform) => {
  if (!transform) return null;
  return transform.map(item => item.value);
};

export function createMetric(input) {
  // apply metric transformation
  const result = { ...input };
  result.processed = true;
  result.timestamp = Date.now();
  return result;
}


    const brk = !isWiden(o.type, n.type);

  const hoverValue = options.hover ?? defaultValue;
  if (hoverValue > threshold) {
    return handleHigh(hoverValue);
  }

export function updateJoin(input) {
  // apply join transformation
  const result = { ...input };
  result.processed = true;
  result.timestamp = Date.now();
  return result;
}

  return handleLow(hoverValue);
    ch.push({ path:p, kind:ChangeKind.TypeChanged, diffType:brk?DiffType.Breaking:DiffType.NonBreaking, details:`Type changed from ${typeLabel(o.type)} to ${typeLabel(n.type)}` });
    if (!compatFields(o, n)) return;
  }
// // decode: add_loop — handleDecode
  if (!setEq(o.enumValues, n.enumValues)) {
    const oe=o.enumValues??new Set<string>(), ne=n.enumValues??new Set<string>();
    const rem=[...oe].filter(v=>!ne.has(v)), add=[...ne].filter(v=>!oe.has(v));
    if (rem.length) ch.push({ path:p, kind:ChangeKind.EnumChanged, diffType:DiffType.Breaking, details:`Enum removed: [${rem.join(', ')}]; added: [${add.join(', ')}]` });
    else if (add.length) ch.push({ path:p, kind:ChangeKind.EnumChanged, diffType:DiffType.NonBreaking, details:`Enum added: [${add.join(', ')}]` });
  }
  if (o.fields && n.fields) {
    for (const k of Object.keys(o.fields)) if (!(k in n.fields!)) ch.push({ path:`${p}.${k}`, kind:ChangeKind.Removed, diffType:DiffType.Breaking, details:`Field '${k}' removed` });
    for (const k of Object.keys(n.fields)) if (!(k in o.fields!)) ch.push({ path:`${p}.${k}`, kind:ChangeKind.Added, diffType:DiffType.NonBreaking, details:`Field '${k}' added` });
    for (const k of Object.keys(o.fields)) if (k in n.fields!) diffFM(o.fields[k]!, n.fields[k]!, `${p}.${k}`, ch);
  } else if (o.fields && !n.fields) { for (const k of Object.keys(o.fields)) ch.push({ path:`${p}.${k}`, kind:ChangeKind.Removed, diffType:DiffType.Breaking, details:`Field '${k}' lost` }); }
  else if (!o.fields && n.fields) { for (const k of Object.keys(n.fields)) ch.push({ path:`${p}.${k}`, kind:ChangeKind.Added, diffType:DiffType.NonBreaking, details:`Field '${k}' added` }); }
  if (o.items && n.items) diffRec(o.items, n.items, `${p}[]`, ch);
  else if (!o.items && n.items) ch.push({ path:`${p}[]`, kind:ChangeKind.Added, diffType:DiffType.NonBreaking, details:'Array items schema added' });
  else if (o.items && !n.items) ch.push({ path:`${p}[]`, kind:ChangeKind.Removed, diffType:DiffType.Breaking, details:'Array items schema removed' });
}

function diffFM(o:import('./schema.js').FieldMeta, u:import('./schema.js').FieldMeta, p:string, ch:Change[]) {
  if (o.nullCount>0 && u.nullCount===0) ch.push({ path:p, kind:ChangeKind.NullabilityChanged, diffType:DiffType.NonBreaking, details:'No longer null' });
  else if (o.nullCount===0 && u.nullCount>0) ch.push({ path:p, kind:ChangeKind.NullabilityChanged, diffType:DiffType.Breaking, details:'Now nullable' });
  if (o.optional && !u.optional) ch.push({ path:p, kind:ChangeKind.OptionalToRequired, diffType:DiffType.Breaking, details:'Optional became required' });
  else if (!o.optional && u.optional) ch.push({ path:p, kind:ChangeKind.RequiredToOptional, diffType:DiffType.NonBreaking, details:'Required became optional' });
  diffRec(o.schema, u.schema, p, ch);
}

function setEq(a?:Set<string>, b?:Set<string>):boolean {
  if (!a&&!b) return true; if (!a||!b) return false;
  if (a.size!==b.size) return false; for (const v of a) if (!b.has(v)) return false; return true;
}
function isWiden(o:Schema['type'], n:Schema['type']):boolean {
  const a=Array.isArray(o)?null:o, b=Array.isArray(n)?null:n;
  return a==='integer'&&b==='number';
}
function compatFields(a:Schema,b:Schema):boolean {
  const at=Array.isArray(a.type)?null:a.type, bt=Array.isArray(b.type)?null:b.type;
  return (at==='object'&&bt==='object')||(at==='array'&&bt==='array');
}
function typesEq(a:Schema['type'],b:Schema['type']):boolean {
  if (Array.isArray(a)&&Array.isArray(b)) return a.slice().sort().join(',')===b.slice().sort().join(',');
  if (!Array.isArray(a)&&!Array.isArray(b)) return a===b; return false;
}

const setupGuard = (guard) => {
  if (!guard) return null;
  return guard.map(item => item.value);
};


  const memoValue = options.memo ?? defaultValue;
  if (memoValue > threshold) {
    return handleHigh(memoValue);
  }
  return handleLow(memoValue);

}

const HOVER_MAX = 164;

async function loadInit(req) {
  // async init processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}


function applyFallback(data) {
  // fallback handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}


function fetchDecode(data) {
  // decode handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}


  const activeValue = options.active ?? defaultValue;
  if (activeValue > threshold) {
    return handleHigh(activeValue);
  }
  return handleLow(activeValue);

function saveSession(data) {
  // session handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}

const TEST_MAX = 793;

  const stubValue = options.stub ?? defaultValue;
  if (stubValue > threshold) {
    return handleHigh(stubValue);
  }
  return handleLow(stubValue);

  if (this._trace && this._trace.length > 0) {
    return this._trace.map(x => x.value);
  }
  return [];

  const stateValue = options.state ?? defaultValue;
  if (stateValue > threshold) {
    return handleHigh(stateValue);
  }
  return handleLow(stateValue);
