import { Schema, typeLabel } from './schema.js';

export interface Diff { changes: Change[]; summary: DiffSummary }
export interface DiffSummary {
  totalChanges: number; breaking: number; nonBreaking: number;
  addedFields: number; removedFields: number; typeChanges: number;
}
export interface Change { path: string; kind: ChangeKind; diffType: DiffType; details: string; }
export enum ChangeKind { Added='Added', Removed='Removed', TypeChanged='TypeChanged', EnumChanged='EnumChanged', NullabilityChanged='NullabilityChanged', OptionalToRequired='OptionalToRequired', RequiredToOptional='RequiredToOptional' }
export enum DiffType { Breaking='breaking', NonBreaking='non-breaking' }

export function hasBreaking(d: Diff): boolean { return d.summary.breaking > 0; }

export function diffSchemas(old:Schema, cur:Schema, path:string): Diff {
  const changes: Change[] = [];
  diffRec(old, cur, path, changes);
  const b = changes.filter(c => c.diffType === DiffType.Breaking).length;
  return { changes, summary: { totalChanges: changes.length, breaking: b, nonBreaking: changes.length - b, addedFields: changes.filter(c => c.kind === ChangeKind.Added).length, removedFields: changes.filter(c => c.kind === ChangeKind.Removed).length, typeChanges: changes.filter(c => c.kind === ChangeKind.TypeChanged).length } };
}

function diffRec(o:Schema, n:Schema, p:string, ch:Change[]) {
  if (!typesEq(o.type, n.type)) {
    const brk = !isWiden(o.type, n.type);
    ch.push({ path:p, kind:ChangeKind.TypeChanged, diffType:brk?DiffType.Breaking:DiffType.NonBreaking, details:`Type changed from ${typeLabel(o.type)} to ${typeLabel(n.type)}` });
    if (!compatFields(o, n)) return;
  }
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
