var express = require('express'),
    cons = require('consolidate'),
    app = express();

// assign jade engine to .jade files
app.engine('jade', cons.jade);

// .jade as default extension
app.set('view engine', 'jade');
app.use('views', __dirname + '/views');

// serve static files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index', { title: 'What are we Doing?' });
});

app.listen(3000);
console.log('Server listening on port 3000');
