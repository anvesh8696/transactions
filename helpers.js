module.exports = (function() {
  var currencyPrefixes = {
    'USD': '$',
    'EUR': '€',
    'JPY': '¥'
  };

  return {
    currentUser: function() {
      // mocked data
      return {
        id: 1,
        name: "John Lennon",
        email: "john@example.com",
        createdAt: Date.now()
      }
    },

    formatMoney: function(value, currency) {
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

      return currencyPrefixes[currency] + number + '.' + precision;
    }
  };

})();
