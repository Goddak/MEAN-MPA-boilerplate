var mongoose = require('mongoose');
var ExampleSchema = new mongoose.Schema({
  _id: String,
  created: Date,
  title: String,
  description: String,
  thumbnails: mongoose.Schema.Types.Mixed,
  url: String,
  tags: Array,
});
module.exports = mongoose.model('example', ExampleSchema);
