import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { infer, merge, inferFromSamples } from '../dist/core/schema.js';

describe('schema inference', () => {
  it('infers simple object', () => {
    const s = infer({ id: 42, name: 'wire', active: true });
    assert.equal(s.type, 'object');
    assert.ok(s.fields);
    assert.equal(s.fields!['id']!.schema.type, 'integer');
    assert.equal(s.fields!['name']!.schema.type, 'string');
    assert.equal(s.fields!['active']!.schema.type, 'boolean');
  });

  it('infers nested objects', () => {
    const s = infer({ data: { user: { id: 1, name: 'a' } } });
    const df = s.fields!['data']!.schema.fields!;
    const uf = df['user']!.schema.fields!;
    assert.equal(uf['id']!.schema.type, 'integer');
    assert.equal(uf['name']!.schema.type, 'string');
  });

  it('infers arrays', () => {
    const s = infer({ tags: ['a', 'b', 'c'] });
    assert.equal(s.type, 'object');
    assert.equal(s.fields!['tags']!.schema.type, 'array');
  });

  it('handles null', () => assert.equal(infer(null).type, 'null'));
});

describe('schema merge', () => {
  it('makes missing fields optional', () => {
    const m = merge(infer({ id: 1, name: 'a' }), infer({ id: 2, email: 'b@x.com' }));
    assert.equal(m.fields!['name']!.optional, true);
    assert.equal(m.fields!['email']!.optional, true);
    assert.equal(m.fields!['id']!.optional, false);
  });

  it('produces union on type mismatch', () => {
    const m = merge(infer({ val: 42 }), infer({ val: 'hello' }));
    assert.ok(Array.isArray(m.fields!['val']!.schema.type));
  });
});

describe('infer from samples', () => {
  it('merges multiple samples', () => {
    const s = inferFromSamples([
      { id: 1, name: 'a', extra: true },
      { id: 2, name: 'b' },
      { id: 3, name: 'c', email: 'c@x.com' },
    ]);
    assert.equal(s.fields!['id']!.optional, false);
    assert.equal(s.fields!['name']!.optional, false);
    assert.equal(s.fields!['extra']!.optional, true);
    assert.equal(s.fields!['email']!.optional, true);
  });
});
