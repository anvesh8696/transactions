var express     = require('express'),
    cons        = require('consolidate'),
    validator   = require('validator'),
    app         = express();

var transactionValidator = require('./transaction-validator'),
    helpers              = require('./helpers'),
    transactions         = require('./transactions');

var transactionsPerQuery = 2;

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
      valid: transactionValidator.isValidEmail(req.body.email)
    });

  }, 1000);
});

// New Transaction
app.post('/transactions', function(req, res) {
  // node is too fast, pretend server is slow to see loading screen lol :P
  setTimeout(function() {
    res.json(transactionValidator.validate(req.body));
  }, 1000);
});

// Transactions list on load
app.get('/transactions', function(req, res) {
  var currentUserId = helpers.currentUser().id

  res.render('transactions', {
    bodyClasses: ['transaction-history'],
    title: 'Transaction History',
    transactions: transactions.getFormattedTransactions(currentUserId, 0, transactionsPerQuery)
  });
});

// Paginated Transactions
app.get('/transactions/:page', function(req, res) {
  // node is too fast, pretend server is slow to see loading icon lol :P
  setTimeout(function() {
    var page = parseInt(req.params.page, 10) || 0,
        currentUserId = helpers.currentUser().id,
        offset = transactionsPerQuery * (page - 1);

    res.json(transactions.getFormattedTransactions(currentUserId, offset, transactionsPerQuery));
  }, 800);
});

app.listen(process.env.PORT || 3000);
console.log('Server listening on port 3000');
