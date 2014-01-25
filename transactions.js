var _ = require('underscore');

var mocks = require('./mocks'),
    helpers = require('./helpers');

var transactions = mocks.transactions,
    users = _.indexBy(mocks.users, 'id');

module.exports = (function() {

  return {
    getTransactions: function(userId, offset, limit) {
      offset = offset || 0;
      limit = limit || 2;

      var userTransactions = _.where(transactions, { from_user_id: userId });

      userTransactions = _.sortBy(userTransactions, function(t) {
        return t.created_at;
      }).reverse();

      return userTransactions.slice(offset, offset + limit);
    },

    getFormattedTransactions: function(userId, offset, limit) {
      var transactions = this.getTransactions(userId, offset, limit),
          total = transactions.length;

      for (var i = 0; i < total; ++i) {
        transactions[i]['name'] = this.getUserNameFromId(transactions[i].to_user_id);
        transactions[i]['date'] = this.getFormattedDate(transactions[i].created_at);
        transactions[i]['formatted-amount'] = helpers.formatMoney(transactions[i].amount, transactions[i].currency);
      }

      return transactions;
    },

    getUserNameFromId: function(userId) {
      return users[userId].name;
    },

    getFormattedDate: function(timestamp) {
      var date = new Date(timestamp);

      return [(date.getMonth() + 1), date.getDate(), date.getFullYear()].join('/');
    }
  };
})();
