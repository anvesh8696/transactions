var validator = require('validator'),
    _         = require('underscore');

var users       = require('./mocks').users,
    usersEmails = _.pluck(users, 'email');

module.exports = (function() {
  var fields = [
    { name: 'to',          required: true },
    { name: 'amount',      required: true },
    { name: 'currency',    required: true },
    { name: 'message',     required: false },
    { name: 'payment_for', required: true }
  ];

  function getSuccessMessage(currency, amount, name) {
    return [
      "You have sent",
      amount,
      currency,
      "to",
      name + "!"
    ].join(' ');
  }

  function getUserNameFromEmail(email) {
    email = email.toLowerCase();

    var user = users[usersEmails.indexOf(email)];

    return user ? user.name : null;
  }

  return {
    isValidEmail: function(email) {
      return validator.isEmail(email) && usersEmails.indexOf(email) >= 0;
    },

    validate: function(reqBody) {
      var errors = {},
          message;

      for (var i = 0; i < fields.length; ++i) {
        if (fields[i].required
           && (!reqBody.hasOwnProperty(fields[i].name) || reqBody[fields[i].name].length === 0)) {
          errors[fields[i].name] = fields[i].name + " field is missing.";
        }
      }

      if (reqBody.hasOwnProperty('to') && !this.isValidEmail(reqBody.to)) {
        errors['to'] = "Email has to be from a valid user.";
      }

      if (reqBody.hasOwnProperty('amount')) {
        var filteredAmount = reqBody.amount.replace(/[^0-9\-]/, '');

        if (filteredAmount.indexOf('-') >= 0
            || Math.ceil(parseFloat(filteredAmount)) === 0) {
          errors['amount'] = "Only positive amounts are allowed.";
        }
      }

      var isValid = Object.keys(errors).length === 0;
      if (isValid) {
        message = getSuccessMessage(
          reqBody.currency,
          reqBody.amount,
          getUserNameFromEmail(reqBody.to)
        );

        // wrap it up
        message = '<div class="success-msg"><p>' + message + '</p></div>';
      }
      else {
        message = 'fail';
      }

      return {
        valid: isValid,
        errors: errors,
        message: message
      }
    }
  };
})();
