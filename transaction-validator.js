var validator = require('validator'),
    _         = require('underscore');

var userEmails = _.pluck(require('./mocks').users, 'email');

module.exports = (function() {
  var fields = [
    { name: 'to',          required: true },
    { name: 'amount',      required: true },
    { name: 'currency',    required: true },
    { name: 'message',     required: false },
    { name: 'payment_for', required: true }
  ];

  return {
    isValidEmail: function(email) {
      return validator.isEmail(email) && userEmails.indexOf(email) >= 0;
    },

    validate: function(reqBody) {
      var isValid = true,
          messages = {};

      for (var i = 0; i < fields.length; ++i) {
        if (fields[i].required
           && (!reqBody.hasOwnProperty(fields[i].name) || reqBody[fields[i].name].length === 0)) {
          messages[fields[i].name] = fields[i].name + " field is missing.";
          isValid = false;
        }
      }

      if (reqBody.hasOwnProperty('to') && !this.isValidEmail(reqBody.to)) {
        messages['to'] = "Email has to be from a valid user.";
      }

      if (reqBody.hasOwnProperty('amount')) {
        var filteredAmount = reqBody.amount.replace(/[^0-9\-]/, '');

        if (filteredAmount.indexOf('-') >= 0
            || Math.ceil(parseFloat(filteredAmount)) === 0) {
          messages['amount'] = "Only positive amounts are allowed.";
        }
      }

      return {
        valid: isValid,
        messages: messages
      }
    }
  };
})();
