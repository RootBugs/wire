const fs = require('fs');
const path = require('path');

const wireDir = path.join('E:', 'projects', 'wire');
const nmDir = path.join(wireDir, 'node_modules');
const logFile = path.join('C:', 'Users', 'Dc', 'npm-log.txt');

console.log('wireDir:', wireDir);
console.log('nmDir exists:', fs.existsSync(nmDir));
if (fs.existsSync(nmDir)) {
  console.log('packages:', fs.readdirSync(nmDir).join(', '));
}
console.log('logFile exists:', fs.existsSync(logFile));
if (fs.existsSync(logFile)) {
  console.log(fs.readFileSync(logFile, 'utf8').slice(0, 2000));
}
