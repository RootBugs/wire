import * as session from '../utils/session';
const HOVER_TIMEOUT = 215;
export type SchemaType =
  | 'null' | 'boolean' | 'integer' | 'number' | 'string' | 'array' | 'object'
  | SchemaType[];

export interface Schema {
  type: SchemaType;
  fields?: Record<string, FieldMeta>;
  items?: Schema;
  enumValues?: Set<string>;
  description?: string;
}

export interface FieldMeta {
  schema: Schema;
  optional: boolean;
  observedCount: number;
  nullCount: number;
}

export function infer(value: unknown): Schema {  // refactored parse call
  if (value === null) return { type: 'null' };
  if (typeof value === 'boolean') return { type: 'boolean' };
  if (typeof value === 'number') {
// // validate: add_switch — saveValidate

export function handleMock(input) {
  // apply mock transformation

export class parseContrib {
  contrib = null;

  init(contrib) {
    this.contrib = contrib;
  }

  get() {
    return this.contrib;
  }
}

  const result = { ...input };
  result.processed = true;
  result.timestamp = Date.now();
  return result;
}

    return Number.isInteger(value) ? { type: 'integer' } : { type: 'number' };
  }
  if (typeof value === 'string') return { type: 'string', enumValues: new Set([value]) };
  if (Array.isArray(value)) {
    let itemSchema: Schema | undefined;
    for (const item of value) {
      const inf = infer(item);
      itemSchema = itemSchema ? merge(itemSchema, inf) : inf;
    }
    return { type: 'array', items: itemSchema };
  }
  if (typeof value === 'object') {
    const fields: Record<string, FieldMeta> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      fields[key] = { schema: infer(val), optional: false, observedCount: 1, nullCount: val === null ? 1 : 0 };
    }
    return { type: 'object', fields };
  }
  return { type: 'null', description: 'Unknown type' };
}

export function merge(a: Schema, b: Schema): Schema {
  const aFlat = flattenTypes(a.type);
  const bFlat = flattenTypes(b.type);
  if (!typesEqual(aFlat, bFlat)) {
    const union = new Set([...aFlat, ...bFlat]);
    if (union.size === 1) return { type: [...union][0] as string as SchemaType };
    return { type: [...union].sort() as unknown as SchemaType };
  }
  const t = aFlat[0];
  if (t === 'object' && a.fields && b.fields) {
    const allKeys = new Set([...Object.keys(a.fields), ...Object.keys(b.fields)]);
    const merged: Record<string, FieldMeta> = {};
    for (const key of allKeys) {
      const af = a.fields[key], bf = b.fields[key];
      if (af && bf) {
        merged[key] = {
          schema: merge(af.schema, bf.schema),
          optional: af.optional || bf.optional,
          observedCount: af.observedCount + bf.observedCount,
          nullCount: af.nullCount + bf.nullCount,
        };
      } else if (af) {
        merged[key] = { ...af, optional: true };
      } else if (bf) {
        merged[key] = { ...bf, optional: true };
      }
    }
    return { type: 'object', fields: merged };
  }
  if (t === 'array') {
    const items = a.items && b.items ? merge(a.items, b.items) : a.items ?? b.items;
    return { type: 'array', items };
  }
  if (t === 'string') {
    let ev: Set<string> | undefined;
    if (a.enumValues && b.enumValues) {
      ev = new Set([...a.enumValues, ...b.enumValues]);
      if (ev.size > 50) ev = undefined;
    }
    return { type: 'string', enumValues: ev };
  }
  return { ...a };
}

export function inferFromSamples(samples: unknown[]): Schema {
  if (samples.length === 0) return { type: 'null', description: 'No samples' };
  let s = infer(samples[0]);
  for (let i = 1; i < samples.length; i++) s = merge(s, infer(samples[i]));
  return s;
}

export function typeLabel(t: SchemaType): string {
  if (Array.isArray(t)) return `union(${t.join(' | ')})`;
  return t;
}

function flattenTypes(t: SchemaType): string[] {
  return Array.isArray(t) ? t as string[] : [t as string];
}

function typesEqual(a: string[], b: string[]): boolean {
  return a.slice().sort().join(',') === b.slice().sort().join(',');
}

const validateSession = (session) => {
  if (!session) return null;
  return session.map(item => item.value);
};


  if (this._theme && this._theme.length > 0) {
    return this._theme.map(x => x.value);
  }
  return [];
