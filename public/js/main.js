// Keep global scope clean with an immediate function
(function($) {

  // namespace for better semantics
  var SendMoney = {
    currency: "$",

    init: function() {
      this.emailWrapper = $('.form-item.to');
      this.emailLoader  = this.emailWrapper.find('.loader');
      this.paymentItems = $('.payment-item');
      this.amountInput  = $('#amount');

      SendMoney.bindEvents();
    },

    // Semaphore variable to avoid multiple server requests
    isEmailBeingValidate: false,

    bindEvents: function() {
      SendMoney.bindValidations();

      SendMoney.bindPaymentForSelection();
      SendMoney.bindFriendlySelection();

      SendMoney.bindAmountBehavior();
      SendMoney.bindCurrencySelection();

      // Buttons
      SendMoney.bindClearButton();
    },

    bindValidations: function() {
      SendMoney.bindEmailValidation();
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

    bindAmountBehavior: function() {
      var lastValue;

      SendMoney.amountInput.on('input', function(e) {
        var newValue = e.target.value,
            newFormattedValue = SendMoney.formatMoney(newValue);

        if (lastValue !== newValue) {
          SendMoney.amountInput.val(newFormattedValue);
          lastValue = newFormattedValue;
          e.preventDefault();
        }
      });
    },

    bindCurrencySelection: function() {
      $('#currency').on('change', function() {
        SendMoney.currency = $(this).find('option:selected').attr('rel');

        // update value
        var newValue = SendMoney.formatMoney(SendMoney.amountInput.val());
        SendMoney.amountInput.val(newValue);
      });
    },

    formatMoney: function(value) {
      // remove previous formatting
      value = value.toString().replace(/[^0-9]/g, '');
      // empty string defaults to 0
      value = value || "0";

      var digits = value.split(''),
          number = digits.slice(0, -2).join(''),
          precision = digits.slice(-2).join('');

      // fix minimum number size
      number = number.length ? number.replace(/^0*([0-9]+)$/, "$1") : '0';
      precision = precision.length === 1 ? '0' + precision : precision;

      // add commas for thousands
      // kind of black magic
      number = number.split('').reverse().join('') // reverse string
               .replace(/(\d{3})(?=\d)/g, "$1,")   // add the commas
               .split('').reverse().join('');      // reverse it back

      return SendMoney.currency + number + '.' + precision;
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
