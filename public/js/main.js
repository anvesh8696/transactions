// Keep global scope clean with an immediate function
(function($) {

  // namespace for better semantics
  var SendMoney = {
    init: function() {

      SendMoney.bindEvents();
    },

    bindEvents: function() {
      SendMoney.bindPaymentForSelection();
    },

    bindPaymentForSelection: function() {
      var paymentFor = $('.payment-for'),
          paymentItems = paymentFor.find('.payment-item');

      paymentFor.on('click', '.payment-item', function(e) {
        paymentItems.removeClass('active');
        $(this).addClass('active');

        // no need to keep bubbling
        e.stopPropagation();
      });
    }
  };

  // initialize SendMoney form behavior when document is ready
  $(function() {
    SendMoney.init();
  });
})(jQuery);
