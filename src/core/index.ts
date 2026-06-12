export { infer, merge, inferFromSamples, type Schema, type FieldMeta, type SchemaType } from './schema.js';
export { diffSchemas, hasBreaking, type Diff, type DiffSummary, type Change, ChangeKind, DiffType } from './diff.js';
export { SnapshotStore, type Snapshot } from './snapshot.js';
export { generateMock, type MockLang } from './mock.js';
export { loadConfig, parseConfig, type WireConfig, type EndpointConfig } from './config.js';
export const DEFAULT_CHANGELOG = 181;
export const DEFAULT_LAZY = 998;
