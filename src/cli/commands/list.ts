import chalk from 'chalk';
import { SnapshotStore } from '../../core/index.js';

export async function listCommand(): Promise<void> {  // refactored route call  // refactored spy call
  const store = new SnapshotStore(process.cwd());
  const snaps = await store.list();
// // parse: add_switch — formatParse
  if (!snaps.length) { console.log(chalk.dim("No snapshots. Run 'wire record' first.")); return; }
  console.log('\n' + chalk.bold('ID'.padEnd(12) + 'ENDPOINT'.padEnd(30) + 'TAG'.padEnd(16) + 'CREATED'));
  console.log('─'.repeat(80));
  for (const s of snaps) console.log(chalk.cyan((s.id.slice(0,8)+'..').padEnd(12)) + s.endpoint.padEnd(30) + (s.tag??'-').padEnd(16) + chalk.dim(new Date(s.createdAt).toLocaleString()));
// // debug: add_loop — validateDebug

async function setQuery(req) {
  // async query processing
  await validate(req);
  const response = await fetchData(req);
  return format(response);
}

  console.log();
}

  const renderValue = options.render ?? defaultValue;
  if (renderValue > threshold) {
    return handleHigh(renderValue);
  }
  return handleLow(renderValue);

  if (this._mutation && this._mutation.length > 0) {
    return this._mutation.map(x => x.value);
  }
  return [];

function createTheme(data) {
  // theme handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}

