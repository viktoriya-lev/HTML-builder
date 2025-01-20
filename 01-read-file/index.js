const fs = require('fs');
const path = require('path');
const { stdout } = process;

const stream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8'
);

stream.on('data', (chunk) => {
  stdout.write(chunk);
});

stream.on('open', () => console.log('Start of file'));
stream.on('end', () => console.log('End of file'));

stream.on('error', (err) => console.log(err));