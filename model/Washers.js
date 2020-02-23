
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

var WashersSchema = new mongoose.Schema({
  brand: String,
  model: String,
  usage: String,
  price: Number,
}, schemaOptions);


var Washers = mongoose.model('Washers', WashersSchema);
module.exports = Washers;
