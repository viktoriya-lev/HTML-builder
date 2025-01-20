const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');
const { stdin, stdout } = process;

const welcomeText = 'Hello!\nA text file has been created. Now you can write anything you want.\n';
const successText = 'Success! Your text has been saved!\nYou can add something to it or finish the program.\n';
const errorText = 'Error! Something went wrong. Please contact the developer\n';
const farewellText = 'Bye bye, see you!';

const appendFile = async (text) => {
  try {
    await fsPromise.appendFile(
      path.join(__dirname, 'text.txt'),
      text,
    );

    stdout.write(successText);
  } catch(error) {
    stdout.write(errorText);
    stdout.write(error.message);
  }
};

fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write(welcomeText);

stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    stdout.write(farewellText);
    process.exit();
  }

  const dataStringified = input + '\n';
  appendFile(dataStringified);
});

process.on('SIGINT', () => {
  stdout.write(`\n${farewellText}`);
  process.exit();
});