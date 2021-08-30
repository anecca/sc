const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../src/events');

let obj = {};
let postlist = [];

const getPosts = (object) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log('Failed to list contents of directory: ' + err);
    }
    console.log(files);

    files.map((file) => {
      fs.readFile(`${dirPath}/${file}`, 'utf8', (err, contents) => {
        console.log('LOOP!');
        console.log(file);

        /* only metadata */
        let metadata = contents.substring(4, contents.lastIndexOf('---') - 1);

        if (metadata.length > 0) {
          /* md made into an object */
          let lines = metadata.split('\n');
          lines.forEach(
            (line) => (obj[line.split(': ')[0]] = line.split(': ')[1])
          );
        }

        postlist.push(obj);
      });
      console.log(obj);
    });
  });
};
getPosts(obj);
console.log(obj);
console.log('PL!!', postlist);

/* ISSUE for some reason when looping through the files, they get random indexes, thats why I wanna print everything only when postlist is equal to files amount. */
/*if (postlist.length == files.length) {
          let data = JSON.stringify(postlist);
          console.log('hey');
          fs.writeFileSync('src/posts.json', data);
        }
        console.log('postlist', postlist);*/
