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
  // load database file at config.database_path
  const file = config.database_path;
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
};



const main = () => {
  // load the database
  loadDatabase();
  // initialize webapp
  var express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      port = config.port || 9000;

  app.use(bodyParser());

  // as only one page can use res.sendfile to render the page which will contain the drop   downs
  app.get('/', function (req, res) {
      res.sendfile('./views/index2.html');
  });

  app.get('/compare', function (req, res) {
      // If it's not showing up, just use req.body to see what is actually being passed.
      console.log(req.body.selectpicker);
  });

  app.listen(port);
  // wait for events

};

main();
