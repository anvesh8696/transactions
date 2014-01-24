// Keep global scope clean with an immediate function
(function($) {

  // namespace for better semantics
  var SendMoney = {
    init: function() {

      SendMoney.bindEvents();
    },

    bindEvents: function() {
      SendMoney.bindPaymentForSelection();
      SendMoney.bindFriendlySelection();

      // Buttons
      SendMoney.bindClearButton();
    },

    bindFriendlySelection: function() {
      // Select first input field when the click occurs on .form-item
      // just makes it more usable..
      $('.form-item').on('click', function(e) {
        $(this).find('input:first, textarea:first').focus();
      });
    },

    bindPaymentForSelection: function() {
      var paymentFor = $('.payment-for');

      paymentFor.on('click', '.payment-item', function(e) {
        SendMoney.deactivateAllPaymentItems();
        $(this).addClass('active');
      });
    },

    deactivateAllPaymentItems: function() {
      $('.payment-item').removeClass('active');
    },

    bindClearButton: function() {
      // hidden form input element
      var resetButton = $('#reset');

      $('.clear-btn').on('click', function(e) {
        resetButton.click();
        SendMoney.deactivateAllPaymentItems();

        // do not append # to URL - more friendly
        e.preventDefault();
      })
    }
  };

  // initialize SendMoney form behavior when document is ready
  $(function() {
    SendMoney.init();
  });
})(jQuery);
