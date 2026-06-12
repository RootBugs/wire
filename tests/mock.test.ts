import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { infer, merge } from '../dist/core/schema.js';
import { generateMock } from '../dist/core/mock.js';

describe('mock generation', () => {
  it('generates TypeScript interfaces', () => {
    const code = generateMock(infer({ id: 42, name: 'wire', active: true, tags: ['api'] }), 'test', 'typescript');
    assert.ok(code.includes('export interface Root'));
    assert.ok(code.includes('id: number'));
    assert.ok(code.includes('name: string'));
    assert.ok(code.includes('active: boolean'));
    assert.ok(code.includes('tags: string[]'));
  });

  it('generates Python dataclasses', () => {
    const code = generateMock(infer({ id: 1, name: 'wire', active: true }), 'test', 'python');
    assert.ok(code.includes('@dataclass'));
    assert.ok(code.includes('class Root'));
    assert.ok(code.includes('id_: int'));
    assert.ok(code.includes('name: str'));
  });

  it('generates Rust structs', () => {
    const code = generateMock(infer({ id: 1, name: 'wire', active: true }), 'test', 'rust');
    assert.ok(code.includes('pub struct Root'));
    assert.ok(code.includes('pub id: i64'));
    assert.ok(code.includes('pub name: String'));
    assert.ok(code.includes('#[derive(Debug, Clone, Serialize, Deserialize)]'));
  });

  it('optional fields in TypeScript', () => {
    const m = merge(infer({ id: 1, name: 'a' }), infer({ id: 2 }));
    const code = generateMock(m, 'test', 'typescript');
    assert.ok(code.includes('name?:'));
  });
});
