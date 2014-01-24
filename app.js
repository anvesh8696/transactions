var express = require('express'),
    cons = require('consolidate'),
    validator = require('validator'),
    app = express();

// assign jade engine to .jade files
app.engine('jade', cons.jade);

// .jade as default extension
app.set('view engine', 'jade');
app.use('views', __dirname + '/views');

// serve static files
app.use(express.static(__dirname + '/public'));

// use middleware to parse post data
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res) {
  res.render('index', {
    title: 'What are we Doing?'
  });
});

// Send Money
app.get('/send-money', function(req, res) {
  res.render('send-money', {
    title: 'Send Money'
  })
});

// Validate Email
app.post('/validate-email', function(req, res) {
  // node is too fast, pretend server is slow to see loading icon lol :P
  setTimeout(function() {
    if (!req.body.hasOwnProperty('email')) {
      res.statusCode = 400;
      return res.send('Error 400: Incorrect POST syntax.');
    }

    res.json({
      valid: validator.isEmail(req.body.email)
    });

  }, 1000);
});

app.listen(3000);
console.log('Server listening on port 3000');
