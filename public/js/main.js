// Keep global scope clean with an immediate function
(function($) {

  // namespace for better semantics
  var SendMoney = {
    init: function() {
      this.emailWrapper = $('.form-item.to');
      this.emailLoader  = this.emailWrapper.find('.loader');
      this.paymentItems = $('.payment-item');

      SendMoney.bindEvents();
    },

    // Semaphore variable to avoid multiple server requests
    isEmailBeingValidate: false,

    bindEvents: function() {
      SendMoney.bindValidations();
      SendMoney.bindPaymentForSelection();
      SendMoney.bindFriendlySelection();

      // Buttons
      SendMoney.bindClearButton();
    },

    bindValidations: function() {
      SendMoney.bindEmailValidation();
      // SendMoney.bindAmountValidation();
    },

    bindEmailValidation: function() {
      var emailInput = $('#to'),

          lastValue = emailInput.val(),

          // UX - trigger validation after some determined time
          triggerValidationTimeout;

      emailInput.on('keyup', function(e) {
        if (lastValue !== emailInput.val()) {
          lastValue = emailInput.val();

          clearTimeout(triggerValidationTimeout);

          setTimeout(function() {
            SendMoney.validateEmail(lastValue);
          }, 1000);
        }
      });
    },

    validateEmail: function(email) {
      if (!SendMoney.isEmailBeingValidate) {
        SendMoney.showEmailLoading();
        SendMoney.isEmailBeingValidate = true;

        $.post('/validate-email', { email: email }, function(response) {
          SendMoney.hideEmailLoading();

          if (response.valid) {
            SendMoney.validEmailDisplay();
          }
          else {
            SendMoney.invalidEmailDisplay();
          }

          SendMoney.isEmailBeingValidate = false;
        });
      }
    },

    showEmailLoading: function() {
      SendMoney.emailWrapper.removeClass('invalid').removeClass('valid');
      SendMoney.emailLoader.show();
    },

    hideEmailLoading: function() {
      SendMoney.emailLoader.hide();
    },

    validEmailDisplay: function() {
      SendMoney.emailWrapper.removeClass('invalid').addClass('valid');
    },

    invalidEmailDisplay: function() {
      SendMoney.emailWrapper.removeClass('valid').addClass('invalid');
    },

    bindFriendlySelection: function() {
      // Select first input field when the click occurs on .form-item
      // just makes it more usable..
      $('.form-item').on('click', function(e) {
        $(this).find('input:first, textarea:first').focus();
      });
    },

    bindPaymentForSelection: function() {
      $('.payment-for').on('click', '.payment-item', function(e) {
        SendMoney.deactivateAllPaymentItems();
        $(this).addClass('active');
      });
    },

    deactivateAllPaymentItems: function() {
      SendMoney.paymentItems.removeClass('active');
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
