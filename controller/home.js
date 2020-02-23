
var washersModel = require('../model/Washers');

exports.getWashers = function (req, res) {

  var searchStr = req.body.search.value;
  if (req.body.search.value) {
    var regex = new RegExp(req.body.search.value, "i")
    searchStr = { $or: [{ 'brand': regex }, { 'model': regex }, { 'usage': regex }] };
  }
  else {
    searchStr = {};
  }

  var recordsTotal = 0;
  var recordsFiltered = 0;

  washersModel.count({}, function (err, c) {
    recordsTotal = c;
    console.log(c);
    washersModel.count(searchStr, function (err, c) {
      recordsFiltered = c;
      console.log(c);
      console.log(req.body.start);
      console.log(req.body.length);
      washersModel.find(searchStr, 'brand model usage price', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
        if (err) {
          console.log('error while getting results' + err);
          return;
        }

        var data = JSON.stringify({
          "draw": req.body.draw,
          "recordsFiltered": recordsFiltered,
          "recordsTotal": recordsTotal,
          "data": results
        });
        res.send(data);
      });

    });
  });
};

exports.getWasher = function (req, res) {

  var dropdownStr = req.body.value;
  if (req.body.value) {
    var regex = new RegExp(req.body.value, "i")
    dropdownStr = { 'model': regex };
  }

  console.log("Value: " + req.body.value);

  var recordsTotal = 0;
  var recordsFiltered = 0;

  washersModel.count({}, function (err, c) {
    recordsTotal = c;
    console.log("Total models: " + c);
    washersModel.count(dropdownStr, function (err, c) {
      recordsFiltered = c;
      console.log("Results: " + c);
      washersModel.find(dropdownStr, 'brand model usage price', {}, function (err, results) {
        if (err) {
          console.log('error while getting results' + err);
          return;
        } else {
          console.log('Result JSON: ' + results);
        }

        var data = JSON.stringify(results);
        res.send(data);
      });

    });
  });
};
