var transactions = require('./mocks').transactions,
    _ = require('underscore');


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
    }
  };
})();
