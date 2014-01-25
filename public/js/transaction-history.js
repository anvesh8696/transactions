(function($) {

  var TransactionHistory = {
    init: function() {
      this.transactionsTable = $('.transactions');
      this.tableBody = TransactionHistory.transactionsTable.find('tbody');

      this.bindInfiniteScroll();
    },

    bindInfiniteScroll: function() {
      TransactionHistory.transactionsTable.infinitescroll({
        navSelector: '#navigation',
        nextSelector: '#navigation a:first',
        animate: false,
        dataType: 'json',
        appendCallback: false,
        loading: {
          msgText: '',
          finishedMsg: '',
          speed: 0,
          img: 'images/ajax-loader.gif'
        },
      }, function(transactions) {
        if (transactions.length) {
          var renderedNewEntries = TransactionHistory.renderTransactions(transactions);

          TransactionHistory.tableBody.append(renderedNewEntries);
        }
        else {
          TransactionHistory.transactionsTable.infinitescroll('destroy');
        }
      });
    },

    renderTransactions: function(transactions) {
      var output = '',
          total = transactions.length;

      for (var i = 0; i < total; ++i) {
        output += '<tr>';
        output += '  <td>' + transactions[i]['date'] + '</td>';
        output += '  <td>' + transactions[i]['name'] + '</td>';
        output += '  <td>' + transactions[i]['formatted-amount'] + '</td>';
        output += '</tr>';
      }

      return output;
    }
  }

  $(function() {
    TransactionHistory.init();
  });
})(jQuery);
