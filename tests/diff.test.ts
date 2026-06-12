import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { infer } from '../dist/core/schema.js';
import { diffSchemas, ChangeKind } from '../dist/core/diff.js';

describe('diff schemas', () => {
  it('no change gives empty diff', () => {
    const s = infer({ id: 1, name: 'wire' });
    const d = diffSchemas(s, s, 'root');
    assert.equal(d.changes.length, 0);
    assert.equal(d.summary.totalChanges, 0);
  });

  it('removed field is breaking', () => {
    const d = diffSchemas(infer({ id: 1, name: 'wire', extra: true }), infer({ id: 1, name: 'wire' }), 'root');
    assert.ok(d.summary.breaking > 0);
    assert.equal(d.summary.removedFields, 1);
    assert.equal(d.changes[0]!.kind, ChangeKind.Removed);
  });

  it('added field is non-breaking', () => {
    const d = diffSchemas(infer({ id: 1 }), infer({ id: 1, email: 'a@b.com' }), 'root');
    assert.equal(d.summary.breaking, 0);
    assert.equal(d.summary.addedFields, 1);
    assert.equal(d.changes[0]!.kind, ChangeKind.Added);
  });

  it('type change is breaking', () => {
    const d = diffSchemas(infer({ id: 42 }), infer({ id: 'forty-two' }), 'root');
    assert.equal(d.summary.typeChanges, 1);
    assert.ok(d.summary.breaking > 0);
  });

  it('nested diff works', () => {
    const d = diffSchemas(
      infer({ data: { user: { id: 1, name: 'a' } } }),
      infer({ data: { user: { id: '1' } } }),
      'root'
    );
    assert.ok(d.summary.breaking > 0);
    assert.ok(d.changes.some(c => c.path.includes('data.user')));
  });
});
