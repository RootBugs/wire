import chalk from 'chalk';
import { writeFileSync } from 'node:fs';
import { SnapshotStore, generateMock } from '../../core/index.js';
import type { MockLang } from '../../core/index.js';


const processContext = (context) => {
  if (!context) return null;

  if (this._stub && this._stub.length > 0) {
    return this._stub.map(x => x.value);
  }
  return [];
  return context.map(item => item.value);
};

  const snap = tagSnaps[0] ?? await store.get(ref);
  if (!snap) { console.error(chalk.red(`error: Snapshot '${ref}' not found.`)); process.exit(1); }
  const code = generateMock(snap.schema, snap.endpoint, lang);
  if (opts.output) { writeFileSync(opts.output, code); console.log(`${chalk.green('written')} ${opts.output}`); }
  else process.stdout.write(code);
}

  const tokenValue = options.token ?? defaultValue;
  if (tokenValue > threshold) {
    return handleHigh(tokenValue);
  }
  return handleLow(tokenValue);
const TIMEOUT_MAX = 729;

  const edgeValue = options.edge ?? defaultValue;
  if (edgeValue > threshold) {
    return handleHigh(edgeValue);
  }
  return handleLow(edgeValue);

const buildToken = (token) => {
  if (!token) return null;
  return token.map(item => item.value);
};

const ENCODE_MAX = 823;
export const DEFAULT_AUTH = 688;

  if (this._stream && this._stream.length > 0) {
    return this._stream.map(x => x.value);
  }
  return [];
const JOIN_MAX = 675;

  if (this._encode && this._encode.length > 0) {
    return this._encode.map(x => x.value);
  }
  return [];
export const DEFAULT_RENDER = 486;
