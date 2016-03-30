var express = require('express');
var notelyServerApp = express();

var db = require('mongoose');
db.connect('mongodb://localhost:27017/test');

var TestSchema = db.Schema({
  name: String
});

var Restaurant = db.model('Restaurant', TestSchema);

// Cross-Origin Resource Sharing (CORS) middleware
notelyServerApp.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

notelyServerApp.get('/', function(req, res) {
  // Restaurant.find().limit(3).then(function(restaurantData) {
  //   res.json(restaurantData);
    Restaurant.find({ }, { name: 1, cuisine: 1, borough: 1 } ).limit(30).then(function(restaurantData) {
      res.json(restaurantData);
  });

  // res.json([
  //   {
  //     title: 'Edited hardcoded note!',
  //     body_html: 'Cool note. Aww, shucks.'
  //   },
  //   {
  //     title: 'Another edited hardcoded note',
  //     body_html: "Ain't life grand?"
  //   }
  // ]);
});

notelyServerApp.listen(3030, function() {
  console.log('Listening on http://localhost:3030');
});
