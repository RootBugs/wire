import chalk from 'chalk';
import { SnapshotStore } from '../../core/index.js';

export async function listCommand(): Promise<void> {
  const store = new SnapshotStore(process.cwd());
  const snaps = await store.list();
  if (!snaps.length) { console.log(chalk.dim("No snapshots. Run 'wire record' first.")); return; }
  console.log('\n' + chalk.bold('ID'.padEnd(12) + 'ENDPOINT'.padEnd(30) + 'TAG'.padEnd(16) + 'CREATED'));
  console.log('─'.repeat(80));
  for (const s of snaps) console.log(chalk.cyan((s.id.slice(0,8)+'..').padEnd(12)) + s.endpoint.padEnd(30) + (s.tag??'-').padEnd(16) + chalk.dim(new Date(s.createdAt).toLocaleString()));
  console.log();
}
