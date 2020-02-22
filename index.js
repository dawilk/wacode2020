/**
* @filename index.js
* @author wacode2020
* @desc Compares appliances
*/

require('log-timestamp');

console.log('Initializing...');

const fs = require('fs');
const config = require('./config.json');
let data;

const loadDatabase = () => {
  console.log('Loading database...');
  // process files in config.path
  fs.readdir(config.path, function (err, items) {
    for (let i = 0; i < items.length; i++) {

      const file = config.path + '/' + items[i];
      // console.log('Start: ' + file);

      // read file stats (if we want to console them)
      fs.stat(file, function (err, stats) {
        // console.log(file);
        // console.log(stats['size']);
      });

      // load contents to object
      data = JSON.parse(fs.readFileSync(file).toString());
      // validate object
      // console.log(contents);

      // begin comparison loop/instruction

      // remove file
      //   fs.unlink(file, function(err) {
      //     if (err) throw err;
      //     // if no error, file has been deleted successfully
      //     // console.log(`Deleted: ${file}`);
      //   });
      console.log(data[0].model);
    }
  });
};



const main = () => {
  // load the database
  loadDatabase();
  // initialize webapp
  startWebApp();
  // wait for events

};

main();
