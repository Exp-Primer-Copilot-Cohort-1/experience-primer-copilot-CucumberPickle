// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var comments = require('./comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', urlencodedParser, function(req, res) {
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err) {
    res.json(comments);
  });
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});

$.ajax({
  url: 'http://localhost:3000/comments',
  method: 'POST',
  data: JSON.stringify(data),
  contentType: 'application/json'
});