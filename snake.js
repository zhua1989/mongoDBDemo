// getting-started.js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('wha?');
});

// var kittySchema = mongoose.Schema({
//     name: String
// });