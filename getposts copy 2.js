const fs = require('fs');
const util = require('util');

const path = 'src/events/';

new Promise((resolve, reject) => {
  return fs.readdir(path, (err, files) => {
    err != null
      ? reject(err)
      : files.map((file) => {
          console.log(`${path}${file}`);

          const readFile = util.promisify(fs.readFile);
          async function getStuff() {
            return readFile(`${path}${file}`);
          }
          // Can't use `await` outside of an async function so you need to chain
          // with then()
          getStuff().then((data) => {
            console.log(data);
          });
        });
  });
});
// Convert fs.readFile into Promise version of same
